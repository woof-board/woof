import gql from 'graphql-tag';

/* ORDER mutations
    - ADD_ORDER
    - UPDATE_ORDER
    - UPDATE_ORDER_STATUS
    - REMOVE_ORDER
*/
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

/* example query variables

{
  "order_id": "609d910d1342e402388e2a2f",
  "status": "IN_PROGRESS"
}

*/

export const UPDATE_ORDER_STATUS = gql`
    mutation updateOrderStatus($order_id: ID!, $status: String!) {
        updateOrderStatus(order_id: $order_id, status: $status) {
            _id
            serviceDate
            serviceTime
            status
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

/* REVIEW mutations
    - ADD_REVIEW
    - REMOVE_REVIEW
    - UPDATE_REVIEW
    - CLEAR_REVIEW
*/

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

/* WALKER mutations
    - ADD_WALKER
    - LOGIN_WALKER
    - UPDATE_WALKER_PROFILE
    - UPDATE_WALKER_PASSWORD
    - UPDATE_WALKER_AVAILABILITY
    - UPDATE_WALKER_STATUS
*/

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

export const UPDATE_WALKER_PROFILE = gql`
    mutation updateWalkerProfile($input: WalkerProfileInput) {
        updateWalkerProfile(input: $input) {
            _id
            firstName
            lastName
            email
            avatar
            reviews{
                rating
                reviewText
            }
            earnings
            averageRating
            neighbourhoods
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


/* OWNER mutations
    - ADD_OWNER
    - LOGIN_OWNER
*/

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