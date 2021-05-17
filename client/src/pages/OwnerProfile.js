import React, { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import OwnerDetails from '../components/OwnerProfile/OwnerDetails';
import '../css/Profile.css';
import '../css/OwnerProfile.css'
import { useStoreContext } from "../utils/GlobalState";
import { QUERY_OWNER_ME } from '../utils/queries';
import { UPDATE_CURRENT_USER } from "../utils/actions";

function OwnerProfile() {
    const [state, dispatch] = useStoreContext();
    const [getOwnerProfile, { called, loading, data }] = useLazyQuery(QUERY_OWNER_ME);
    // const { loading, data } = useQuery(QUERY_WALKER_ME);
    const { currentUser } = state;

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

//     export const QUERY_OWNER_ME = gql`
//     query {
//         owner_me {
//             _id
//             firstName
//             lastName
//             email
//             admin
//             status
//             address {
//                 city
//             }
//             phone
//             dogs {
//                 name
//             }
//             dogCount
//         }
//     }
// `;
  
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
            <OwnerDetails user={currentUser}/>
            {currentUser && currentUser.status === "ACTIVE" && 
              <>
                COMPONENTS HERE
              </>
            }
          </div>
        </>
    </div>
  );
}

export default OwnerProfile;


