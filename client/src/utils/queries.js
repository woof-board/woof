import gql from 'graphql-tag';

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