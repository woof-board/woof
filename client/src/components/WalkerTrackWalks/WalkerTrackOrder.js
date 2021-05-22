import React, { useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { CHARGE_OWNER } from '../../utils/queries';
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

  const amount = 3000; // in cents
  const [orderChargeStatus, setOrderChargeStatus] = useState('uncharged');
  const [handleCharge, {error: chargingError, data: chargingInfo, loading: chargingLoading}] = useLazyQuery(CHARGE_OWNER, {
    variables: { 
      order_id: order_id,
      amount: amount,
      description: 'Walk fee'
     },
     onCompleted: charge => {
      console.log('charge.chargeOwner.statue')
      console.log(charge.chargeOwner.status)
      if(charge.chargeOwner.status === 'succeeded'){
        changeStatusToFulfilled();
        setOrderChargeStatus('fulfilled');
      }
      else{
        changeStatusToDenied();
        setOrderChargeStatus('denied');
      }
      /* do your staff */
    }
  });

  useEffect(() => {
    // Please do not delete these codes
    // try {
    //   updateOrderStatus({
    //   variables: {
    //     // order_id: order_id,
    //     // status: "IN_PROGRESS",
    //     order_id: "60a48c986740bf2a040f98e3",
    //     status: "PENDING_PROGRESS",
    //   }
    // });

    //   // alert('status Updated !!!!');
    // } catch (e) {
    //   console.log(e);
    // }
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
      }, 60000);
    } else {
      if (buttonClicked) {
        handleCharge();
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
        // order_id: "60a48c986740bf2a040f98e3",
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
        // order_id: "60a48c986740bf2a040f98e3",
        // status: "PENDING_PROGRESS",
      }
    });
      // alert('status Updated !!!!');
    } catch (e) {
      console.log(e);
    }
  }

     // function for changing order status to FULFILLED
     function changeStatusToDenied() {
      try {
        updateOrderStatus({
        variables: {
          order_id: order_id,
          status: "DENIED",
          // order_id: "60a48c986740bf2a040f98e3",
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
      {orderChargeStatus === 'uncharged' ? 
        <button type="button" className="button" onClick={manageRealTime}>{chargingLoading?'Charging':(realTime ? ('Stop My Current Walk') : 'Start Walk')}</button>
        :
        (orderChargeStatus === 'fulfilled') ?
        <button type="button" className="button">{'FULLFILLED'}</button>
        :
        <button type="button" className="button">{'DENIED'}</button>
      }
      {/* <button type="button" className="button" onClick={stopTrack}>Stop Walk</button>*/}
    </div>

  )
}

export default WalkerTrackOrder;