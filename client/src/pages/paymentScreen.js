import React, { useEffect } from "react";
// import ReactDOM from 'react-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_CUSTOMER_SESSION_ID, CHARGE_OWNER } from '../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import '../css/PaymentScreen.css';
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
  const amount = 3000; // in cents
  const [handleCharge] = useLazyQuery(CHARGE_OWNER, {
    variables: { amount: amount }
  });

  useEffect(() => {
    if (customer_data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: customer_data.get_customer_session_id.session });
      });
    }
  }, [customer_data]);

  const handleGettingInformation = async (data) => {
    // Call your backend to create the Checkout session.
    const sessionId = data.get_customer_session_id.session_id;
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
  
  return (
    <>
    <div className="page-body">
      <button className="payment-button" role="link" onClick={handleGetSessionId}>
        Enter Charging Information
      </button>
      <button className="payment-button" role="link" onClick={handleCharge}>
        Charge User
      </button>
    </div>
    </>
  );
}

export default PaymentScreen;