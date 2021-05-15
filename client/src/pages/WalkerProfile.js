import React from 'react';
import '../css/WalkerProfile.css';
import Auth from '../utils/auth';
// import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import decode from 'jwt-decode';
import { QUERY_WALKER_ORDERS, QUERY_WALKER } from '../utils/queries';

function WalkerProfile() {

  // decode token for walker data
  const token = decode(Auth.getToken());
  // get walker _id from array
  const walkerData = token.data;

  // query walker using walker _id to get array of walker REVIEWS
  const reviewData = useQuery(QUERY_WALKER, {
    variables: { walker_id: walkerData._id }
  })

  const walkerReviews = reviewData?.walker || [{ _id: "", firstName: "", email: "", reviews: [{ owner_id: '', rating: '5', reviewText: 'You are Great'}], averageRating: '' }];

  // query walker_orders using walker _id to get array of walker orders
  const orderData = useQuery(QUERY_WALKER_ORDERS, {
    variables: { walker_id: walkerData._id }
  })

  const walkerOrders = orderData?.walker_orders || [{ _id: "", serviceData: '', serviceTime: 'Date(11/11/11)', owner: [{ _id: '', firstName: 'Nathan', lastName: ''}] }];

  //reviewData?.walker for walker = _id, firstName, lastName, email, reviews(owner_id, rating, reviewText), averageRating
  //orderData?.walker_orders for walker_orders = _id, serviceData, serviceTime, owner(_id, firstName, lastName), walker(_id, firstName, lastName)

  const totalOrders = walkerOrders.length;
  const totalReviews = walkerReviews[0].reviews.length;

  // console.log(totalOrders);
  // console.log(totalReviews);

  const handleFormSubmit = async () => {
    alert('Account Updated')
  }

  const walkerArr = [
    {
      display: 'First Name',
      title: walkerData.firstName,
      type: 'text'
    },
    {
      display: 'Last Name',
      title: walkerData.lastName,
      type: 'text'
    },
    {
      display: 'Email',
      title: walkerData.email,
      type: 'email'
    }
  ]

  return (
    <div className="page-body">
      <div className="walker-picture-container">
        IMG HERE
      </div>
      <div className="walker-details-container">
        <div className="walker-profile-container">
          <div>
            My Profile
          </div>
          <form 
            className="user-update-form"
            id="walker-update-form"
            onSubmit={handleFormSubmit}>
            {walkerArr.map((arr) => (
              <div key={arr.display} className="row-data">
                <label className="profile-label">{arr.display}</label>
                <input className="profile-input" placeholder={arr.title} type={arr.type} name={arr.type} defaultValue={arr.title}/>
              </div>
            ))}
            <button
              type="submit"
              className="update-walker-button"
              id="update-walker-button"
            >UPDATE</button>
          </form>
        </div>
        <div className="walker-profile-container">
          <div>
            My Walks - {totalOrders ? `Viewing ${totalOrders} past ${totalOrders === 1 ? 'walk' : 'walks'}:`
            : 'You have no past Walks'}
          </div>
          <div>
            {walkerOrders.map((arr) => (
              <div key={arr._id} className="walks">
                <div>{arr.serviceTime}</div>
                <div>{arr.owner[0].firstName}</div> 
              </div>
            ))}
          </div>
        </div>
        <div className="walker-profile-container">
          <div>
            My Reviews - {totalReviews ? `Viewing ${totalReviews} past ${totalReviews === 1 ? 'review' : 'reviews'}:`
              : 'You have no past Reviews'}
          </div>
          <div>
            {walkerReviews[0].reviews.map((arr) => (
              <div key={arr.owner_id} className="walks">
              <div>Rating: {arr.rating}</div>
              <div>{arr.reviewText}</div> 
            </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export default WalkerProfile;


