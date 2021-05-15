import React from 'react';
import '../css/WalkerProfile.css';
import Auth from '../utils/auth';
import decode from 'jwt-decode';
import WalkerContact from '../components/WalkerProfile/WalkerDetails';
import WalkerReviews from '../components/WalkerProfile/WalkerReviews';
import WalkerOrders from '../components/WalkerProfile/WalkerOrders';
import WalkerEarnings from '../components/WalkerProfile/WalkerEarnings';
import WalkerNeighbourhoods from '../components/WalkerProfile/WalkerNeighbourhoods';
import WalkerAvgRating from '../components/WalkerProfile/WalkerAvgRating';

function WalkerProfile() {

  // decode token for walker data
  const token = decode(Auth.getToken());
  // get walker _id from array
  const walkerToken = token.data;

  console.log(walkerToken);

  // REVIEWS == walker for walker = _id, firstName, lastName, email, reviews(owner_id, rating, reviewText), averageRating
  // ORDERS == walker_orders for walker_orders = _id, serviceData, serviceTime, owner(_id, firstName, lastName), walker(_id, firstName, lastName)

  return (
    <div className="page-body">
      <div className="walker-picture-container">
        IMG HERE
      </div>
      <div className="walker-details-container">
          <WalkerContact />
          <WalkerAvgRating />
          <WalkerReviews />
          <WalkerOrders />
          <WalkerEarnings />
          <WalkerNeighbourhoods />
      </div>
    </div>
  );
}

export default WalkerProfile;


