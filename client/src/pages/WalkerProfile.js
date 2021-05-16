import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import '../css/WalkerProfile.css';
import Auth from '../utils/auth';
import WalkerDetails from '../components/WalkerProfile/WalkerDetails';
import WalkerReviews from '../components/WalkerProfile/WalkerReviews';
import WalkerOrders from '../components/WalkerProfile/WalkerOrders';
import WalkerEarnings from '../components/WalkerProfile/WalkerEarnings';
import WalkerNeighbourhoods from '../components/WalkerProfile/WalkerNeighbourhoods';
import WalkerAvgRating from '../components/WalkerProfile/WalkerAvgRating';
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
                currentUser: data.walker_me
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

  
    // const currentUser = 'ACTIVE';


  return (
    <div className="page-body">
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
            IMG HERE
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
            {currentUser && currentUser.status === "ACTIVE" && 
              <>
                <WalkerAvgRating averageRating={currentUser.averageRating}/>
                <WalkerReviews reviews={currentUser.reviews}/>
                <WalkerOrders orders={currentUser.orders}/>
                <WalkerEarnings earnings={currentUser.earnings}/>
                <WalkerNeighbourhoods neighbourhoods={currentUser.neighbourhoods}/>
              </>
            }
          </div>
        </>
    </div>
  );
}

export default WalkerProfile;


