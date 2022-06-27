import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./PaymentElement";
import Loader from "../UI/Loader";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.


export default function Stripe({loading, data}) {
//   const [clientSecret, setClientSecret] = React.useState("");

//   React.useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     fetch("/api/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, []);


    console.log(data);
    if(!data) return;
    const { stripePublicKey, metadata: {stripe_client_secret}} = data;
    const stripePromise = loadStripe(`${stripePublicKey}`);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret: stripe_client_secret,
        appearance,
    };

    console.log("Secret",stripe_client_secret);

    if(loading){
        return (
            <Loader />
        )
    }

  return (
    <div className="w-[80%] py-10 mx-auto">
      {stripe_client_secret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}