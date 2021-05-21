import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import '../css/WalkerProfile.css';
import { QUERY_OWNER_ME, QUERY_OWNER_ORDERS } from '../utils/queries';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_USER, UPDATE_CURRENT_USER_ARR_FIELD } from "../utils/actions";

import Map from "../components/OwnerTrackOrder/Map";
import TestMap from "../components/OwnerTrackOrder/TestMap";
import { Link } from 'react-router-dom';


function OwnerTrackOrder() {
  const [state, dispatch] = useStoreContext();
  const [orders, setOrders] = useState([]);
  const [getOwnerProfile, { called, loading, data }] = useLazyQuery(QUERY_OWNER_ME);

  const { currentUser } = state;
  const { data: ownerOrderData } = useQuery(QUERY_OWNER_ORDERS, {
    variables: {
        owner_id: currentUser._id
    }
    // const { data: ownerOrderData, loading: orderLoading } = useQuery(QUERY_OWNER_ORDERS, {
    //     variables: {
    //         owner_id: currentUser._id
    //     }
        
    });

    // const [orders, setOrders] = useState([]);
    // const [getOwnerProfile, { called, loading, data }] = useLazyQuery(QUERY_OWNER_ME);

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
        // console.log(ownerOrderData.ownerOrders);
        setOrders(ownerOrderData.ownerOrders);
        // dispatch({
        //     type: UPDATE_CURRENT_USER_ARR_FIELD,
        //     fieldName: "orders",
        //     fieldValue: ownerOrderData.ownerOrders
        // });
        console.log(ownerOrderData);
      }
    // }, [ownerOrderData]);
    });

    // if (orderLoading) {
    //     return (<div>Loading data...</div>);
    // }

  return (
    <>
      <h1>My Walk In Progress</h1>
      <div className='page-wrap'>
        <div className="walker-details-container">
          {currentUser && currentUser.status === "ACTIVE" &&   
            <div className="walker-profile-container">
              
              {orders.map((order) => (
                  order.status !== "PENDING_PROGRESS" 
                  ? null 
                  : (
                    <div className="walks">
                        <div>
                            <div><span className="medium-text">Walk Date:</span> {order.service_date}</div>
                            <div><span className="medium-text">Start time:</span> {order.service_time}</div>
                            {/* <div> Walker: {`${order.walker.first_name} ${order.walker.last_name}`} </div> */}
                            {/* Add map component */}
                            <Link to={"/testmap"}><button>See on Map</button></Link>
                            </div>
                        </div>
                    )
                ))}
            </div>
          }
           {currentUser && currentUser.status === "ACTIVE" &&   
            <div className="walker-profile-container">
              
              {orders.map((order) => (
                  order.status !== "FINALIZED" 
                  ? null 
                  : (
                    <div className="walks">
                        <div>
                            <div><span className="medium-text">Walk Date:</span> {order.service_date}</div>
                            <div><span className="medium-text">Start time:</span> {order.service_time}</div>
                            {/* <div> Walker: {`${order.walker.first_name} ${order.walker.last_name}`} </div> */}
                            {/* Add map component */}
                            <Link to={"/testmap"}><button>See on Map</button></Link>
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


