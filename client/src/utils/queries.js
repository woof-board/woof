import gql from 'graphql-tag';

export const QUERY_OWNER_ME = gql`
    query {
        owner_me {
            _id
            firstName
            lastName
            email
            admin
            status
            address {
                city
            }
            phone
            dogs {
                name
            }
            dogCount
        }
    }
`;

export const QUERY_OWNER = gql`
  query owner($owner_id: ID!) {
    owner (owner_id: $owner_id){
      _id
      firstName
      lastName
      email
      dogs{
        name
      }
    }
  }
`;

export const QUERY_OWNERS = gql`
  query owners {
    owners{
      _id
      firstName
      lastName
      email
      dogs{
        name
      }
    }
  }
`;

export const QUERY_WALKER_ME = gql`
    query {
        walker_me {
            _id
            firstName
            lastName
            email
            reviews{
                rating
                reviewText
            }
            earnings
            averageRating
            neighbourhoods
            status
            availability {
                date
                slot9am
                slot11am
                slot1pm
                slot3pm
                slot5pm
                slot7pm
                slot9pm
            }
        }
    }
`;


export const QUERY_WALKER = gql`
  query walker($walker_id: ID!) {
    walker (walker_id: $walker_id){
      _id
      firstName
      lastName
      email
      reviews{
        owner_id
        rating
        reviewText
      }
      averageRating
    }
  }
`;

export const QUERY_WALKERS = gql`
  query walkers{
    walkers {
      _id
      firstName
      lastName
      email
      reviews{
        owner_id
        rating
        reviewText
      }
      averageRating
    }
  }
`;

export const QUERY_ORDER = gql`
  query order($order_id: ID!) {
    order (order_id: $order_id){
      _id
      serviceDate
      serviceTime
      owner{
        _id
        firstName
        lastName
      }
      walker{
        _id
        firstName
        lastName
      }
    }
  }
`;

export const QUERY_ORDERS = gql`
  query orders{
    orders {
      serviceDate
      serviceTime
      owner{
        _id
      }
      walker{
        _id
      }
    }
  }
`;

export const QUERY_OWNER_ORDERS = gql`
  query owner_orders($owner_id: ID!) {
    owner_orders (owner_id: $owner_id){
      _id
      serviceDate
      serviceTime
      owner{
        _id
        firstName
        lastName
      }
      walker{
        _id
        firstName
        lastName
      }
    }
  }
`;

export const QUERY_WALKER_ORDERS = gql`
  query walker_orders($walker_id: ID!) {
    walker_orders (walker_id: $walker_id){
      _id
      serviceDate
      serviceTime
      owner{
        _id
        firstName
        lastName
      }
      walker{
        _id
        firstName
        lastName
      }
    }
  }
`;

export const QUERY_WALKER_AVAILABILITY = gql`
    query checkWalkerAvailability($date: String!, $time: String!) {
        checkWalkerAvailability(date: $date, time: $time) {
            _id
            firstName
            lastName
            email
            neighbourhoods
            reviews {
                reviewText
            }
            averageRating
        }
    }
`;

export const GET_CUSTOMER_SESSION_ID = gql`
  query get_customer_session_id {
    get_customer_session_id {
        session_id
      }
  }
`;

export const CHARGE_OWNER = gql`
  query charge_owner($amount: Int!){
    charge_owner(amount: $amount) {
        id
        object
        amount
        status
    }	
  }
`;
