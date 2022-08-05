import React from 'react';
import { useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import Button  from '../../UI/Button';
import Confirmed from './Confirmed';

const SubscriptionItem = () => {

    const [form, setForm] = useState(false);
    const [confirmed, setConfirm] = useState(false);

    const handleConfirmation = () => {
        setForm(false);
        setConfirm(false);
    };

    return (
        <div className="">
            {
                form ? (
                    <div className="">
                        {
                        confirmed ? 
                        <Confirmed clickedOk={handleConfirmation} />:
                        <div className="">
                            <div className="my-5 border-[1.5px] pb-2.5 md:border-0 rounded-md md:rounded-none border-primary overflow-hidden">
                                <h2 className='text-center bg-neutral text-sm font-semibold py-1'>Your current plan</h2>
                                <div className="px-2">
                                    <h1 className="text-sm pt-2 lg:text-xl font-medium text-primary">Monthly Subscription</h1>
                                    <h3 className="text-sm py-3 font-medium">$29.99/mo</h3>
                                    <p className="text-xs">Auto-renews September 1, 2022</p>
                                </div>
                            </div>
                            <div className="my-2 pb-2 border-[1.5px] md:border-0 rounded-md md:rounded-none border-primary">
                                <div className="px-2">
                                    <h1 className="text-sm pt-2 lg:text-xl font-medium text-primary">Annual Subscription</h1>
                                    <h3 className="text-sm py-3 font-medium">$240.00/mo</h3>
                                    <Button
                                        onClick={() => setConfirm(true)}
                                        title={'Select'}
                                        className="w-full md:w-auto" />
                                </div>
                            </div>
                        </div>
                    }
                    </div>
                ):
                (
            <div className="border-[1.5px] px-2 py-2 md:border-0 rounded-md md:rounded-none border-primary">
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
                    <h2 className="font-semibold text-sm md:text-base text-primary md:text-black">Annual Subscription</h2>
                </div>
                <div className="mt-4 md:mt-[18px] leading-7 text-sm md:text-base">
                    <p className="font-medium">$240.00 billed annually</p>
                    <p className="">
                        <span className="font-medium">Next Billing Date: </span>
                        August 1, 2023
                    </p>
                </div>
            </div>
                )
            }
        </div>
    )
}

export default SubscriptionItem;