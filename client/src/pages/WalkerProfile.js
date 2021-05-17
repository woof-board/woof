import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import '../css/Profile.css'
import '../css/WalkerProfile.css';
import Auth from '../utils/auth';
import WalkerDetails from '../components/WalkerProfileComponents/WalkerDetails';
import WalkerReviews from '../components/WalkerProfileComponents/WalkerReviews';
import WalkerOrders from '../components/WalkerProfileComponents/WalkerOrders';
import WalkerEarnings from '../components/WalkerProfileComponents/WalkerEarnings';
import WalkerPasswordForm from '../components/WalkerProfileComponents/WalkerPasswordForm';
import WalkerAvgRating from '../components/WalkerProfileComponents/WalkerAvgRating';
import { QUERY_WALKER_ME } from '../utils/queries';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../utils/actions";

function WalkerProfile() {
    const [state, dispatch] = useStoreContext();
    const [getWalkerProfile, { called, loading, data }] = useLazyQuery(QUERY_WALKER_ME);
    // const { loading, data } = useQuery(QUERY_WALKER_ME);
    const { currentUser } = state;

    useEffect(() => {
        // if not already in global store
        if (!currentUser && !data) {
            getWalkerProfile(); // get profile from database
        } 
        // retrieved from server
        else if (!currentUser && data) {
            dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: data.walkerMe
            });
            
        }
        // get cache from idb
        // else if (!loading) {
        //     idbPromise('products', 'get').then((indexedProducts) => {
        //     dispatch({
        //         type: UPDATE_PRODUCTS,
        //         products: indexedProducts
        //     });
        //     });
        // }
    }, [currentUser, data, loading, dispatch]);

  return (
    <div id="walkers">
      <h1>My Profile</h1>
      <div className='page-wrap'>
      
      {currentUser && currentUser.status === "SUSPENDED" && 
        <>
          <div className="account-status">
            ACCOUNT SUSPENDED
          </div>
        </>    
      } 
        <>
        {currentUser && currentUser.status === "ACTIVE" && 
          <div className="walker-picture-container">
            <img src="https://via.placeholder.com/150" alt="profile-image"/>
          </div>        
        }
        <div className="walker-details-container">
            {currentUser && currentUser.status === "PENDING_INFORMATION" && 
              <div className="account-status">
                COMPLETE ALL FORMS FOR APPROVAL
              </div>
            }
            {currentUser && currentUser.status === "PENDING_APPROVAL" && 
              <div className="account-status">
                PENDING APPROVAL
              </div>
            }
            <WalkerDetails user={currentUser}/>
            <WalkerPasswordForm />
            {currentUser && currentUser.status === "ACTIVE" && 
              <>
                <WalkerAvgRating average_rating={currentUser.average_rating}/>
                <WalkerReviews reviews={currentUser.reviews} />
                <WalkerOrders orders={currentUser.orders}/>
                <WalkerEarnings earnings={currentUser.earnings}/>
              </>
            }
          </div>
        </>
    </div>
    </div>
  );
}

export default WalkerProfile;


