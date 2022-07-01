import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Checkbox from '../UI/Checkbox';
import Select from '../UI/Select';
import Button from '../UI/Button';
import { useRouter } from 'next/router';
import Stripe from '../Stripe/index';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useEffect } from 'react';
import Loader from '../UI/Loader';
import { useSelector } from 'react-redux';
import { useFetchSubscriptionQuery, useSubscribeMutation } from '../../store/api/ssmApi';


const week = [
    {
        label: 'Monday',
        value: 'monday'
    },
    {
        label: 'Tuesday',
        value: 'tuesday'
    },
    {
        label: 'Wednesday',
        value: 'wednesday'
    },
    {
        label: 'Thursday',
        value: 'thursday'
    },
    {
        label: 'Friday',
        value: 'friday'
    },
    {
        label: 'Saturday',
        value: 'saturday'
    },
    {
        label: 'Sunday',
        value: 'sunday'
    },
]


const pmTime = [
    {
        label: '01:00 PM',
        value: '01:00pm',
    },
    {
        label: '02:00 PM',
        value: '02:00pm',
    },
    {
        label: '03:00 PM',
        value: '03:00pm',
    },
    {
        label: '04:00 PM',
        value: '04:00pm',
    },
    {
        label: '05:00 PM',
        value: '05:00pm',
    },
    {
        label: '06:00 PM',
        value: '06:00pm',
    },
    {
        label: '07:00 PM',
        value: '07:00pm',
    },
    {
        label: '08:00 PM',
        value: '08:00pm',
    },
    {
        label: '09:00 PM',
        value: '09:00pm',
    },
    {
        label: '10:00 PM',
        value: '10:00pm',
    },
    {
        label: '11:00 PM',
        value: '11:00pm',
    },
    {
        label: '12:00 PM',
        value: '12:00pm',
    },
];


const amTime = [
    {
        label: '01:00 AM',
        value: '01:00pm',
    },
    {
        label: '02:00 AM',
        value: '02:00pm',
    },
    {
        label: '03:00 AM',
        value: '03:00pm',
    },
    {
        label: '04:00 AM',
        value: '04:00pm',
    },
    {
        label: '05:00 AM',
        value: '05:00pm',
    },
    {
        label: '06:00 AM',
        value: '06:00pm',
    },
    {
        label: '07:00 AM',
        value: '07:00pm',
    },
    {
        label: '08:00 AM',
        value: '08:00pm',
    },
    {
        label: '09:00 AM',
        value: '09:00pm',
    },
    {
        label: '10:00 AM',
        value: '10:00pm',
    },
    {
        label: '11:00 AM',
        value: '11:00pm',
    },
    {
        label: '12:00 AM',
        value: '12:00pm',
    },
];

const Availability = ({step, setStep, profile }) => {
    
    const [payment, setPayment] = useState();
    const { 
            register, handleSubmit, 
            control, watch, 
            formState: { errors} } = useForm({
                defaultValues: { 
                    days: profile?.availabilities ? [...profile?.availabilities.map( v => v.day )] : [],
                    start_time: profile?.availabilities ? profile?.availabilities[0].start_time : '12:00am', 
                    end_time: profile?.availabilities ? profile?.availabilities[0].end_time : '11:00pm', 
                }});
    const [updateTherapist, { isSuccess, isLoading, isError }] = useUpdateTherapistMutation();
    const [subscribe, { 
        data:subscriptionData,
        error, 
        isLoading: subsLoading,
        isError:subsError,
        isSuccess:subsSuccess }] = useSubscribeMutation();

    const { data:isSubscribed } = useFetchSubscriptionQuery();
    const { id } = useSelector(state => state.subscription);
    
    const router = useRouter();

    const handleNext = async (data) => {

        const { days, start_time, end_time } = data;
        if(days == null) return;
        const daysArr = days.filter(d=>d).map(day => {
            return {day,start_time,end_time}
        });
        console.log(daysArr);
        await updateTherapist({id: profile?.id, availabilities: daysArr, registration_status: 'completed' });
    };


    const handleBack = () => {
        setStep(step - 1);
    };

    useEffect(() => {
        if(isSuccess){
                subscribe({subscription_plan_id: id});
        }

    },[isSuccess]);
    
    useEffect(()=> {

        if(subsError){
            if(error.status == 401){
                dispatch(logOut());
                setOpen(state => !state);
            }
        }

        if(subsSuccess){
            const {subscription_status} = subscriptionData;
            if(subscription_status === 'incomplete'){
                setPayment(true);
            }else if(subscription_status === 'trialing'){
                router.push('/therapist/profile');
            }
        }
    },[subsError, subsSuccess]);

    if(isLoading){
        return <Loader />
    }
    
    return (
        <>  
            {
                payment && (
                        <div className="fixed bg-primary/50 bg-blend-saturation top-0 left-0 z-[500] w-full min-h-screen h-screen flex justify-center items-center">
                            <div className="shadow-lg rounded-lg relative w-1/2 min-h-52 h-auto bg-white text-whtie text-center flex justify-center items-center">
                                <span onClick={() => setPayment(false)} className="absolute top-1 right-2 text-2xl cursor-pointer hover:text-red-600">
                                    <MdClose />
                                </span>
                                <Stripe loading={isLoading} data={subscriptionData} />
                            </div>
                        </div>
                        )
            }
            <form id="availability-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="text-left text-sm flex gap-5">
                    <div className="w-1/5">
                        <h1 className="text-lg my-2">Availability</h1>
                        <Checkbox register={register} control={control} errors={errors} data={{name: 'days', options: week }} />
                    </div>
                    <div className={`flex gap-10 ${!watch('days') ? 'hidden' : 'block'}`}>
                        <div className=" w-40">
                            <h3 className="my-2">M-Start Time</h3>
                            <Select control={control} data={{name: 'start_time', options: pmTime}} />
                        </div>
                        <div className=" w-40">
                            <h3 className="my-2">M-End Time</h3>
                            <Select control={control} data={{name: 'end_time', options: amTime}} />
                        </div>
                    </div>
                </div>
            </form>
            <div className={`flex gap-5 py-5`}>
                    <Button 
                        title={'Back'} 
                        onClick={handleBack}
                        btnQnr
                        btnSecondary />
                    <Button 
                        title={'Submit'} 
                        form="availability-form" 
                        btnQnr
                        disabled={
                            watch('days') ? 
                            watch('days').filter(d => d).length === 0 : 
                            !watch('days')} />
            </div>
        </>
    )
}

export default Availability;