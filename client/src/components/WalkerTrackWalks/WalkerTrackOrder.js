import React, { useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { CHARGE_OWNER } from '../../utils/queries';
import { UPDATE_ORDER_COORDS, UPDATE_ORDER_STATUS, ADD_WALKER_EARNINGS } from "../../utils/mutations";
import Auth from '../../utils/auth';
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../../utils/actions";


function WalkerTrackOrder(order) {
  const [state, dispatch] = useStoreContext();
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
  const [addWalkerEarnings] = useMutation(ADD_WALKER_EARNINGS);
  const trackCoordinates = [];

  const amount = 2500; // in cents
  const [orderChargeStatus, setOrderChargeStatus] = useState('uncharged');
  const [handleCharge, {loading: chargingLoading}] = useLazyQuery(CHARGE_OWNER, {
    variables: { 
      order_id: order_id,
      amount: amount,
      description: 'Walk fee'
     },
     onCompleted: charge => {
        if(charge.chargeOwner.status === 'succeeded'){
          changeStatusToFulfilled();
          setOrderChargeStatus('fulfilled');

          try {
            // add amount to walker in database
            addWalkerEarnings({
              variables: {
                earnings: (amount/100)
              }
            })
            .then(newWalker => {
              // update global state
              dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: newWalker.data.addWalkerEarnings
              });
            })
            .catch();
          } catch (e) {
            console.log(e);
          }
        }
        else{
          changeStatusToDenied();
          setOrderChargeStatus('denied');
        }
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
        const options = {
          enableHighAccuracy: false,
          timeout: 240000,
          maximumAge: 0
        };

        getGeolocation(options);

        interval = setInterval(() => {
          getGeolocation(options);
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

  const getGeolocation = (options) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        // push the coords to database
        trackCoordinates.push([[position.coords.longitude, position.coords.latitude]]);

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
    }, 
    error, 
    options
    );
  }

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