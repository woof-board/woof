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
            service_date
            service_time
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
    mutation updateOrder($order_id: ID!, $input: UpdateOrderInput!) {
        updateOrder(order_id: $order_id, input: $input) {
            _id
            service_date
            service_time
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
            service_date
            service_time
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

export const UPDATE_ORDER_COORDS = gql`
    mutation updateOrderCoords($order_id: ID!, $coords: Array!) {
        updateOrderCoords(order_id: $order_id, coords: $coords) {
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
            coords
        }
    }
`;

export const REMOVE_ORDER = gql`
    mutation removeOrder($order_id: ID!) {
        removeOrder(order_id: $order_id) {
            _id
            service_date
            service_time
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
      first_name
      last_name
      reviews{
        owner_id{
            _id
            first_name
            last_name
          }
        rating
        review_text
      }
    }
  }
`;

export const REMOVE_REVIEW = gql`
    mutation removeReview($walker_id: ID! ) {
        removeReview(walker_id: $walker_id ) {
            _id
            first_name
            last_name
            reviews{
                owner_id{
                    _id
                    first_name
                    last_name
                  }
                rating
                review_text
            }
        }
    }
`;

export const UPDATE_REVIEW = gql`
    mutation updateReview($input: ReviewInput ) {
        updateReview(input: $input ) {
            _id
            first_name
            last_name
            reviews{
                owner_id{
                    _id
                    first_name
                    last_name
                  }
                rating
                review_text
            }
        }
    }
`;

export const CLEAR_REVIEW = gql`
    mutation clearReview($walker_id: ID! ) {
        clearReview(walker_id: $walker_id) {
            _id
            first_name
            last_name
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
                first_name
                last_name
                email
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

export const UPDATE_WALKER_PASSWORD = gql`
    mutation updateWalkerPassword($old_password: String!, $new_password: String!) {
        updateWalkerPassword(old_password: $old_password, new_password: $new_password) {
            _id
        }
    }
`;

export const UPDATE_WALKER_AVAILABILITY = gql`
    mutation updateWalkerAvailability($input: [AvailabilityInput]) {
        updateWalkerAvailability(input: $input) {
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
                first_name
                last_name
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

export const UPDATE_OWNER_PROFILE = gql`
    mutation updateOwnerProfile($input: OwnerProfileInput) {
        updateOwnerProfile(input: $input) {
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
                name
                breed
                weight
                treats
                avatar
            }
            dog_count
            stripe_customer_id
            stripe_setup_intent
        }
    }
`;

export const UPDATE_OWNER_PASSWORD = gql`
    mutation updateOwnerPassword($old_password: String!, $new_password: String!) {
        updateOwnerPassword(old_password: $old_password, new_password: $new_password) {
            _id
        }
    }
`;

export const ADD_DOG = gql`
    mutation addDog($input: DogInput) {
        addDog(input: $input){
            _id
            first_name
            last_name
            email
            dogs{
                _id
                name
                breed
                weight
                treats
            }
        }
    }
`;