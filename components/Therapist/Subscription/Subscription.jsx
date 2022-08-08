import React from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import { MdClose, MdEdit } from 'react-icons/md';
import { useFetchSubscriptionPlanQuery, useFetchSubscriptionsQuery } from '../../../store/api/ssmApi';
import Button  from '../../UI/Button';
import Spinner from '../../UI/Loader';
import Confirmed from './Confirmed';

const SubscriptionItem = () => {

    const [form, setForm] = useState(false);
    const [confirmed, setConfirm] = useState(false);

    const { data:subscriptionPlans, isLoading } = useFetchSubscriptionPlanQuery();
    const { data:subscriptions, isLoading:subsLoading } = useFetchSubscriptionsQuery();

    console.log(subscriptionPlans);
    console.log(subscriptions);
    if(isLoading || subsLoading) return <Spinner className="text-3xl text-primary" />
    const [plan] = subscriptions;
    console.log("Current Plan: ", dayjs().format('MM-DD-YY'));
    const currentPlan = subscriptionPlans.find(pln => pln.id === plan.subscription_plan_id);
    const altPlan = subscriptionPlans.find(pln => pln.id !== plan.subscription_plan_id);
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
                                    <h1 className="text-sm pt-2 lg:text-xl font-medium text-primary">{currentPlan?.plan_name} Subscription</h1>
                                    <h3 className="text-sm py-3 font-medium">${currentPlan?.price}/mo</h3>
                                    <p className="text-xs">Auto-renews {dayjs(currentPlan?.end_at).format('MM/DD/YYYY')}</p>
                                </div>
                            </div>
                            <div className="my-2 pb-2 border-[1.5px] md:border-0 rounded-md md:rounded-none border-primary">
                                <div className="px-2">
                                    <h1 className="text-sm pt-2 lg:text-xl font-medium text-primary">{altPlan?.plan_name} Subscription</h1>
                                    <h3 className="text-sm py-3 font-medium">${ altPlan?.price }/mo</h3>
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
                    <h2 className="font-semibold text-sm md:text-base text-primary md:text-black">{currentPlan?.plan_name}</h2>
                </div>
                <div className="mt-4 md:mt-[18px] leading-7 text-sm md:text-base">
                    <p className="font-medium">${currentPlan?.price} billed annually</p>
                    {
                        plan?.subscription_status === "trialing" ?
                        <>
                        <p className="">
                            <span className="font-medium">Trial End Date: </span>
                            {dayjs(currentPlan?.end_at).format('MM/DD/YYYY')}
                        </p>
                        <p className="">
                            <span className="font-medium">Initial Billing Date: </span>
                            {dayjs(currentPlan?.start).format('MM/DD/YYYY')}
                        </p>
                        <p className="">
                            <span className="font-medium">Auto-review: </span>
                            
                        </p>
                        </>:
                        <p className="">
                            <span className="font-medium">Next Billing Date: </span>
                            August 1, 2023
                        </p>
                    }
                </div>
            </div>
                )
            }
        </div>
    )
}

export default SubscriptionItem;