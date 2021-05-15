const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Owner {
        _id: ID
        firstName: String
        lastName: String
        email: String
        avatar: String
        admin: Boolean
        address: Address
        phone: String
        dogs: [Dog]
        dogCount: Int
        status: String
        stripe_customer_id: String
    }

    type Walker {
        _id: ID
        firstName: String
        lastName: String
        email: String
        avatar: String
        neighbourhoods: [String]
        reviews: [Review]
        earnings: Float
        averageRating: Float
        availability: [Availability]
        status: String
    }

    type Order {
        _id: ID
        serviceDate: String
        serviceTime: String
        status: String
        owner: Owner
        walker: Walker
        dogs: [Dog]  
    }

    type Address {
        street: String
        city: String
        neighbourhood: String
        province: String
        postalCode: String  
    }

    type Dog {
        _id: ID
        name: String
        breed: String
        weight: Float
        treats: Boolean
        avatar: String
    }

    type Availability {
        date: String
        slot9am: Boolean
        slot11am: Boolean
        slot1pm: Boolean
        slot3pm: Boolean
        slot5pm: Boolean
        slot7pm: Boolean
        slot9pm: Boolean
    }
    
    type Review {
        owner_id: ID!
        rating: Int!
        reviewText: String
    }

    type AuthOwner {
        token: ID
        owner: Owner
    }
    
    type AuthWalker {
        token: ID
        walker: Walker
    }

    type Checkout {
        session_id: ID
    }

    type stripeAddress {
        city: String
        country: String
        line1: String
        line2: String
        postal_code: String
        state: String
    }

    type Customer {
        id: String
        object: String
        address: stripeAddress
        balance: Float
        currency: String
        description: String
        email: String
        name: String
        phone: String
    }

    input AddressInput {
        street: String
        city: String
        neighbourhood: String
        province: String
        postal_code: String
    }

    input OwnerInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        admin: Boolean
        address: AddressInput
        phone: String
        status: String
        avatar: String
    }

    input OwnerProfileInput {
        firstName: String
        lastName: String
        email: String
        address: AddressInput
        phone: String
        avatar: String
    }

    input WalkerInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        availability: [AvailabilityInput]
        status: String
        avatar: String
    }

    input WalkerProfileInput {
        firstName: String
        lastName: String
        email: String
        neighbourhoods: [String]
        avatar: String
    }

    input DogInput {
        name: String!
        breed: String!
        weight: Float!
        treats: Boolean!
        avatar: String
    }

    input OrderInput {
        serviceDate: String!
        serviceTime: String!
        owner: ID!
        walker: ID
        dogs: [ID]!
    }

    input ReviewInput {
        walker_id: ID!
        rating: Int!
        reviewText: String
    }

    input AvailabilityInput {
        date: String!
        slot9am: Boolean
        slot11am: Boolean
        slot1pm: Boolean
        slot3pm: Boolean
        slot5pm: Boolean
        slot7pm: Boolean
        slot9pm: Boolean
    }

    type Query {
        owner(owner_id: ID!): Owner
        owners: [Owner]
        owner_me: Owner
        walker(walker_id: ID!): Walker
        walkers: [Walker]
        walker_me: Walker
        checkWalkerAvailability(date: String!, time: String!): [Walker]
        order(order_id: ID): Order
        orders: [Order]
        owner_orders(owner_id: ID): [Order]
        walker_orders(walker_id: ID): [Order]
        get_customer_session_id: Checkout
        get_customer_info_from_stripe: Customer
    }

    type Mutation {
        addOwner(input: OwnerInput): AuthOwner
        loginOwner(email: String!, password: String!): AuthOwner
        addDog(input: DogInput): Owner
        updateOwnerProfile(input: OwnerProfileInput): Owner
        updateOwnerPassword(old_password: String!, new_password: String!): Owner

        addOrder(input: OrderInput): Order
        updateOrder(order_id: ID!, input: OrderInput): Order
        updateOrderStatus(order_id: ID!, status: String!): Order
        removeOrder(order_id: ID!): Order
        
        addReview(input: ReviewInput): Walker
        removeReview(walker_id: ID!): Walker
        updateReview(input: ReviewInput): Walker
        clearReview(walker_id: ID!): Walker
        
        addWalker(input: WalkerInput): AuthWalker
        loginWalker(email: String!, password: String!): AuthWalker
        updateWalkerProfile(input: WalkerProfileInput): Walker
        updateWalkerPassword(old_password: String!, new_password: String!): Walker
        updateWalkerAvailability(input: [AvailabilityInput]): Walker
        updateWalkerStatus(walker_id: ID!, status: String!): Walker
    }

`;

module.exports = typeDefs;
