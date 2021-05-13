import gql from 'graphql-tag';

export const ADD_ORDER = gql`
    mutation addOrder($input: OrderInput!) {
        addOrder(input: $input) {
            _id
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
  }
`;

export const UPDATE_ORDER = gql`
    mutation updateOrder($order_id: ID!, $input: OrderInput!) {
        updateOrder(order_id: $order_id, input: $input) {
            _id
            serviceDate
            serviceTime
            owner{
                _id
            }
            walker{
                _id
            }
            dogs{
                _id
            }
        }
    }
`;

export const REMOVE_ORDER = gql`
    mutation removeOrder($order_id: ID!) {
        removeOrder(order_id: $order_id) {
            _id
            serviceDate
            serviceTime
            owner{
                _id
            }
            walker{
                _id
            }
            dogs{
                _id
            }
        }
    }
`;

export const ADD_REVIEW = gql`
  mutation addReview( $input: ReviewInput ) {
    addReview( input: $input ) {
      _id
      firstName
      lastName
      reviews{
        owner
        rating
        reviewText
      }
    }
  }
`;

export const REMOVE_REVIEW = gql`
    mutation removeReview($walker_id: ID! ) {
        removeReview(walker_id: $walker_id ) {
            _id
            firstName
            lastName
            reviews{
                owner_id
                rating
                reviewText
            }
        }
    }
`;

export const UPDATE_REVIEW = gql`
    mutation updateReview($input: ReviewInput ) {
        updateReview(input: $input ) {
            _id
            firstName
            lastName
            reviews{
                owner_id
                rating
                reviewText
            }
        }
    }
`;

export const CLEAR_REVIEW = gql`
    mutation clearReview($walker_id: ID! ) {
        clearReview(walker_id: $walker_id) {
            _id
            firstName
            lastName
            reviews
            averageRating
        }
    }
`;

export const ADD_WALKER = gql`
    mutation addWalker($input: WalkerInput) {
        addWalker(input: $input) {
            token
            walker {
                _id
                firstName
                lastName
                email
                ratings
                averageRating
            }
        }
    }
`;

export const LOGIN_WALKER = gql`
    mutation loginWalker($email: String!, $password: String!) {
        loginWalker(email: $email, password: $password) {
            token
            walker {
                _id
                email
            }
        }
    }
`;

export const ADD_OWNER = gql`
    mutation addOwner($input: OwnerInput) {
        addOwner(input: $input) {
            token
            owner {
                _id
                firstName
                lastName
                email
                admin
                dogs {
                    name
                }
            }
        }
    }
`;

export const LOGIN_OWNER = gql`
    mutation loginOwner($email: String!, $password: String!) {
        loginOwner(email: $email, password: $password) {
            token
            owner {
                _id
                email
            }
        }
}
`;