import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

//import '../css/WalkerProfile.css';
import { QUERY_WALKER_ME, QUERY_WALKER_ORDERS } from '../utils/queries';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../utils/actions";
import WalkerTrackOrder from "../components/WalkerTrackWalks/WalkerTrackOrder"


function WalkerTrackWalks() {
    const [state, dispatch] = useStoreContext();
    const [getWalkerProfile, { loading, data }] = useLazyQuery(QUERY_WALKER_ME);
    // const [getWalkerOrder, { called,loading, data }] = useLazyQuery(QUERY_WALKER_ORDERS);
    const { currentUser } = state;
    const orders = currentUser.orders;
    const totalOrders = currentUser.orders.length;
    // const totalOrders = 1;

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


    // useEffect(() => {
    //   // if not already in global store
    //   getWalkerOrder({ variables: { walker_id: currentUser._id}});
      
    // }, [orders]);

  return (
    <>
      <h1>My UpComing Walks</h1>
      <div className='page-wrap'>
        <div className="walker-details-container">
          {currentUser && currentUser.status === "ACTIVE" &&   
            <div className="walker-profile-container">
              <div>
                {totalOrders ? `You have ${totalOrders} upcoming ${totalOrders === 1 ? 'walk' : 'walks'}:`
                : 'You have no upcoming Walks'}
              </div>
              {orders.filter(order => order.status === "PENDING_PROGRESS").map((order) => (
                // render component
                <WalkerTrackOrder
                order_id = {order.order_id}
                service_date = {order.service_date}
                service_time = {order.service_time}
                status = {order.status}
                />
              ))}
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default WalkerTrackWalks;


