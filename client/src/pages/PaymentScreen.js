import React, { useEffect, useState } from "react";
// import ReactDOM from 'react-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_CUSTOMER_SESSION_ID, CHARGE_OWNER } from '../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import '../css/PaymentScreen.css';
// import {CloudinaryContext} from "cloudinary-react";
// import { openUploadWidget } from '../utils/CloudinaryService';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51Ir7BPLlbUYQkEo2A2L6kb3YbdMv9jh8IJjshFAJOn3UXJEox2CDMpQoI8AS5HiTiccN6CzYnNbbCnaBJVgb8t08002TgJCE4p');


function PaymentScreen() {
  const [handleGetSessionId, {data:customer_data}] = useLazyQuery(GET_CUSTOMER_SESSION_ID,{
    onCompleted: (data) => {
      // some actions
      handleGettingInformation(data);
    }
  });

const [photo, setPhoto] = useState('');

useEffect(() => {

}, [photo])

  const amount = 3200; // in cents
  const [handleCharge] = useLazyQuery(CHARGE_OWNER, {
    variables: { 
      amount: amount,
      description: 'testing'
     }
  });

  useEffect(() => {
    if (customer_data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: customer_data.getCustomerSessionId.session });
      });
    }
  }, [customer_data]);

  const handleGettingInformation = async (data) => {
    // Call your backend to create the Checkout session.
    const sessionId = data.getCustomerSessionId.session_id;
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({sessionId});
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if(error){
      console.log(error);
    }
  };

  // const uploadImageWithCloudinary = async () => {
  //   const uploadOptions = {
  //     cloud_name: 'w-oo-f',
  //     upload_preset: 'iqgryfiq' //Create an unsigned upload preset and update this
  //   };
  //   // console.log(uploadOptions);

  //   openUploadWidget(uploadOptions, (error, result) => {
  //     if (!error) {
  //       const {event, info} = result;
  //       if (event === "success") {
  //         // this.props.onPhotosUploaded([info]);
  //         // console.log(info.public_id)
  //         const srcLink = 'https://res.cloudinary.com/w-oo-f/image/upload/v1/' + info?.public_id;
  //         setPhoto(srcLink);
  //         // console.log('srcLink')
  //         // console.log(srcLink)
  //       }
  //     } else {
  //       console.log(error);
  //     }
  //   });
  // }
  
  return (
    <>
    <div className="page-body">
      <button className="payment-button" role="link" onClick={handleGetSessionId}>
        Enter Charging Information
      </button>
      <button className="payment-button" role="link" onClick={handleCharge}>
        Charge User
      </button>
      <img src={photo}></img>
    </div>
    </>
  );
}



export default PaymentScreen;