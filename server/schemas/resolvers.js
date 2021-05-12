const { AuthenticationError } = require('apollo-server-express');

const { Owner, Walker } = require('../models');
const { signTokenOwner, signTokenWalker } = require('../utils/auth');

// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        // to get owner's own profile
        owner_me: async (parent, args, context) => {
            if (context.owner) {
                const owner = await Owner.findById(context.owner._id)
                    .select('-__v -password');

                return owner;
            }

            throw new AuthenticationError('Not logged in');
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

        // order: async (parent, { _id }, context) => {
        //   if (context.user) {
        //     const user = await User.findById(context.user._id).populate({
        //       path: 'orders.products',
        //       populate: 'category'
        //     });

        //     return user.orders.id(_id);
        //   }

        //   throw new AuthenticationError('Not logged in');
        // },
        // checkout: async (parent, args, context) => {
        //   const url = new URL(context.headers.referer).origin;
        //   const order = new Order({ products: args.products });
        //   const line_items = [];

        //   const { products } = await order.populate('products').execPopulate();

        //   for (let i = 0; i < products.length; i++) {
        //     const product = await stripe.products.create({
        //       name: products[i].name,
        //       description: products[i].description,
        //       images: [`${url}/images/${products[i].image}`]
        //     });

        //     const price = await stripe.prices.create({
        //       product: product.id,
        //       unit_amount: products[i].price * 100,
        //       currency: 'usd',
        //     });

        //     line_items.push({
        //       price: price.id,
        //       quantity: 1
        //     });
        //   }

        //   const session = await stripe.checkout.sessions.create({
        //     payment_method_types: ['card'],
        //     line_items,
        //     mode: 'payment',
        //     success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        //     cancel_url: `${url}/`
        //   });

        //   return { session: session.id };
        // }
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

        // addOrder: async (parent, { products }, context) => {
        // //   console.log(context);
        //   if (context.user) {
        //     const order = new Order({ products });

        //     await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        //     return order;
        //   }

        //   throw new AuthenticationError('Not logged in');
        // },
        // updateUser: async (parent, args, context) => {
        //   if (context.user) {
        //     return await User.findByIdAndUpdate(context.user._id, args, { new: true });
        //   }

        //   throw new AuthenticationError('Not logged in');
        // },
        // updateProduct: async (parent, { _id, quantity }) => {
        //   const decrement = Math.abs(quantity) * -1;

        //   return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        // },
    }
};

module.exports = resolvers;
