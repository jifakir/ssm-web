import React from 'react';
import { useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import { RiVisaLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useFetchCardListQuery } from '../../../store/api/ssmApi';
import CreditCard from './CreditCard';
import UpdatePayment from './UpdatePayment';


const PaymentMethod = ({ form, setForm }) => {


    const { userDetails } = useSelector(state => state.auth);
    const { data } = useFetchCardListQuery({ therapistId:userDetails.id });

    const defaultCard = data?.find(card => card.is_default === true);

    return (
        <div className="relative mt-5 md:mt-0 border-[1.5px] px-2 py-2 md:border-0 rounded-md md:rounded-none border-primary">
            {
                form === 'payment' && <UpdatePayment cardDetails={data} setForm={setForm} />
            }
            <div className="absolute md:hidden -top-2 md:top-2 right-2 md:right-0 text-2xl text-secondary cursor-pointer">
                {
                    form ? 
                    <MdClose onClick={() => setForm('')} className="text-red-500" /> : 
                    <div onClick={() => setForm('payment')} className="">
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
                        <CreditCard 
                            brand={defaultCard?.metadata.brand} 
                            cardNumber={defaultCard?.metadata.last4} />
                </p>
                <p onClick={() => setForm('payment')} className="hidden md:block text-secondary-focus cursor-pointer underline underline-offset-2">Change Payment Method</p>
            </div>
        </div>
    )
}

export default PaymentMethod;