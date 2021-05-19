import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import '../css/OwnerProfile.css';
import OwnerDetails from '../components/OwnerProfileComponents/OwnerDetails';
import OwnerPetDetails from '../components/OwnerProfileComponents/OwnerPetDetails';
import OwnerPasswordForm from '../components/OwnerProfileComponents/OwnerPasswordForm'; 
import { useStoreContext } from "../utils/GlobalState";
import { QUERY_OWNER_ME } from '../utils/queries';
import { UPDATE_CURRENT_USER } from "../utils/actions";
import OwnerBookWalk from './OwnerBookWalk';
import { Link } from 'react-router-dom';

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

    console.log(currentUser);

  
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
            <img src={currentUser.avatar} width="160" alt={`${currentUser.first_name} ${currentUser.last_name}`}/>
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
                <Link to={"/ownertrackorder"}><button>Upcoming Walks</button></Link>
                {/* Need to make a new page for past walk */}
                <Link to={"/ownertrackorder"}><button>Past Walks</button></Link>
              </div>
            </div>
            }
            <OwnerDetails user={currentUser}/>
            <OwnerPasswordForm />
            <OwnerPetDetails user={currentUser} />
            
          </div>
        </>
      </div>
    </div>
  );
}

export default OwnerProfile;


