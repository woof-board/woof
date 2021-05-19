const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Owner {
        _id: ID
        first_name: String
        last_name: String
        email: String
        avatar: String
        admin: Boolean
        address: Address
        phone: String
        dogs: [Dog]
        dog_count: Int
        status: String
        stripe_customer_id: String
        stripe_setup_intent: String
    }

    type Walker {
        _id: ID
        first_name: String
        last_name: String
        email: String
        avatar: String
        address: Address
        neighbourhoods: [String]
        reviews: [Review]
        earnings: Float
        average_rating: Float
        availability: [Availability]
        status: String
    }

    type Order {
        _id: ID
        service_date: String
        service_time: String
        status: String
        owner: Owner
        walker: Walker
        dogs: [Dog] 
        coords: [Coords] 
    }

    type Address {
        street: String
        city: String
        neighbourhood: String
        province: String
        postal_code: String  
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
        owner: Owner
        owner_id: Owner
        rating: Int!
        review_text: String
    }

    type Coords {
        lon: Float
        lat: Float
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

    type Charge {
        id: String
        object: String
        amount: Int
        receipt_url: String
        status: String
    }

    type Payment{
        id: String
        amount: Int
        created: Int
        currency: String
        description: String
        status: String
    }

    type Payments {
        data: [Payment]
    }

    input AddressInput {
        street: String
        city: String
        neighbourhood: String
        province: String
        postal_code: String
    }

    input OwnerInput {
        first_name: String!
        last_name: String!
        email: String!
        password: String!
        admin: Boolean
        address: AddressInput
        phone: String
        status: String
        avatar: String
    }

    input OwnerProfileInput {
        first_name: String
        last_name: String
        email: String
        address: AddressInput
        phone: String
        avatar: String
        status: String
        stripe_customer_id: String
        stripe_setup_intent: String
    }

    input WalkerInput {
        first_name: String!
        last_name: String!
        email: String!
        password: String!
        availability: [AvailabilityInput]
        status: String
        avatar: String
    }

    input WalkerProfileInput {
        first_name: String
        last_name: String
        email: String
        neighbourhoods: [String]
        address: AddressInput
        avatar: String
        status: String
    }

    input DogInput {
        name: String!
        breed: String!
        weight: Float!
        treats: Boolean!
        avatar: String
    }

    input OrderInput {
        service_date: String!
        service_time: String!
        owner: ID!
        walker: ID
        dogs: [ID]
        status: String
    }

    input UpdateOrderInput {
        service_date: String
        service_time: String
        walker: ID
        dogs: [ID]
        status: String
    }

    input ReviewInput {
        walker_id: ID!
        rating: Int!
        review_text: String
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
        ownerMe: Owner
        
        walker(walker_id: ID!): Walker
        walkers: [Walker]
        walkerMe: Walker
        checkWalkerAvailability(date: String!, time: String!): [Walker]

        order(order_id: ID): Order
        orders: [Order]
        ownerOrders(owner_id: ID): [Order]
        walkerOrders(walker_id: ID): [Order]

        getCustomerSessionId: Checkout
        getCustomerInfoFromStripe: Customer
        chargeOwner(amount: Int!, description: String!): Charge
        retrievePayments: Payments
    }

    type Mutation {
        addOwner(input: OwnerInput): AuthOwner
        loginOwner(email: String!, password: String!): AuthOwner
        addDog(input: DogInput): Owner
        updateOwnerProfile(input: OwnerProfileInput): Owner
        updateOwnerPassword(old_password: String!, new_password: String!): Owner

        addOrder(input: OrderInput): Order
        updateOrder(order_id: ID!, input: UpdateOrderInput): Order
        updateOrderStatus(order_id: ID!, status: String!): Order
        updateOrderCoords(order_id: ID!, lat: Float!, lon: Float!): Order
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

        clearSetupIntent: Owner
    }

`;

module.exports = typeDefs;
