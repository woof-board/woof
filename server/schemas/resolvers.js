require('dotenv').config();

const { AuthenticationError } = require('apollo-server-express');

const { Owner, Walker, Order } = require('../models');
const { signTokenOwner, signTokenWalker } = require('../utils/auth');
const { getTimeSlot } = require('../utils/helpers');
const mongoose = require('mongoose');




const resolvers = {
    Query: {
        owner: async (parent, {owner_id}, context) => {
            return await Owner.findById(owner_id)
            .select('-__v -password');
        },

        owners: async (parent, args, context) => {
            return await Owner.find({})
            .select('-__v -password');
        },

        // to get owner's own profile
        owner_me: async (parent, args, context) => {
            if (context.owner) {
                const owner = await Owner.findById(context.owner._id)
                    .select('-__v -password');

                return owner;
            }

            throw new AuthenticationError('Not logged in');
        },

        walker: async (parent, {walker_id}, context) => {
            return await Walker.findById(walker_id)
            .select('-__v -password');
        },

        walkers: async (parent, args, context) => {
            return await Walker.find({})
            .select('-__v -password');
        },

        // to get walker's own profile
        walker_me: async (parent, args, context) => {
            if (context.walker) {
                const walker = await Walker.findById(context.walker._id)
                    .select('-__v -password');

                return walker;
            }

            throw new AuthenticationError('Not logged in');
        },

        order: async (parent, {order_id}, context) => {
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
        owner_orders: async (parent, {owner_id}, context) => {
            return await Order.find({ owner: mongoose.Types.ObjectId(owner_id) })
            .select('-__v')
            .populate('owner')
            .populate('walker');
        },

        walker_orders: async (parent, {walker_id}, context) => {
            return await Order.find({ walker: mongoose.Types.ObjectId(walker_id) })
            .select('-__v')
            .populate('owner')
            .populate('walker');
        },
        
        checkout: async (parent, args, context) => {

            const stripe = require('stripe')(process.env.STRIPE_KEY||process.env.STRIPE_TEST_SK);
            const url = new URL(context.headers.referer).origin;
            const customer = await stripe.customers.create();
            // console.log(process.env.STRIPE_TEST_SK);
            // console.log(customer);
                  
            const setupIntent = await stripe.setupIntents.create({
                customer: customer.id,
              });
            const clientSecret = setupIntent.client_secret;

            const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              mode: 'setup',
              customer: customer.id,
              success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${url}/`
            });
            
            return { session: session.id };
        }
    },
    Mutation: {
        // to add a new owner
        addOwner: async (parent, { input }) => {
            const owner = await Owner.create(input);
            const token = signTokenOwner(owner);

            return { token, owner };
        },

        // to add a new walker
        addWalker: async (parent, { input }) => {
            const walker = await Walker.create(input);
            const token = signTokenWalker(walker);

            return { token, walker };
        },

        // owner login
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

        // add a dog
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

        /* Order mutations
           - addOrder
           - updateOrder
           - removeOrder
        */
        addOrder: async (parent, { input }, context) => {
            if (context.owner) {
                const order = await Order.create(input);

                return order;
            }

            throw new AuthenticationError('Not logged in');
        },

        updateOrder: async (parent, {order_id, input }, context) => {
            if (context.owner) {
                const order = await Order.findByIdAndUpdate(
                    order_id, 
                    input,
                    { new: true, runValidators: true }
                );

                return order;
            }

            throw new AuthenticationError('Not logged in');
        },

        removeOrder: async (parent, {order_id, input }, context) => {
            if (context.owner) {
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
                const {owner_id, walker_id, rating, reviewText} = input;   
                const review = {owner_id: owner_id, rating: rating, reviewText: reviewText};

                // remove current review if exists to make sure only one review can be added by same owner
                await Walker.findByIdAndUpdate(
                    walker_id,
                    { $pull: { reviews: { owner_id: owner_id } } },
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
            if(context.owner){
                return await Walker.findByIdAndUpdate(
                    walker_id,
                    { $pull: { reviews: { owner_id: context.owner._id } } },
                    { new: true, runValidators: true }
                );
            }

            throw new AuthenticationError('Not logged in');
        },

        updateReview: async (parent, { input }, context) => {
            if(context.owner){
                const {owner_id, walker_id, rating, reviewText} = input;   
                const review = {owner_id: owner_id, rating: rating, reviewText: reviewText};

                // remove current review
                await Walker.findByIdAndUpdate(
                    walker_id,
                    { $pull: { reviews: { owner_id: owner_id } } },
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
            if(context.owner){
                const walker =  await Walker.findByIdAndUpdate(
                    walker_id,
                    { $set: { reviews:[] } }
                );

                return walker;
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
    }
};

module.exports = resolvers;
