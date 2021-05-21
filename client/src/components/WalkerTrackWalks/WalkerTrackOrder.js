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
      }, 60000);
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

  function changeStatusToProgress() {
    try {
      updateOrderStatus({
      variables: {
        order_id: order_id,
        status: "IN_PROGRESS",


      }
    });

      // alert('status Updated !!!!');
    } catch (e) {
      console.log(e);
    }
  }


  function changeStatusToFulfilled() {
    try {
      updateOrderStatus({
      variables: {
        order_id: order_id,
        status: "FULLFILLED",


      }
    });

      // alert('status Updated !!!!');
    } catch (e) {
      console.log(e);
    }
  }

  function success(position) {
    // push the coords to database
    console.log(order_id);
    trackCoordinates.push([[position.coords.longitude, position.coords.latitude]]);
    // const lastcoords = trackCoordinates.lastItem;
    console.log(position.coords);


    try {
      updateOrderCoords({
      variables: {
        input: {
          order_id: order_id,
          cords: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }
        }
      }
    });
      // alert('Cords Updated !!!');
    } catch (e) {
      console.log(e);
    }

  }
 

  return (

    <div className="walks">
      <button type="button" className="button" onClick={manageRealTime}>{realTime ? '...Walk Finished!' : 'Start Walk'}</button>
      {/* <button type="button" className="button" onClick={stopTrack}>Stop Walk</button>*/}
    </div>

  )
}

export default WalkerTrackOrder;