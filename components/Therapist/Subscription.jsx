import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { GrCertificate } from 'react-icons/gr';
import { FaEdit, FaGraduationCap, FaHeadSideVirus, FaSpinner } from 'react-icons/fa';
import { MdAccessTime, MdOutlineUpdate, MdEdit, MdOutlineCake, MdOutlineLocationOn, MdClose } from 'react-icons/md';
import { BsBookmarks, BsGenderTrans, BsTelephone } from 'react-icons/bs';
import { useFetchTherapistQuery } from '../../store/api/ssmApi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Input from '../../components/UI/TextInput';
import { useForm } from 'react-hook-form';
import Select from '../../components/UI/Select';
import Checkbox from '../../components/UI/Checkbox';
import Radio from '../../components/UI/Radio';
import Button from '../../components/UI/Button';
import { useEffect, useMemo } from 'react';
import { RiVisaLine } from 'react-icons/ri';
import { SiVisa } from 'react-icons/si';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import RadioInput from '../../components/UI/Radio';
import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import InputText from '../UI/InputText';

const Subsciption = ({profile}) => {

    const [form, setForm] = useState(false);
    const {control, handleSubmit} = useForm({
        defaultValues: {
            date_of_birth: profile?.date_of_birth,
            phone: profile?.phone,
            gender: profile?.gender,
            user_address: profile?.user_address
        }
    });

    const [updateTherapist, { isSuccess, isLoading, isError, error }] = useUpdateTherapistMutation();

    const detailsSubmitHandler = async (data) => {
        if(!data) return;
        await updateTherapist({ 
            id: profile?.id, 
            ...data,
            registration_status: 'completed' });
    };
    
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

    useEffect(() => {
        if(isSuccess){
            setdetails(false);
        }
    },[isSuccess]);
    
    return (
        <div className="mt-5 md:mt-0 relative px-4 py-2.5 md:py-5 border-[1.5px] md:border-0 rounded-md md:rounded-none border-primary">
            <div className="absolute top-1 md:top-2 right-2 md:right-0 text-2xl text-secondary cursor-pointer">
                {
                    form ? 
                    <MdClose onClick={() => setForm(false)} className="text-red-500" /> : 
                    <div onClick={() => setForm(true)} className="">
                        <MdEdit className="hidden md:block" />
                        <span className="md:hidden text-sm font-medium underline underline-offset-4">Edit</span>
                    </div>
                }
            </div>
            <div className="">
                {
                    form ?
                    <form onSubmit={handleSubmit(detailsSubmitHandler)} className="">
                        <h1 className="text-sm lg:text-xl font-medium text-primary">Update Payment Method</h1>
                        <div className="">
                            <h2 className="my-1">Select the default payment method</h2>
                            <RadioInput
                                control={control}
                                data={{
                                    name: 'card',
                                    options: [
                                        {
                                            label: 'ending 1234',
                                            value: 'card1'
                                        },
                                        {
                                            label: 'ending 5678',
                                            value: 'card2'
                                        },
                                    ]
                                }} />
                        </div>
                        <div className="my-5">
                            <h2 className='text-center bg-neutral'>Your current plan</h2>
                            <div className="px-2">
                                <h1 className="text-sm pt-2 lg:text-xl font-medium text-primary">Monthly Subscription</h1>
                                <h3 className="text-sm py-3 font-medium">$29.99/mo</h3>
                                <p className="text-xs">Auto-renews September 1, 2022</p>
                            </div>
                        </div>
                        <div className="my-2">
                            <div className="px-2">
                                <h1 className="text-sm pt-2 lg:text-xl font-medium text-primary">Annual Subscription</h1>
                                <h3 className="text-sm py-3 font-medium">$240.00/mo</h3>
                                <Button
                                    title={'Select'}
                                    className="w-full md:w-auto" />
                            </div>
                        </div>
                        <div className="my-5">
                            <h1 className="text-sm lg:text-xl font-medium text-primary">Add New Payment Method</h1>
                            <h3 className="text-sm my-1">Credit Card </h3>
                            <div className="space-y-2">
                                <Elements stripe={stripePromise}>
                                    <div className="">
                                        <h1 className='py-1 text-sm font-medium'>Name on card </h1>
                                        <InputText
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
                                        <CardExpiryElement options={extraOptions} className="" />
                                    </div>
                                    <div className="">
                                        <h1 className='py-1 text-sm font-medium'>Security code </h1>
                                        <CardCvcElement options={extraOptions} />
                                    </div>
                                </Elements>
                            </div>
                        </div>
                        <Button type={'submit'} title={'Update'} btnQnr />
                    </form>:
                    <div className="md:grid lg:grid-cols-2 gap-5">
                        <div className="flex justify-start col-span-2">
                            <div className="flex font-semibold items-center justify-center text-primary">
                                <BsBookmarks className='text-xl hidden md:block' />
                                <h2 className="md:pl-2">Subscription</h2>
                            </div>
                        </div>
                        <div className="">
                            <div className="mt-5 md:mt-0">
                                <h2 className="font-semibold">Annual Subscription</h2>
                            </div>
                            <div className="mt-[18px] leading-7">
                                <p className="font-medium">$240.00 billed annually</p>
                                <p className="">
                                    <span className="font-medium">Next Billing Date: </span>
                                    August 1, 2023
                                </p>
                                <p className="text-success">
                                    <span className="font-medium text-black">
                                        Status: </span>Active
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 md:mt-0">
                            <div className="">
                                <h2 className="font-semibold">Payment Method</h2>
                            </div>
                            <div className="mt-[18px]">
                                <p className="flex items-center">
                                    <span className="text-4xl leading-none">
                                        <svg width="0" height="0">
                                            <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                                                <stop stopColor="#222357" offset="0%" />
                                                <stop stopColor="#254AA5" offset="100%" />
                                            </linearGradient>
                                        </svg>
                                        <RiVisaLine style={{ fill: "url(#blue-gradient)" }}  />
                                    </span>
                                    <span className="pl-2">ending in 1234</span>
                                </p>
                                <p className="text-secondary-focus cursor-pointer underline underline-offset-2">Change Payment Method</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Subsciption;