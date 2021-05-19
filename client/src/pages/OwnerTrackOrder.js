import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import '../css/WalkerProfile.css';
import { QUERY_OWNER_ME, QUERY_OWNER_ORDERS } from '../utils/queries';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_USER, UPDATE_CURRENT_USER_ARR_FIELD } from "../utils/actions";

import Map from "../components/OwnerTrackOrder/Map";


function OwnerTrackOrder() {
    const [state, dispatch] = useStoreContext();
    const { currentUser } = state;
    const { data: ownerOrderData, loading: orderLoading } = useQuery(QUERY_OWNER_ORDERS, {
        variables: {
            owner_id: currentUser._id
        }
        
    });

    // const [orders, setOrders] = useState([]);
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

    useEffect(() => {
      if(ownerOrderData) {
        console.log(ownerOrderData.ownerOrders);
        // setOrders(ownerOrderData.ownerOrders);
        // dispatch({
        //     type: UPDATE_CURRENT_USER_ARR_FIELD,
        //     fieldName: "orders",
        //     fieldValue: ownerOrderData.ownerOrders
        // });
        // console.log(ownerOrderData);
      }
    }, [ownerOrderData]);

    if (orderLoading) {
        return (<div>Loading data...</div>);
    }

  return (
    <>
      <h1>My Walk In Progress</h1>
      <div className='page-wrap'>
        <div className="walker-details-container">
          {currentUser && currentUser.status === "ACTIVE" &&   
            <div className="walker-profile-container">
              <div>
                {/* {totalOrders ? `You have ${totalOrders} upcoming ${totalOrders === 1 ? 'walk' : 'walks'}:`
                  : 'You have no upcoming Walks'} */}
              </div>
              {ownerOrderData?.ownerOrders.map((order) => (
                  order.status !== "PENDING_PROGRESS" 
                  ? null 
                  : (
                    <div className="walks">
                        <div>
                            <div><span className="medium-text">Walk Date:</span> {order.service_date}</div>
                            <div><span className="medium-text">Start time:</span> {order.service_time}</div>
                            <div><span className="medium-text">Walker:</span> {`${order.walker.first_name} ${order.walker.last_name}`} </div>
                            {/* Add map component */}
                            {/* <Map
                                order_id = {order.order_id}
                                service_date = {order.service_date}
                                service_time = {order.service_time}
                            /> */}
                            </div>
                        </div>
                    )
                ))}
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default OwnerTrackOrder;


