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