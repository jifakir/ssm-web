import React from 'react';
import { useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import { RiVisaLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useFetchCardListQuery } from '../../../store/api/ssmApi';
import UpdatePayment from './UpdatePayment';


const PaymentMethod = () => {

    const [form, setForm] = useState(false);

    const { userDetails } = useSelector(state => state.auth);
    const { data } = useFetchCardListQuery({ therapistId:userDetails.id });

    const defaultCard = data?.find(card => card.is_default === true);

    return !form ? (
        <div className="relative mt-5 md:mt-0 border-[1.5px] px-2 py-2 md:border-0 rounded-md md:rounded-none border-primary">
            <div className="absolute md:hidden -top-2 md:top-2 right-2 md:right-0 text-2xl text-secondary cursor-pointer">
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
                <h2 className="font-semibold text-sm md:text-base text-primary md:text-black">Payment Method</h2>
            </div>
            <div className="mt-[16px] md:mt-[18px]">
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
                    <span className="pl-2 text-sm md:text-base">ending in {defaultCard?.metadata.last4}</span>
                </p>
                <p onClick={() => setForm(true)} className="hidden md:block text-secondary-focus cursor-pointer underline underline-offset-2">Change Payment Method</p>
            </div>
        </div>
    ): (
        <UpdatePayment cardDetails={data} />
    )
}

export default PaymentMethod;