import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiVisaLine } from 'react-icons/ri';
import Button from '../../UI/Button';
import RadioInput from '../../UI/Radio';
import PaymentForm from '../PaymentForm';

const CreditCard = ({ brand, cardNumber }) => (
        <div className="flex items-center">
            <Image src={`/img/${brand === 'visa' ? 'visa.svg' : brand === 'mastercard' ? 'mastercard.svg' : 'discover.svg'}`} alt="Card Logo" width={41} height={32} />
            <span className='pl-2'>ending {cardNumber}</span>
        </div>
)

const UpdatePayment = ({ cardDetails }) => {

    const [add, setAdd] = useState(false);
    const [stripePromise, setStripePromise] = useState(() => loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBKEY}`));

    const { control } = useForm({
        defaultValues: {
            card: cardDetails.find(card => card.is_default === true).id
        }
    });

   
    const options = cardDetails.map( (card, idx) => {
        
        return {
                value: card.id, 
                label: <CreditCard brand={card.metadata.brand} cardNumber={card.metadata.last4} />
            }
    })

    return (
        <div className={`
        md:fixed bottom-0 md:h-screen md:min-h-screen 
        transition-all duration-500 ease-in-out top-0 
        left-0 z-50 md:bg-primary/60 w-full flex justify-center items-center overscroll-contain`}>
        <div className="w-full md:w-[450px] h-auto md:px-10 py-10 flex justify-center items-center bg-white rounded-md">
            <div className="w-full">
                {
                    add ?
                    <Elements stripe={stripePromise} >
                        <PaymentForm setAdd={setAdd} onCancel={() => setAdd(false)} />
                    </Elements>
                    :
                    <form className="mt-5  border-[1.5px] px-2 py-2 md:border-0 rounded-md md:rounded-none border-primary">
                        <h1 className="text-sm lg:text-xl font-medium text-primary">Update Payment Method</h1>
                        <div className="text-sm mt-4">
                            <h2 className="my-1 text-sm md:text-base">Select the default payment method</h2>
                            <RadioInput
                                control={control}
                                data={{
                                    name: 'card',
                                    options: options
                                }} />
                        </div>
                        <p onClick={() => setAdd(true)} className="mt-1 text-xs text-secondary-focus cursor-pointer underline underline-offset-2">+ Add</p>
                        <p className="py-2 text-xs text-black/50 mt-8">Changes may takke a few days to be applied</p>
                        <Button 
                            title={'Save'}
                            className={'w-full'}
                            fontSize="text-2xl"
                            disabled={true}
                            />
                    </form>
                }
            </div>
        </div>
    </div>
    )
}

export default UpdatePayment;