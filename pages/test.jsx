// import React from 'react';
// import { useForm } from 'react-hook-form';
// import InstagramEmbed from 'react-instagram-embed';
// import Stripe from '../components/Stripe/CheckoutForm';
// import InputText from '../components/UI/InputText';
// import TestRadio from '../components/UI/TestRadio';



// const Test = () => {

//     const { control, watch, handleSubmit } = useForm({defaultValues: {testradio: false}});
//     const onSubmitHandler = (data) => {
//         console.log(data);
//     };

//     console.log(watch());
    
//     return (
//         <div className="min-h-screen">

//                 {/* <InstagramEmbed
//                     url='http://instagram.com/gkjahid02'
//                     clientAccessToken='IGQVJYMkNRMUloSHRENHNDZAUxnbVphZAi1UV19qbTZAEeElwV0ZAIMmJMMmxYVEFxNjMwMjhkUDVURnFUcWFoSlBILV9GZAzNVQ1ctQ085WWw5SEtTOXBnYlNMcGlNdDc3LW9xR2hUZAFIyc0NHYVdfOGxDYwZDZD'
//                     maxWidth={700}
//                     hideCaption={false}
//                     containerTagName='div'
//                     protocol=''
//                     injectScript
//                     onLoading={() => {}}
//                     onSuccess={() => {}}
//                     onAfterRender={() => {}}
//                     onFailure={() => {}}
//                     /> */}

//             <Stripe />
//         </div>
//     )
// }

// export default Test;




import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/Stripe/PaymentElement";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBKEY}`);

export default function Test() {
  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  console.log("Secret",clientSecret);
  return (
    <div className="w-[50%] py-10 mx-auto">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}