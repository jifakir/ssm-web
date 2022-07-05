import React from 'react';
import { useForm } from 'react-hook-form';
import Script from 'next/script'
import InstagramEmbed from 'react-instagram-embed';
import Stripe from '../components/Stripe/CheckoutForm';
import InputText from '../components/UI/InputText';
import RadioInput from '../components/UI/TestRadio';
import TestRadio from '../components/UI/TestRadio';



const Test = () => {

    const { control, watch, handleSubmit } = useForm({defaultValues: {testradio: false}});
    const onSubmitHandler = (data) => {
        console.log(data);
    };

    console.log(watch());
    
    return (
      <>
      <Script  src="https://cdn2.woxo.tech/a.js#62c40614ec33d95e7c27e46a" async data-usrc/>
      <div
  loading="lazy"
  data-mc-src="88d1d45b-7899-43f1-a878-fd3c98111fc8#null"></div>

        <div className="min-h-screen w-[50%] mx-auto my-10">

                <InstagramEmbed
                    url='http://instagram.com/gkjahid02'
                    clientAccessToken='594382165399714|42b7c9778ebe5e3e0183b97f2249ec0d'
                    maxWidth={700}
                    hideCaption={false}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}
                    />
{/* 
          <InputText
            control={control}
            name="name"
            pHolder={'Placeholder'}
             />
             <div className="my-5">
              <RadioInput 
                control={control}
                data={{
                  name: 'titles',
                  options: [
                  {
                      label: 'Ph.D.',
                      value: 'phd'
                  },
                  {
                      label: 'Psy.D.',
                      value: 'psyd'
                  },
                  {
                      label: 'M.A.',
                      value: 'ma'
                  },
                  {
                      label: 'M.S.',
                      value: 'ms'
                  },
                    {
                      label: 'Other',
                      value: 'other'
                    }
                  ]
                }} />
             </div> */}
        </div>
        </>
    )
}

export default Test;




// import React from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

// import CheckoutForm from "../components/Stripe/PaymentElement";

// // Make sure to call loadStripe outside of a component’s render to avoid
// // recreating the Stripe object on every render.
// // This is your test publishable API key.
// const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBKEY}`);

// export default function Test() {
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

//   const appearance = {
//     theme: 'stripe',
//   };
//   const options = {
//     clientSecret,
//     appearance,
//   };

//   console.log("Secret",clientSecret);
//   return (
//     <div className="w-[50%] py-10 mx-auto">
//       {clientSecret && (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckoutForm />
//         </Elements>
//       )}
//     </div>
//   );
// }
