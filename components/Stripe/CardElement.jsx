import React, {useMemo, useState} from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import Loader from '../UI/Loader';
import Button from '../UI/Button';
import { BiLoaderAlt } from 'react-icons/bi';
import { useSaveCardMutation } from '../../store/api/ssmApi';
import { FaStripe } from 'react-icons/fa';
import { useEffect } from 'react';
import { useRouter } from 'next/router';



const CardForm = () => {

  const [expand, setExpand] = useState(false);
  const [message, setMessage] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const [saveCard, {data, isSuccess,isLoading}] = useSaveCardMutation();

    const options = useMemo(() => ({
      showIcon: true,
      style: {
        base: {
          display:"block",
          color: "#424770",
          fontSize: "18px",
          letterSpacing: "0.025em",
          fontFamily: "Poppins, monospace",
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

    const extraOptions = useMemo(() => ({
      style: {
        base: {
          display:"block",
          color: "#424770",
          fontSize: "16px",
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

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(expand ? CardNumberElement : CardElement)
    });

    if(error){
      setMessage(error.message);
      return;
    }
    console.log("payment method: ",paymentMethod);
    await saveCard({payment_method_id: paymentMethod.id});
  };

  const router = useRouter();
  useEffect(() => {
    if(isSuccess){
      router.push(process.env.NEXT_PUBLIC_STRIPE_RETURN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isSuccess]);

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="flex justify-center mb-3">
        <FaStripe className='text-7xl text-primary' />
      </div>
      {
        !expand ?
        <CardElement onFocus={() => setMessage('')} options={options} />:
        (
          <div className="space-y-2">
            <div className="flex">
              <CardNumberElement options={options} className="flex-1" />
            </div>
            <div className="grid grid-cols-2 py-2">
              <div className="">
                <CardExpiryElement options={extraOptions} className="" />
              </div>
              <div className="">
                <CardCvcElement options={extraOptions} />
              </div>
            </div>
          </div>
        )
      }
      {/* <PaymentElement /> */}
      <p className="text-[10px] text-primary/50 mt-5">
        By providing the card details you are allowing Start Saying More LLC, 
        to charge you after completing the free trial.
      </p>
      <Button className={'mt-2'} btnQnr disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <BiLoaderAlt className="animate-spin text-2xl mr-2" /> : "Pay now"}
        </span>
      </Button>
    </form>
  );
};

export default CardForm;