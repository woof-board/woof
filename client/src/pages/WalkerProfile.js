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
import { useQuery } from '@apollo/react-hooks';
import { QUERY_WALKER_ME } from '../utils/queries';

function WalkerProfile() {

  // decode token for walker data
  const token = decode(Auth.getToken());
  // get walker _id from array
  const walkerToken = token.data;

  const walkerData = useQuery(QUERY_WALKER_ME, {
    variables: { walker_id: walkerToken._id }
  })

  const walkerArr = walkerData?.walker || { _id: "", firstName: "", email: "", reviews: [{ owner_id: '', rating: '5', reviewText: 'You are Great'}], averageRating: '', earnings: '500', status: 'active' };

  // status: ["pending_approval", "pending_information", "active", "suspended"]

  const accountStatus = walkerArr.status;

  function accountSuspended() {
    if (accountStatus === 'suspended') {
      return true
    } else {
      return false
    }
  }

  console.log(accountStatus)

  // REVIEWS == walker for walker = _id, firstName, lastName, email, reviews(owner_id, rating, reviewText), averageRating
  // ORDERS == walker_orders for walker_orders = _id, serviceData, serviceTime, owner(_id, firstName, lastName), walker(_id, firstName, lastName)

  return (
    <div className="page-body">
      {accountSuspended() ? (
        <>
          <div className="account-status">
            ACCOUNT SUSPENDED
          </div>
        </>    
      ) : (
        <>
        {accountStatus === 'active' && (
          <div className="walker-picture-container">
            IMG HERE
          </div>        
        )}
        <div className="walker-details-container">
            {accountStatus === 'pending_information' && (
              <div className="account-status">
                COMPLETE ALL FORMS FOR APPROVAL
              </div>
            )}
            {accountStatus === 'pending_approval' && (
              <div className="account-status">
                PENDING APPROVAL
              </div>
            )}
            <WalkerContact />
            {accountStatus === 'active' && (
              <>
                <WalkerAvgRating />
                <WalkerReviews />
                <WalkerOrders />
                <WalkerEarnings />
                <WalkerNeighbourhoods />
              </>
            )}
          </div>
        </>
      )}


    </div>
  );
}

export default WalkerProfile;


