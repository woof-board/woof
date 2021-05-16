import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_ORDER_COORDS } from "../../utils/mutations";
import Auth from '../../utils/auth';


function WalkerTrackOrder(order) {

    const [updateOrderCoords] = useMutation(UPDATE_ORDER_COORDS);
    const {
        order_id,
        service_date,
        service_time
    } = order;

   // Tracker Start and Stop Functions
   const trackCoordinates = [];
   var myVar;
   function startTrack(event) {
       event.preventDefault();
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
                   const { data } = updateOrderCoords({ 
                       variables: { order_id, lastcoords} 
                   });
               
                   Auth.login(data.loginOwner.token);
                 } catch (e) {
                   console.error(e);
                 } 
           } 
           function error(err) {
               console.warn(`ERROR(${err.code}): ${err.message}`);
           }  
       }
   }

   function stopTrack(event) {
       clearInterval(myVar);
       console.log("walk stopped");
   } 

    return (
        
            <div className="walks">
              <div>{service_date}</div>
              <div>{service_time}</div>
              <button type="button" className="button" onClick={startTrack}>Start Walk</button>
              <button type="button" className="button" onClick={stopTrack}>Stop Walk</button>
            </div>
        
    )
}

export default WalkerTrackOrder;