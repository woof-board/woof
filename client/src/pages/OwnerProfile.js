import React, { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import '../css/OwnerProfile.css';
import OwnerDetails from '../components/OwnerProfile/OwnerDetails';
 
import { useStoreContext } from "../utils/GlobalState";
import { QUERY_OWNER_ME } from '../utils/queries';
import { UPDATE_CURRENT_USER } from "../utils/actions";

function OwnerProfile() {
    const [state, dispatch] = useStoreContext();
    const [getOwnerProfile, { called, loading, data }] = useLazyQuery(QUERY_OWNER_ME);
    // const { loading, data } = useQuery(QUERY_WALKER_ME);
    const { currentUser } = state;

    const results = data;

    useEffect(() => {
        // if not already in global store
        if (!currentUser && !data) {
            getOwnerProfile(); // get profile from database
        } 
        // retrieved from server
        else if (!currentUser && data) {
            dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: data.owner_me
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
  <div id="owners">
    <h1>My Profile</h1>
    <div className="page-wrap">
      {currentUser && currentUser.status === "SUSPENDED" && 
        <>
          <div className="walker-contact-container">
            <div className="walker-header">
              <h2>Current account status</h2>
            </div>
            <div className="account-status">
                ACCOUNT SUSPENDED
            </div>
          </div>
        </>    
      } 
        <>
        {currentUser && currentUser.status === "ACTIVE" && 
          <div className="walker-picture-container">
            <img src="https://via.placeholder.com/150" alt="profile-img"/>
          </div>          
        }
        <div className="walker-details-container">
            {currentUser && currentUser.status === "PENDING_INFORMATION" && 
               <div className="walker-contact-container">
                <div className="walker-header">
                  <h2>Current account status</h2>
                </div>
                <div className="account-status">
                  COMPLETE ALL FORMS FOR APPROVAL
                </div>
              </div>
            }
            {currentUser && currentUser.status === "PENDING_APPROVAL" && 
              <div className="walker-contact-container">
                <div className="walker-header">
                  <h2>Current account status</h2>
                </div>
                <div className="account-status">
                  PENDING APPROVAL
                </div>
              </div>
            }
            <OwnerDetails 
              user={currentUser}
              results={results}
            />
            {currentUser && currentUser.status === "ACTIVE" && 
              <>
                COMPONENTS HERE
              </>
            }
          </div>
        </>
      </div>
    </div>
  );
}

export default OwnerProfile;


