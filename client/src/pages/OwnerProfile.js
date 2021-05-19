import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import '../css/OwnerProfile.css';
import OwnerDetails from '../components/OwnerProfileComponents/OwnerDetails';
import OwnerPasswordForm from '../components/OwnerProfileComponents/OwnerPasswordForm'; 
import { useStoreContext } from "../utils/GlobalState";
import { QUERY_OWNER_ME } from '../utils/queries';
import { UPDATE_CURRENT_USER } from "../utils/actions";
import OwnerBookWalk from './OwnerBookWalk';

function OwnerProfile() {
    const [state, dispatch] = useStoreContext();
    const [getOwnerProfile, { called, loading, data }] = useLazyQuery(QUERY_OWNER_ME);
    // const { loading, data } = useQuery(QUERY_WALKER_ME);
    const { currentUser } = state;

    // const results = data;

    useEffect(() => {
        // if not already in global store
        if (!currentUser && !data) {
            getOwnerProfile(); // get profile from database
        } 
        // retrieved from server
        else if (!currentUser && data) {
            dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: data.ownerMe
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
            {currentUser && currentUser.status === "ACTIVE" && 
              <div className="walker-contact-container">
              <div className="walker-header">
                <h2>Welcome {currentUser.first_name}!</h2>
              </div>
              <div className="account-status">
                <OwnerBookWalk />
              </div>
            </div>
            }
            <OwnerDetails user={currentUser}/>
            <OwnerPasswordForm />
            
          </div>
        </>
      </div>
    </div>
  );
}

export default OwnerProfile;


