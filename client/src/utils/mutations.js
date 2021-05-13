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