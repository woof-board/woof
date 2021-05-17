import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import '../css/WalkerProfile.css';
import { QUERY_OWNER_ME } from '../utils/queries';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../utils/actions";



function OwnerTrackOrder() {
    const [state, dispatch] = useStoreContext();
    const [getOwnerProfile, { called, loading, data }] = useLazyQuery(QUERY_OWNER_ME);
    const { currentUser } = state;
    const orders = currentUser.orders;
    const totalOrders = currentUser.orders.length;

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

  return (
    <>
      <h1>My Walk In Progress</h1>
      <div className='page-wrap'>
        <div className="walker-details-container">
          {currentUser && currentUser.status === "ACTIVE" &&   
            <div className="walker-profile-container">
              <div>
                {totalOrders ? `You have ${totalOrders} upcoming ${totalOrders === 1 ? 'walk' : 'walks'}:`
                : 'You have no upcoming Walks'}
              </div>
              {orders.map((order) => (
                // render walk orders
                <div className="walks">
                    {order.status=== "IN_PROGRESS" &&
                    <div>
                        <div>Walk Date: {order.service_date}</div>
                        <div>Start time: {order.service_time}</div>
                        {/* Add map component */}
                        {/* <Map
                            order_id = {order.order_id}
                            service_date = {order.service_date}
                            service_time = {order.service_time}
                        /> */}
                    </div>
                    } 
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default OwnerTrackOrder;


