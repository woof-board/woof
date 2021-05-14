import gql from 'graphql-tag';

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