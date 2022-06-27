import React, {useMemo} from 'react';
import ReactDOM from 'react-dom';
// import {PaymentElement} from '@stripe/react-stripe-js';
import PaymentElement from './PaymentElement';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Loader from '../UI/Loader';





const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  

    const options = useMemo(() => ({
      style: {
        base: {
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    []
  );


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    console.log("[PaymentMethod]", payload);

  };


  
  return (
    <form onSubmit={handleSubmit}>
      <CardElement  />
      {/* <PaymentElement /> */}
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
    </form>
  );
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBKEY);

const Stripe = ({ loading, clientSecret }) => {

    const options = {
        // passing the client secret obtained from the server
        clientSecret
      };

    if(loading && !clientSecret){
        return <Loader />
    }

    return (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
    )
};

export default Stripe;
