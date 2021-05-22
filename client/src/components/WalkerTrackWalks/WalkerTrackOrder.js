import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_ORDER_COORDS, UPDATE_ORDER_STATUS } from "../../utils/mutations";
import Auth from '../../utils/auth';


function WalkerTrackOrder(order) {

  const [updateOrderCoords, { error }] = useMutation(UPDATE_ORDER_COORDS);
  const [realTime, setRealTime] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const {
    order_id,
    service_date,
    service_time,
    status
  } = order;
  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS);
  const trackCoordinates = [];

  useEffect(() => {
    let interval;
    if (realTime) {
      changeStatusToProgress();
      interval = setInterval(() => {
        // console.log('In setInterval');
        var options = {
          enableHighAccuracy: false,
          timeout: 240000,
          maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(success, error, options);
      }, 10000);
    } else {
      if (buttonClicked) {
        changeStatusToFulfilled();
        setButtonClicked(false);
      }
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [realTime]);

  const manageRealTime = () => {
    setRealTime(!realTime);
    setButtonClicked(true);
  }

  // function for changing order status to IN_PROGRESS
  function changeStatusToProgress() {
    try {
      updateOrderStatus({
      variables: {
        order_id: order_id,
        status: "IN_PROGRESS",
        // order_id: "60a489466740bf2a040f98d1",
        // status: "PENDING_PROGRESS",
      }
    });

      // alert('status Updated !!!!');
    } catch (e) {
      console.log(e);
    }
  }

   // function for changing order status to FULFILLED
  function changeStatusToFulfilled() {
    try {
      updateOrderStatus({
      variables: {
        order_id: order_id,
        status: "FULLFILLED",
        // order_id: "60a489466740bf2a040f98d1",
        // status: "PENDING_PROGRESS",
      }
    });
      // alert('status Updated !!!!');
    } catch (e) {
      console.log(e);
    }
  }

  // function for pushing the current position coordinates to Order
  function success(position) {
    // push the coords to database
    console.log(order_id);
    trackCoordinates.push([[position.coords.longitude, position.coords.latitude]]);
    // const lastcoords = trackCoordinates.lastItem;
    console.log(position.coords);


    try {
      updateOrderCoords({
        variables: {
          // order_id: order_id,
          order_id: order_id,
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        }
    });
      // alert('Cords Updated !!!');
    } catch (e) {
      console.log(e);
    }

  }
 
  // render button for starting and stopping walk
  return (

    <div className="walks">
      <button type="button" className="button" onClick={manageRealTime}>{realTime ? '...Walk Finished!' : 'Start Walk'}</button>
      {/* <button type="button" className="button" onClick={stopTrack}>Stop Walk</button>*/}
    </div>

  )
}

export default WalkerTrackOrder;