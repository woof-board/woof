import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import '../css/Profile.css';
import OwnerAddDog from '../components/OwnerProfileComponents/OwnerAddDog';
import OwnerDetails from '../components/OwnerProfileComponents/OwnerDetails';
import OwnerPetDetails from '../components/OwnerProfileComponents/OwnerPetDetails';
import OwnerPasswordForm from '../components/OwnerProfileComponents/OwnerPasswordForm'; 
import { useStoreContext } from "../utils/GlobalState";
import { QUERY_OWNER_ME, QUERY_OWNER_ORDERS } from '../utils/queries';
import { UPDATE_CURRENT_USER } from "../utils/actions";
import OwnerBookWalk from './OwnerBookWalk';
import { Link } from 'react-router-dom';

function OwnerProfile() {
    const [state, dispatch] = useStoreContext(); 
    const { currentUser } = state;
    
    /// pull upcoming walks ///
    
    // const { data: ownerOrderData, loading: orderLoading } = useQuery(QUERY_OWNER_ORDERS, {
    //   variables: {
    //       owner_id: currentUser._id
    //   }
      
    // });

    const [getOwnerProfile, { called, loading, data }] = useLazyQuery(QUERY_OWNER_ME);

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
    }, [currentUser, data, loading, dispatch]);

    console.log(currentUser);

    /// SHOW UPCOMING WALKS ///

    // useEffect(() => {
    //   if(ownerOrderData) {
    //     console.log(ownerOrderData.ownerOrders);
    //   }
    // }, [ownerOrderData]);

    // if (orderLoading) {
    //     return (<div>Loading data...</div>);
    // }


  
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
                {/* <h2>Welcome {currentUser.first_name}!</h2> */}
                <h2>Walks</h2>
              </div>

              {/* SHOW UPCOMING WALKS */}

              {/* <h4 className="indent-text">Upcoming Walks</h4>
              {currentUser && currentUser.status === "ACTIVE" }
              {
                ownerOrderData?.ownerOrders.map((order) => (
                  order.status !== "PENDING_PROGRESS" 
                  ? null 
                  : (
                    <div className="walks">
                        <div>
                            <div><span className="medium-text">Walk Date:</span> {order.service_date}</div>
                            <div><span className="medium-text">Start time:</span> {order.service_time}</div>
                            <div><span className="medium-text">Walker:</span> {`${order.walker.first_name} ${order.walker.last_name}`} </div>
                            
                            </div>
                        </div>
                    )
                ))} */}


              <div className="button-container">
                <Link to="bookwalk"><button>Book a walk</button></Link>
                <Link to="/ownertrackorder"><button>Upcoming Walks</button></Link>
                {/* Need to make a new page for past walk */}
                <Link to={"/ownerpastorder"}><button>Past Walks</button></Link>
              </div>
            </div>
            }
            <OwnerDetails user={currentUser}/>
            <OwnerPasswordForm />
            <OwnerPetDetails user={currentUser} />
            <OwnerAddDog />

          </div>
        </>
      </div>
    </div>
  );
}

export default OwnerProfile;


