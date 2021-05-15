import React, { useEffect } from "react";
// import ReactDOM from 'react-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_CUSTOMER_SESSION_ID } from '../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import '../css/PaymentScreen.css';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51Ir7BPLlbUYQkEo2A2L6kb3YbdMv9jh8IJjshFAJOn3UXJEox2CDMpQoI8AS5HiTiccN6CzYnNbbCnaBJVgb8t08002TgJCE4p');

function PaymentScreen() {
  const {data} = useQuery(GET_CUSTOMER_SESSION_ID)

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.get_customer_session_id.session });
      });
    }
  }, [data]);

  const handleClick = async (event) => {
    // Call your backend to create the Checkout session.
    const sessionId = data.get_customer_session_id.session_id;
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.log(error);
  };
  
  // return (
  //   <View>
  //     <CardField
  //       postalCodeEnabled={true}
  //       placeholder={{
  //         number: '4242 4242 4242 4242',
  //       }}
  //       cardStyle={{
  //         backgroundColor: '#FFFFFF',
  //         textColor: '#000000',
  //       }}
  //       style={{
  //         width: '100%',
  //         height: 50,
  //         marginVertical: 30,
  //       }}
  //       onCardChange={(cardDetails) => {
  //         setCard(cardDetails);
  //       }}
  //       onFocus={(focusedField) => {
  //         console.log('focusField', focusedField);
  //       }}
  //     />
  //     <button role="link" onClick={handleClick}>
  //       Checkout
  //     </button>
  //   </View>
  // );
  return (
    <>
    <div>
      <button className="payment-button page-body" role="link" onClick={handleClick}>
        Checkout
      </button>
    </div>
    </>
  );
}

export default PaymentScreen;