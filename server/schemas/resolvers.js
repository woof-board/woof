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

        getCustomerSessionId: async (parent, args, context) => {

            if (context.owner) {
                const url = new URL(context.headers.referer).origin;

                const {stripe_customer_id:customer_id} = await Owner.findById(context.owner._id).select('-__v -password');
                if(!customer_id){
                    // if owner customer_id is empty, create a customer through stripe
                    const {id: customer_id} = await stripe.customers.create();

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

        chargeOwner: async (parent, {amount, description}, context) => {
            console.log(amount)
            console.log(description)
            if (context.owner) {
                const {stripe_customer_id:customer_id, stripe_setup_intent:setup_intent} = await Owner.findById(context.owner._id).select('-__v -password');
                const setupIntent = await stripe.setupIntents.retrieve(setup_intent);

                console.log(setupIntent)
                // create a new charging instance
                const charge = await stripe.paymentIntents.create({
                    amount: amount,
                    currency: 'cad',
                    customer: customer_id,
                    payment_method: setupIntent.payment_method,
                    confirmation_method: 'automatic',
                    description: description,
                });

                // confirm charging
                await stripe.paymentIntents.confirm(charge.id);

                // get finalized charging information
                const newCharge = await stripe.paymentIntents.retrieve(charge.id);
                return newCharge;
            }

            throw new AuthenticationError('Not logged in');
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
                // const owner = await Owner.findById(context.owner._id)
                //     .select('-__v -password');
                const timeSlot = getTimeSlot(time);
                
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
                return filteredWalker;
            }

            throw new AuthenticationError('Not logged in');
        },
    },
    Mutation: {
        /* Owner mutations
           - addOwner
           - loginOwner
           - addDog
           - updateOwnerProfile
           - updateOwnerPassword
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

                // return await Owner.findByIdAndUpdate(
                //     context.owner._id, 
                //     { password: new_password }, 
                //     { new: true, runValidators: true }
                // );
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

                // return await Walker.findByIdAndUpdate(
                //     context.walker._id, 
                //     { password: new_password }, 
                //     { new: true, runValidators: true }
                // );
            }
      
            throw new AuthenticationError('Not logged in');
        },

        updateWalkerAvailability: async (parent, { input }, context) => {
            if (context.walker) {
                const walker = await Walker.findById(context.walker._id);
                walker.availability = [...input];
                return await walker.save();
                // return await Walker.findByIdAndUpdate(
                //     context.walker._id, 
                //     { $set: { availability: [...input] } },
                //     { new: true, runValidators: true }
                // );
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

        /* Order mutations
           - addOrder
           - updateOrder
           - updateOrderStatus
           - removeOrder
        */
        addOrder: async (parent, { input }, context) => {
            // only owner can add order
            if (context.owner) {
                const order = await Order.create(input);

                return order;
            }
      
            throw new AuthenticationError('Not logged in');
        },

        updateOrder: async (parent, {order_id, input }, context) => {
            if (context.owner || context.walker) {
                const order = await Order.findByIdAndUpdate(
                    order_id,
                    {...input},
                    { new: true, runValidators: true }
                );

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

        removeOrder: async (parent, {order_id, input }, context) => {
            if (context.owner && context.owner.admin) {
                const order = await Order.findByIdAndDelete(order_id);

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
