import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_ORDER_COORDS, UPDATE_ORDER_STATUS } from "../../utils/mutations";
import Auth from '../../utils/auth';


function WalkerTrackOrder(order) {

    const [updateOrderCoords, { error }] = useMutation(UPDATE_ORDER_COORDS);
    const {
        order_id,
        service_date,
        service_time,
        status
    } = order;

    const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS);
    // const [updateOrderStatusToFulfilled] = useMutation(UPDATE_ORDER_STATUS, {order_id: order_id , status: "FULFILLED"});

   // Tracker Start and Stop Functions
   const trackCoordinates = [];
   
   var myVar;
   function startTrack(event) {
       event.preventDefault();
       console.log("walk started");
       // change order status to In Progress
      //  updateOrderStatus(
      //   {
      //     "order_id": order_id,
      //     "status": "IN_PROGRESS"
      //   });
       // set timer for one minute
       myVar = setInterval(myTimer, 60000);
       function myTimer() {
           var options = {
               enableHighAccuracy: false,
               timeout: 240000,
               maximumAge: 0
           };
           // get current coordinates
           navigator.geolocation.getCurrentPosition(success, error, options);
           console.log("walk started"); 

           function success(position) {
               // push the coords to database
               trackCoordinates.push([[position.coords.longitude, position.coords.latitude]]);
               const lastcoords = trackCoordinates.lastItem;
               try {
                const { data: { updateOrderCoords: newProfile } } = updateOrderCoords({
                    variables: {
                        input: {
                          order_id: order_id,
                          lon: position.coords.longitude,
                          lat:position.coords.latitude
                        }
                      }
                    });
                    alert('Account Updated');
                  } catch (e) {
                    alert(e)
                    console.log(e);
                  }
              //  try {
              //      const { data } = updateOrderCoords({ 
              //          variables: { order_id, 
              //           lon: position.coords.longitude, 
              //           lat:position.coords.latitude
              //         } 
              //      });
               
              //      Auth.login(data.loginOwner.token);
              //    } catch (e) {
              //      console.error(e);
              //    } 
           } 
           function error(err) {
               console.warn(`ERROR(${err.code}): ${err.message}`);
           }  
       }
   }

   function stopTrack(event) {
       clearInterval(myVar);
       console.log("walk stopped");
       // change order status to fulfilled
      //  updateOrderStatus(
      //   {
      //     "order_id": order_id,
      //     "status": "FULFILLED"
      //   });
   } 

    return (
        
            <div className="walks">
              <button type="button" className="button" onClick={startTrack}>Start Walk</button>
              <button type="button" className="button" onClick={stopTrack}>Stop Walk</button>
            </div>
        
    )
}

export default WalkerTrackOrder;