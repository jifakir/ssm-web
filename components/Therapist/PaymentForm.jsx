import React, { useMemo } from 'react';
import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Input from '../UI/TextInput';
import { useForm } from 'react-hook-form';
import Button from '../UI/Button';
import Image from 'next/image';


const PaymentForm = ({ onCancel }) => {

    const { control } = useForm();
    const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBKEY}`);

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
            border: "2px solid #000",
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

    return (
        <div className="my-5 border-[1.5px] px-2 py-2 md:border-0 rounded-md md:rounded-none border-primary">
            <h1 className="text-sm lg:text-xl font-medium text-primary">Add New Payment Method</h1>
            <div className="mt-4 w-full flex justify-between items-center">
              <div className="">
                Credit Card
              </div>
              <div className="flex gap-2">
                <div className="">
                  <Image src={'/img/visa.svg'} alt="Visa Logo" width={44} height={32} />
                </div>
                <div className="">
                  <Image src={'/img/mastercard.svg'} alt="Visa Logo" width={41} height={32} />
                </div>
                <div className="">
                  <Image src={'/img/americanexpress.svg'} alt="Visa Logo" width={32} height={32} />
                </div>
                <div className="">
                  <Image src={'/img/discover.svg'} alt="Visa Logo" width={32} height={32} />
                </div>
              </div>
            </div>
            <div className="space-y-2">
                <Elements stripe={stripePromise}>
                    <div className="">
                        <h1 className='py-1 text-sm font-medium'>Name on card </h1>
                        <Input
                            control={control}
                            name={'name'} />
                    </div>
                    <div className="">
                        <h1 className='py-1 text-sm font-medium w-full'>Card number </h1>
                        <CardNumberElement options={options} className="flex-1 border-2 
                            hover:border-neutral 
                            shadow-sm 
                            focus:border-accent 
                            focus:outline-none 
                            bg-white
                            cursor-pointer
                            rounded py-2 px-4" />
                    </div>
                    <div className="">
                        <h1 className='py-1 text-sm font-medium'>Expiration date </h1>
                        <CardExpiryElement options={extraOptions} className="flex-1 border-2 
                            hover:border-neutral 
                            shadow-sm 
                            focus:border-accent 
                            focus:outline-none 
                            bg-white
                            cursor-pointer
                            rounded py-2 px-4" />
                    </div>
                    <div className="">
                        <h1 className='py-1 text-sm font-medium'>Security code </h1>
                        <CardCvcElement options={extraOptions} className="flex-1 border-2 
                            hover:border-neutral 
                            shadow-sm 
                            focus:border-accent 
                            focus:outline-none 
                            bg-white
                            cursor-pointer
                            rounded py-2 px-4" />
                    </div>
                </Elements>
            </div>
            <div className="space-x-2 mt-3">
              <Button
                onClick={onCancel}
                title={'Cancel'}
                btnSecondary
                btnOutline />
              <Button
                title={'Add'}
                btnOutline
                disabled={true} />
            </div>
        </div>
    )
}

export default PaymentForm;