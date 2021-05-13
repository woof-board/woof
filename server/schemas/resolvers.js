const { AuthenticationError } = require('apollo-server-express');

const { Owner, Walker, Order } = require('../models');
const { signTokenOwner, signTokenWalker } = require('../utils/auth');

const mongoose = require('mongoose');
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        owners: async (parent, args, context) => {
            const owner = await Owner.find({})
                .select('-__v -password');

            return owner;
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

        walkers: async (parent, args, context) => {
            const walker = await Walker.find({})
                .select('-__v -password');

            return walker;
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
            return await Order.find({});
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

        // add an order
        addOrder: async (parent, { input }, context) => {
            if (context.owner) {
                const order = await Order.create(input);

                return order;
            }

            throw new AuthenticationError('Not logged in');
        },

        // add rating to walker
        addReview: async (parent, { input }, context) => {

            if(context.owner){
                const {walker_id, rating, reviewText} = input;
                
                const owner_id = mongoose.Types.ObjectId(context.owner._id);
                const review = {owner: owner_id, rating: rating, reviewText: reviewText};

                console.log(`${walker_id}, ${rating}, ${reviewText}`)
                return await Walker.findByIdAndUpdate(
                    walker_id,
                    { $push: { reviews: review } },
                    { new: true, runValidators: true }
                )
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
    }
};

module.exports = resolvers;
