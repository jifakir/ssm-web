import React from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import { MdOutlineClose, MdEdit } from 'react-icons/md';
import { useChangeSubscriptionMutation, useFetchSubscriptionPlanQuery, useFetchSubscriptionsQuery, useSubscribeMutation } from '../../../store/api/ssmApi';
import Button  from '../../UI/Button';
import Spinner from '../../UI/Loader';
import Confirmed from './Confirmed';
import { useEffect } from 'react';

const SubscriptionItem = ({ form, setForm }) => {

    const [confirmed, setConfirm] = useState(false);

    const { data:subscriptionPlans, isLoading } = useFetchSubscriptionPlanQuery();
    const { data:subscriptions, isLoading:subsLoading } = useFetchSubscriptionsQuery();

    const [changeSubscription, result] = useChangeSubscriptionMutation();

    useEffect(() => {
        if(result.isSuccess){
            setForm(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[result]);

    if(isLoading || subsLoading) return <Spinner className="text-3xl text-primary" />
    
    const [plan] = subscriptions;
    const currentPlan = subscriptionPlans?.find(pln => pln.id === plan?.subscription_plan_id);
    const altPlan = subscriptionPlans?.find(pln => pln.id !== plan?.subscription_plan_id);
    
    const handleConfirmation = () => {
        setForm('');
        setConfirm(false);
    };

    const { isError:changeError, error:changeErr } = result;

    return (
        <div className="">
            {
                form === 'subscription' ? (
                    <div onClick={() => setForm('')} className={`
                    md:fixed bottom-0 md:h-screen md:min-h-screen 
                    transition-all duration-500 ease-in-out top-0 
                    left-0 z-50 md:bg-primary/60 w-full flex justify-center items-center overscroll-contain`}>
                        <div onClick={(e) => e.stopPropagation()} className="relative w-full md:w-[350px] h-auto md:px-10 py-10 flex justify-center items-center bg-white rounded-md">
                            {
                                confirmed ? 
                                <Confirmed clickedOk={handleConfirmation} />:
                                <div className="w-full">
                                    <div onClick={() => setForm('')} className="absolute top-3 right-3 text-3xl font-bold cursor-pointer hover:text-error">
                                        <MdOutlineClose />
                                    </div>
                                    <div className="w-full my-5 border-[1.5px] pb-2.5 md:border-0 rounded-md md:rounded-none border-primary overflow-hidden">
                                        <h2 className='text-center bg-neutral text-sm font-semibold py-1'>Your current plan</h2>
                                        <div className="px-2">
                                            <h1 className="text-sm pt-2 lg:text-xl font-medium text-primary">{currentPlan?.plan_name} Subscription</h1>
                                            <h3 className="text-sm py-3 font-medium">${currentPlan?.price}/mo</h3>
                                            <p className="text-xs">Auto-renews {dayjs(currentPlan?.end_at).format('MM/DD/YYYY')}</p>
                                        </div>
                                    </div>
                                    <div className="w-full my-2 pb-2 border-[1.5px] md:border-0 rounded-md md:rounded-none border-primary">
                                        <div className="px-2">
                                            <h1 className="text-sm pt-2 lg:text-xl font-medium text-primary">{altPlan?.plan_name} Subscription</h1>
                                            <h3 className="text-sm py-3 font-medium">${ altPlan?.price }/mo</h3>
                                            <Button
                                                onClick={() => changeSubscription({ subsId: plan?.id, planId: altPlan.id })}
                                                title={'Select'}
                                                className="w-full md:w-auto md:mx-auto" />
                                            <p className="text-error text-xs mt-2">{changeErr?.data?.message}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                ):
                (
                <div className="w-full border-[1.5px] px-2 py-2 md:border-0 rounded-md md:rounded-none border-primary">
                    {/* <div className="absolute top-1 md:top-2 right-2 md:right-0 text-2xl text-secondary cursor-pointer">
                        {
                            form ? 
                            <MdClose onClick={() => setForm('')} className="text-red-500" /> : 
                            <div onClick={() => setForm('subscription')} className="">
                                <MdEdit className="hidden md:block" />
                                <span className="md:hidden text-sm font-medium underline underline-offset-4">Edit</span>
                            </div>
                        }
                    </div> */}
                    <div className="">
                        <h2 className="font-semibold text-sm md:text-base text-primary">{currentPlan?.plan_name}</h2>
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
                                <span className="font-medium">Auto-renews: {dayjs(currentPlan?.end_at).format('MM/DD/YYYY')}</span>
                            </p>
                            </>:
                            <p className="">
                                <span className="font-medium">Next Billing Date: </span>
                                {/* August 1, 2023 */}
                                {dayjs(currentPlan?.end_at).format('MM/DD/YYYY')}
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