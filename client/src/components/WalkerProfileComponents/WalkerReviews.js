import React from 'react';
import '../../css/WalkerProfile.css';
import SingleReview from '../SingleReview';
import {
  List,
  Datagrid,
  TextField,
  EmailField,
} from 'react-admin';

export const UserList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="address.street" />
      <TextField source="phone" />
      <TextField source="website" />
      <TextField source="company.name" />
    </Datagrid>
  </List>
);

function WalkerReviews({ reviews=[] }) {
    const totalReviews = reviews.length;

    return (
        <div className="walker-profile-container">
          <div>
            My Reviews - {totalReviews ? `Viewing ${totalReviews} past ${totalReviews === 1 ? 'review' : 'reviews'}:`
              : 'You have no past Reviews'}
          </div>
          {
              reviews.map((review, ind) => <SingleReview key={ind} review={review}/>)
          }
        </div>
    )
}

export default WalkerReviews;