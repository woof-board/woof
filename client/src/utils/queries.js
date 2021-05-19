import gql from 'graphql-tag';

export const QUERY_OWNER_ME = gql`
    query {
        ownerMe {
            _id
            first_name
            last_name
            email
            avatar
            admin
            status
            address {
                street
                city
                neighbourhood
                province
                postal_code
            }
            phone
            dogs {
                _id
                name
                breed
                weight
                treats
                avatar
            }
            dog_count
        }
    }
`;

export const QUERY_OWNER_BOOKING = gql`
  query {
    ownerMe {
      _id
      dogs {
        _id
        name
      }
    }    
  }
`

export const QUERY_OWNER = gql`
  query owner($owner_id: ID!) {
    owner (owner_id: $owner_id){
      _id
      first_name
      last_name
      email
      dogs{
        _id
        name
      }
    }
  }
`;

export const QUERY_OWNERS = gql`
  query owners {
    owners{
      _id
      first_name
      last_name
      email
      dogs{
        _id
        name
      }
    }
  }
`;

export const QUERY_WALKER_ME = gql`
    query {
        walkerMe {
            _id
            first_name
            last_name
            email
            avatar
            address {
                street
                city
                neighbourhood
                province
                postal_code
            }
            reviews{
                owner_id{
                  _id
                  first_name
                  last_name
                }
                rating
                review_text
            }
            earnings
            average_rating
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
      first_name
      last_name
      email
      reviews{
        owner_id{
          _id
          first_name
          last_name
        }
        rating
        review_text
      }
      average_rating
    }
  }
`;

export const QUERY_WALKERS = gql`
  query walkers{
    walkers {
      _id
      first_name
      last_name
      email
      reviews{
        owner_id{
          _id
          first_name
          last_name
        }
        rating
        review_text
      }
      average_rating
    }
  }
`;

export const QUERY_ORDER = gql`
  query order($order_id: ID!) {
    order (order_id: $order_id){
      _id
      service_date
      service_time
      owner{
        _id
        first_name
        last_name
      }
      walker{
        _id
        first_name
        last_name
      }
      coords{
        lon
        lat
      }
    }
  }
`;

export const QUERY_ORDERS = gql`
  query orders{
    orders {
      service_date
      service_time
      owner{
        _id
      }
      walker{
        _id
      }
      coords{
        lon
        lat
      }
    }
  }
`;

export const QUERY_OWNER_ORDERS = gql`
  query ownerOrders($owner_id: ID!) {
    ownerOrders (owner_id: $owner_id){
      _id
      service_date
      service_time
      status
      owner{
        _id
        first_name
        last_name
      }
      walker{
        _id
        first_name
        last_name
      }
      coords{
        lon
        lat
      }
    }
  }
`;

export const QUERY_WALKER_ORDERS = gql`
  query walkerOrders($walker_id: ID!) {
    walkerOrders (walker_id: $walker_id){
      _id
      service_date
      service_time
      avatar
      owner{
        _id
        first_name
        last_name
      }
      walker{
        _id
        first_name
        last_name
      }
    }
  }
`;

export const QUERY_WALKER_AVAILABILITY = gql`
    query checkWalkerAvailability($date: String!, $time: String!) {
        checkWalkerAvailability(date: $date, time: $time) {
            _id
            first_name
            last_name
            email
            neighbourhoods
            reviews {
                review_text
            }
            average_rating
        }
    }
`;

export const GET_CUSTOMER_SESSION_ID = gql`
  query getCustomerSessionId {
    getCustomerSessionId {
        session_id
      }
  }
`;

export const CHARGE_OWNER = gql`
  query chargeOwner($amount: Int!, $description: String!){
    chargeOwner(amount: $amount, description: $description) {
        id
        object
        amount
        status
    }	
  }
`;

export const RETRIEVE_PAYMENTS = gql`
  query retrievePayments{
    retrievePayments{
      data{
        id
        amount
        created
        currency
        description
        status
      }
    }
  }
`;