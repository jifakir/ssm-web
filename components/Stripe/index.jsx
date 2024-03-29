import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CardForm from "./CardElement";

import CheckoutForm from "./PaymentElement";
import Loader from "../UI/Loader";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.


export default function Stripe({loading, data}) {

    if(!data) return;
    const { stripePublicKey, metadata } = data;
    const stripePromise = loadStripe(`${stripePublicKey}`);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret: metadata?.stripe_client_secret,
        appearance,
    };

    if(loading){
        return (
            <Loader />
        )
    }

  return (
    <div className="w-[80%] py-10 mx-auto">
      {metadata?.stripe_client_secret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ):
      (
        <Elements stripe={stripePromise}>
          <CardForm />
        </Elements>
      )}
    </div>
  );
}