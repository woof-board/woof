require('dotenv').config();

const { AuthenticationError, UserInputError, ApolloError } = require('apollo-server-express');
const { Owner, Walker, Order } = require('../models');
const { signTokenOwner, signTokenWalker } = require('../utils/auth');
const { getTimeSlot } = require('../utils/helpers');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_KEY || process.env.STRIPE_TEST_SK);


const resolvers = {
    Query: {
        owner: async (parent, { owner_id }, context) => {
            return await Owner.findById(owner_id)
                .select('-__v -password');
        },

        owners: async (parent, args, context) => {
            return await Owner.find({})
                .select('-__v -password');
        },

        // to get owner's own profile
        ownerMe: async (parent, args, context) => {
            if (context.owner) {
                const owner = await Owner.findById(context.owner._id)
                    .select('-__v -password');

                return owner;
            }

            throw new AuthenticationError('Not logged in');
        },

        getOwnerReviews: async (parent, args, context) => {
            if (context.owner) {
                // find walkers who have reviews from this owner
                const walkers = await Walker.find(
                    {
                        reviews: {
                            $elemMatch : { 
                                owner_id: mongoose.Types.ObjectId(context.owner._id)
                            }
                        }
                    }
                );
                let reviews = [];
                
                // generate owner's review list    
                walkers.forEach(walker => {
                    walker.reviews.forEach(review => {
                        
                        if( review.owner_id.toString() === context.owner._id) {
                            reviews.push({
                                _id: review._id,
                                review_text: review.review_text,
                                rating: review.rating,
                                walker: walker
                            });
                        };
                    });
                });
                return reviews;
            }

            throw new AuthenticationError('Not logged in');
        },
        
        walker: async (parent, { walker_id }, context) => {
            return await Walker.findById(walker_id)
                .select('-__v -password')
                .populate({
                    path: 'reviews.owner_id',
                    model: 'Owner'
                });
        },

        walkers: async (parent, args, context) => {
            return await Walker.find()
                .select('-__v -password')
                .populate({
                    path: 'reviews.owner_id',
                    model: 'Owner'
                });
        },

        // to get walker's own profile
        walkerMe: async (parent, args, context) => {
            if (context.walker) {
                const walker = await Walker.findById(context.walker._id)
                    .select('-__v -password')
                    .populate({
                        path: 'reviews.owner_id',
                        model: 'Owner'
                    });

                return walker;
            }

            throw new AuthenticationError('Not logged in');
        },

        order: async (parent, { order_id }, context) => {
            return await Order.findById(order_id)
                .select('-__v')
                .populate('owner')
                .populate('walker');
        },

        orders: async (parent, args, context) => {
            return await Order.find({})
                .populate('owner')
                .populate('walker');
        },

        // getOrders
        ownerOrders: async (parent, { owner_id }, context) => {
            return await Order.find({ owner: mongoose.Types.ObjectId(owner_id) })
                .select('-__v')
                .populate('owner')
                .populate('walker');
        },

        walkerOrders: async (parent, { walker_id }, context) => {
            return await Order.find({ walker: mongoose.Types.ObjectId(walker_id) })
                .select('-__v')
                .populate('owner')
                .populate('walker');
        },

        getPendingWalkers: async (parent, args, context) => {
            if (context.owner && context.owner.admin) {
                const walker = await Walker.find({ status: "PENDING_APPROVAL" })
                    .select('-__v -password')
                    .populate({
                        path: 'reviews.owner_id',
                        model: 'Owner'
                    });

                return walker;
            }

            throw new AuthenticationError('Not logged in');
        },
        
        getCustomerSessionId: async (parent, args, context) => {

            if (context.owner) {
                const url = new URL(context.headers.referer).origin;
                let customer_id = '';
                const {stripe_customer_id} = await Owner.findById(context.owner._id).select('-__v -password');
                customer_id = stripe_customer_id;
                if(!customer_id){
                    // if owner customer_id is empty, create a customer through stripe
                    const {id} = await stripe.customers.create();
                    customer_id = id;
                    // save customer id into owner
                    await Owner.findByIdAndUpdate(
                        context.owner._id,
                        {stripe_customer_id: customer_id},
                        { new: true, runValidators: true }
                    );
                }

                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    mode: 'setup',
                    customer: customer_id,
                    success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${url}/`
                });

                // save customer id into owner
                await Owner.findByIdAndUpdate(
                    context.owner._id,
                    {stripe_setup_intent: session.setup_intent},
                    { new: true, runValidators: true }
                );

                return { session_id: session.id };
            }

            throw new AuthenticationError('Not logged in');
        },

        getCustomerInfoFromStripe: async (parent, args, context) => {
            if (context.owner) {
                const {stripe_customer_id:customer_id} = await Owner.findById(context.owner._id).select('-__v -password');
                const customer = await stripe.customers.retrieve(customer_id);

                return customer;
            }

            throw new AuthenticationError('Not logged in');
        },

        chargeOwner: async (parent, {order_id, amount, description}, context) => {
                const order = await Order.findById(order_id);
                const {stripe_customer_id:customer_id, stripe_setup_intent:setup_intent} = await Owner.findById(order.owner).select('-__v -password');

                if(order && order.status !== 'FULFILLED' && customer_id && setup_intent){
                    
                    const setupIntent = await stripe.setupIntents.retrieve(setup_intent);
    
                    // create a new charging instance
                    const charge = await stripe.paymentIntents.create({
                        amount: amount,
                        currency: 'cad',
                        customer: customer_id||'',
                        payment_method: setupIntent.payment_method||'',
                        confirmation_method: 'automatic',
                        description: description,
                    });
    
                    // confirm charging
                    await stripe.paymentIntents.confirm(charge.id);
    
                    // get finalized charging information
                    const newCharge = await stripe.paymentIntents.retrieve(charge.id);

                    return newCharge;
                }
                
                return {
                    chargeOwner:{
                        id: '',
                        object: '',
                        amount: 0,
                        receipt_url: '',
                        status:'denied'
                    }
                };
        },

        retrievePayments: async (parent, arg, context) => {
            if (context.owner) {
                const {stripe_customer_id:customer_id} = await Owner.findById(context.owner._id).select('-__v -password');

                const paymentIntents = await stripe.paymentIntents.list({
                    customer: customer_id,
                    limit: 10,
                  });

                return paymentIntents;
            }

            throw new AuthenticationError('Not logged in');
        },

        checkWalkerAvailability: async (parent, { date, time }, context) => {
            if(context.owner){
                const timeSlot = getTimeSlot(time);
                const owner = await Owner.findById(context.owner._id);

                const filteredWalker = await Walker.find(
                    {
                        availability: {
                            $elemMatch : { 
                                date,
                                [timeSlot]: true
                            }
                        }
                    }
                );
                return filteredWalker.filter(walker => walker.neighbourhoods.includes(owner.address.neighbourhood));
            }

            throw new AuthenticationError('Not logged in');
        }

        // checkWalkerAvailability: async (parent, { date, time }, context) => {
        //     if(context.owner){
        //         const timeSlot = getTimeSlot(time);
        //         const owner = await Owner.findById(context.owner._id);

        //         if (owner.address.city === "Toronto") {
        //             const filteredWalker = await Walker.find(
        //                 {
        //                     'address.city': 'Toronto',
        //                     availability: {
        //                         $elemMatch : { 
        //                             date,
        //                             [timeSlot]: true
        //                         }
        //                     }
        //                 }
        //             );
        //             return filteredWalker.filter(walker => walker.neighbourhoods.includes(owner.address.neighbourhood));
        //         } else {
        //             return await Walker.find(
        //                 {
        //                     'address.city': owner.address.city,
        //                     availability: {
        //                         $elemMatch : { 
        //                             date,
        //                             [timeSlot]: true
        //                         }
        //                     }
        //                 }
        //             );
        //         }
        //     }

        //     throw new AuthenticationError('Not logged in');
        // }
    },
    Mutation: {
        /* Owner mutations
           - addOwner
           - loginOwner
           - addDog
           - updateOwnerProfile
           - updateOwnerPassword
           - updateOwnerAvatar
        */
        addOwner: async (parent, { input }) => {
            const owner = await Owner.create(input);
            const token = signTokenOwner(owner);

            return { token, owner };
        },

        loginOwner: async (parent, { email, password }) => {
            const owner = await Owner.findOne({ email });

            if (!owner) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await owner.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signTokenOwner(owner);

            return { token, owner };
        },

        addDog: async (parent, { input }, context) => {
            if (context.owner) {
                const updatedOwner = await Owner.findByIdAndUpdate(
                    context.owner._id, 
                    { $push: { dogs: input } },
                    { new: true, runValidators: true }
                );

                return updatedOwner;
            }

            throw new AuthenticationError('Not logged in');
        },

        updateDog: async (parent, { dog_id, name, breed, weight, treats, avatar }, context) => {
            if (context.owner) {
                return await Owner.findOneAndUpdate(
                    {_id: context.owner._id, "dogs._id": dog_id},
                    { $set: { 
                        "dogs.$.name":  name,
                        "dogs.$.breed":  breed,
                        "dogs.$.weight":  weight,
                        "dogs.$.treats":  treats,
                        "dogs.$.avatar":  avatar,
                     } 
                    },
                    { new: true, runValidators: true }
                );
            }

            throw new AuthenticationError('Not logged in');
        },

        removeDog: async (parent, { dog_id }, context) => {
            if (context.owner) {
                return await Owner.findByIdAndUpdate(
                    context.owner._id,
                    { $pull: { dogs: { _id: mongoose.Types.ObjectId(dog_id) } } },
                    { new: true, runValidators: true }
                );
            }

            throw new AuthenticationError('Not logged in');
        },

        updateDogAvatar: async (parent, { dog_id, avatar }, context) => {
            if (context.owner) {
                // find the owner by id
                const owner = await Owner.findById(context.owner._id); 
                const targetIndex = owner.dogs.findIndex(dog => dog._id.toString() === dog_id);
                owner.dogs[targetIndex].avatar = avatar;
                await owner.save();

                return owner;
            }
      
            throw new AuthenticationError('Not logged in');
        },

        updateOwnerProfile: async (parent, { input }, context) => {
            if (context.owner) {
                return await Owner.findByIdAndUpdate(
                    context.owner._id, 
                    {...input}, 
                    { new: true, runValidators: true }
                );
            }
      
            throw new AuthenticationError('Not logged in');
        },

        updateOwnerPassword: async (parent, { old_password, new_password }, context) => {
            if (context.owner) {
                // find the owner by id
                const owner = await Owner.findById(context.owner._id); 

                // check if the current password is valid
                const validPassword = await owner.isCorrectPassword(old_password);
                if (!validPassword) {
                    throw new UserInputError("Current password is incorrect!");
                }
                
                owner.password = new_password;
                return await owner.save();

            }
      
            throw new AuthenticationError('Not logged in');
        },

        updateOwnerAvatar: async (parent, { avatar }, context) => {
            if (context.owner) {
                // find the owner by id
                const owner = await Owner.findByIdAndUpdate(
                    context.owner._id,
                    {avatar: avatar},
                    { new: true, runValidators: true }
                ); 
                
                return owner;
            }
      
            throw new AuthenticationError('Not logged in');
        },

        /* Walker mutations
           - addWalker
           - loginWalker
           - updateWalkerProfile
           - updateWalkerPassword
           - updateWalkerAvailability
           - updateWalkerStatus
           - updateWalkerAvatar
           - addWalkerEarnings
        */

        addWalker: async (parent, { input }) => {
            const walker = await Walker.create(input);
            const token = signTokenWalker(walker);

            return { token, walker };
        },

        // walker login
        loginWalker: async (parent, { email, password }) => {
            const walker = await Walker.findOne({ email });

            if (!walker) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await walker.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signTokenWalker(walker);

            return { token, walker };
        },

        updateWalkerProfile: async (parent, { input }, context) => {
            if (context.walker) {
                return await Walker.findByIdAndUpdate(
                    context.walker._id, 
                    {...input}, 
                    { new: true, runValidators: true }
                );
            }
      
            throw new AuthenticationError('Not logged in');
        },

        updateWalkerPassword: async (parent, { old_password, new_password }, context) => {
            if (context.walker) {
                // find the walker by id
                const walker = await Walker.findById(context.walker._id); 

                // check if the current password is valid
                const validPassword = await walker.isCorrectPassword(old_password);
                
                if (!validPassword) {
                    throw new UserInputError("Current password is incorrect!");
                }

                walker.password = new_password;
                return await walker.save();
            }
      
            throw new AuthenticationError('Not logged in');
        },

        updateWalkerAvailability: async (parent, { input }, context) => {
            if (context.walker) {
                const walker = await Walker.findById(context.walker._id);
                walker.availability = [...input];
                return await walker.save();
            }
      
            throw new AuthenticationError('Not logged in');
        },

        updateWalkerStatus: async (parent, { walker_id, status }, context) => {
            // only executable by an admin
            if (context.owner && context.owner.admin) {
                return await Walker.findByIdAndUpdate(
                    walker_id, 
                    { status }, 
                    { new: true, runValidators: true }
                );
            }
      
            throw new AuthenticationError('Not logged in');
        },

        updateWalkerAvatar: async (parent, { avatar }, context) => {
            if (context.walker) {
                // find the walker by id
                const walker = await Walker.findByIdAndUpdate(
                    context.walker._id,
                    {avatar: avatar},
                    { new: true, runValidators: true }
                ); 
                
                return walker;
            }
      
            throw new AuthenticationError('Not logged in');
        },

        addWalkerEarnings: async (parent, { earnings }, context) => {
            // only executable by an admin
            if (context.walker) {
                const newWalker = await Walker.findById(context.walker._id);
                newWalker.earnings += earnings;
                return newWalker.save();
            }
      
            throw new AuthenticationError('Not logged in');
        },

        /* Order mutations
           - addOrder
           - updateOrder
           - updateOrderStatus
           - removeOrder
        */
        addOrder: async (parent, { input }, context) => {
            // only owner can add order
            if (context.owner) {
                // check if owner has payment info
                const owner = await Owner.findById(context.owner._id);
                if (!owner.stripe_customer_id || 
                    owner.stripe_customer_id === "" || 
                    !owner.stripe_setup_intent || 
                    owner.stripe_setup_intent === "") {
                        throw new ApolloError("paymentInfoError: Please complete payment info before completing any order!");
                }

                const order = await Order.create(input);

                if( input.walker ){
                    const walker = await Walker.findById(input.walker); 
                    const targetIndex = walker.availability.findIndex(item => item.date === input.service_date);
                    const timeSlot = getTimeSlot(input.service_time);
                    walker.availability[targetIndex][timeSlot] = false;
                    await walker.save();
                }

                return order;
            }
      
            throw new AuthenticationError('Not logged in');
        },

        updateOrder: async (parent, {order_id, input }, context) => {
            if (context.owner || context.walker) {
                const originalOrder = await Order.findById(order_id);

                const order = await Order.findByIdAndUpdate(
                    order_id,
                    {...input},
                    { new: true, runValidators: true }
                );

                if(originalOrder.walker !== input.walker){
                    if(originalOrder.walker){
                        // change the original walker's time slot back to available
                        const originalWalker = await Walker.findById(originalOrder.walker); 
                        const targetOriginalDateIndex = originalWalker.availability.findIndex(item => item.date === originalOrder.service_date);
                        const timeSlot = getTimeSlot(input.service_time?input.service_time:originalOrder.service_time);
                        originalWalker.availability[targetOriginalDateIndex][timeSlot] = true;    
                        await originalWalker.save();
                    }

                    if(input.walker){
                        // change the new walker's time slot to unavailable
                        const walker = await Walker.findById(input.walker); 
                        const targetNewDateIndex = walker.availability.findIndex(item => item.date === (input.service_date?input.service_date:originalOrder.service_date));
                        const timeSlot = getTimeSlot(input.service_time?input.service_time:originalOrder.service_time);
                        walker.availability[targetNewDateIndex][timeSlot] = false;    
                        await walker.save();
                    }
                }

                return order;
            }
      
            throw new AuthenticationError('Not logged in');
        },

        updateOrderStatus: async (parent, {order_id, status }, context) => {
            if (context.owner || context.walker) {
                const order = await Order.findByIdAndUpdate(
                    order_id,
                    { status: status },
                    { new: true, runValidators: true }
                );
            
                return order;
            }
      
            throw new AuthenticationError('Not logged in');
        },

        updateOrderCoords: async (parent, {order_id, lon, lat }, context) => {
            if (context.walker) {
                const order = await Order.findByIdAndUpdate(
                    order_id, 
                    {$push: {coords: {lon, lat} } }
                );
          
                return order;
            }    
           
            throw new AuthenticationError('Not logged in');
        },

        removeOrder: async (parent, { order_id }, context) => {
            if (context.owner) {

                const order = await Order.findByIdAndDelete(order_id);

                if( order.walker ){
                    // change the original walker's time slot back to available
                    const originalWalker = await Walker.findById(order.walker); 
                    const targetOriginalDateIndex = originalWalker.availability.findIndex(item => item.date === order.service_date);
                    const timeSlot = getTimeSlot(order.service_date);
                    originalWalker.availability[targetOriginalDateIndex][timeSlot] = true;    
                    await originalWalker.save();
                }

                return order;
            }
        
            throw new AuthenticationError('Not logged in');
        },

        /* Review mutations
           - addReview
           - updateReview
           - removeReview
           - clearReview
        */
        addReview: async (parent, { input }, context) => {
            if(context.owner){
                const { walker_id, rating, review_text} = input;   
                const review = {owner_id: mongoose.Types.ObjectId(context.owner._id), rating: rating, review_text: review_text};

                // remove current review if exists to make sure only one review can be added by same owner
                await Walker.findByIdAndUpdate(
                    walker_id,
                    { $pull: { reviews: { owner_id: mongoose.Types.ObjectId(context.owner._id) } } },
                    { new: true, runValidators: true }
                );

                return await Walker.findByIdAndUpdate(
                    walker_id,
                    { $push: { reviews: review } },
                    { new: true, runValidators: true }
                );
            }

            throw new AuthenticationError('Not logged in');
        },

        removeReview: async (parent, { walker_id }, context) => {
            if (context.owner) {
                return await Walker.findByIdAndUpdate(
                    walker_id,
                    { $pull: { reviews: { owner_id: context.owner._id } } },
                    { new: true, runValidators: true }
                );
            }

            throw new AuthenticationError('Not logged in');
        },

        updateReview: async (parent, { input }, context) => {
            if (context.owner) {
                const { walker_id, rating, review_text } = input;
                const review = { owner_id: context.owner._id, rating: rating, review_text: review_text };

                // remove current review
                await Walker.findByIdAndUpdate(
                    walker_id,
                    { $pull: { reviews: { owner_id: context.owner._id } } },
                    { new: true, runValidators: true }
                );

                // add new review
                return await Walker.findByIdAndUpdate(
                    walker_id,
                    { $push: { reviews: review } },
                    { new: true, runValidators: true }
                );
            }

            throw new AuthenticationError('Not logged in');
        },

        clearReview: async (parent, { walker_id }, context) => {
            if (context.owner) {
                const walker = await Walker.findByIdAndUpdate(
                    walker_id,
                    { $set: { reviews: [] } }
                );

                return walker;
            }

            throw new AuthenticationError('Not logged in');
        },

        clearSetupIntent: async (parent, arg, context) => {
            if (context.owner) {
                const newOwner = await Owner.findByIdAndUpdate(
                    context.owner._id,
                    {stripe_setup_intent: null},
                    { new: true, runValidators: true }
                );

                return newOwner;
            }

            throw new AuthenticationError('Not logged in');
        },
    }
};

module.exports = resolvers;
