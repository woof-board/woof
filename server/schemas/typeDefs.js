const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Owner {
        _id: ID
        firstName: String
        lastName: String
        email: String
        admin: Boolean
        address: Address
        phone: String
        dogs: [Dog]
        dogCount: Int
    }

    type Walker {
        _id: ID
        firstName: String
        lastName: String
        email: String
        neighbourhoods: [String]
        reviews: [Review]
        earnings: Float
        averageRating: Float
        availability: [Availability]
    }

    type Order {
        _id: ID
        serviceDate: String
        serviceTime: String
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
    }

    input WalkerInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    input DogInput {
        name: String!
        breed: String!
        weight: Float!
        treats: Boolean!
    }

    input OrderInput {
        serviceDate: String!
        serviceTime: String!
        owner: ID!
        walker: ID
        dogs: [ID]!
    }

    input ReviewInput {
        owner_id: ID!
        walker_id: ID!
        rating: Int!
        reviewText: String
    }

    type Query {
        owner(owner_id: ID!): Owner
        owners: [Owner]
        owner_me: Owner
        walker(walker_id: ID!): Walker
        walkers: [Walker]
        walker_me: Walker
        order(order_id: ID): Order
        orders: [Order]
        owner_orders(owner_id: ID): [Order]
        walker_orders(walker_id: ID): [Order]
    }

    type Mutation {
        addOwner(input: OwnerInput): AuthOwner
        addWalker(input: WalkerInput): AuthWalker
        loginOwner(email: String!, password: String!): AuthOwner
        loginWalker(email: String!, password: String!): AuthWalker
        addDog(input: DogInput): Owner
        addOrder(input: OrderInput): Order
        updateOrder(order_id: ID!, input: OrderInput): Order
        addReview(input: ReviewInput): Walker
        removeReview(walker_id: ID!): Walker
        updateReview(input: ReviewInput): Walker
        clearReview(walker_id: ID!): Walker
    }

`;

module.exports = typeDefs;
