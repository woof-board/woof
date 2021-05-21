import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import '../css/WalkerProfile.css';
import { QUERY_WALKER_ME, QUERY_WALKER_ORDERS } from '../utils/queries';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../utils/actions";
import WalkerTrackOrder from "../components/WalkerTrackWalks/WalkerTrackOrder"


function WalkerTrackWalks() {
    const [state, dispatch] = useStoreContext();
    const [orders, setOrders] = useState([]);
    const [getWalkerProfile, { called, loading, data }] = useLazyQuery(QUERY_WALKER_ME);
    const { currentUser } = state;
    const { data: walkerOrderData } = useQuery(QUERY_WALKER_ORDERS, {
      variables: {
          walker_id: currentUser._id
      }
    });
    
    // const totalOrders = orders?.length;
    
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
    }, [currentUser, data, loading, dispatch]);


    useEffect(() => {
      if(walkerOrderData) {
        setOrders(walkerOrderData.walkerOrders);
      }
      console.log(walkerOrderData);
    });

  return (
    <>
      <h1>My Walks</h1>
      <div className='page-wrap'>
        <div className="walker-details-container">
          {currentUser && currentUser.status === "ACTIVE" &&   
            <div className="walker-profile-container">
              <h2>Upcoming Walks</h2>
              {/* <div>
                {totalOrders ? `You have ${totalOrders} upcoming ${totalOrders === 1 ? 'walk' : 'walks'}:`
                : 'You have no upcoming Walks'}
              </div> */}
              {orders.filter(order => order.status === "PENDING_PROGRESS" || order.status === "IN_PROGRESS" ).map((order) => (
                <div className="walks">
                  <div>Walk Date: {order.service_date}</div>
                  <div>Start time: {order.service_time}</div>
                  <div>Status: {order.status}</div>
                  <WalkerTrackOrder 
                order_id = {order._id}
                service_date = {order.service_date}
                service_time = {order.service_time}
                status = {order.status}
                />
                </div>
                
                // )
              ))}

              
            </div>
          }
        </div>
        {/* fulfilled walks */}
        <div className="walker-details-container">
          {currentUser && currentUser.status === "ACTIVE" &&   
            <div className="walker-profile-container">
              <h2>Completed Walks</h2>
              {/* <div>
                {totalOrders ? `You have ${totalOrders} fulfilled ${totalOrders === 1 ? 'walk' : 'walks'}:`
                : 'You have no fulfilled Walks'}
              </div> */}
              {orders.filter(order => order.status === "FULLFILLED").map((order) => (
                <div className="walks">
                  <div>Walk Date: {order.service_date}</div>
                  <div>Start time: {order.service_time}</div>
                  <div>Status: {order.status}</div>
                </div>
                
                // )
              ))}

              
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default WalkerTrackWalks;


