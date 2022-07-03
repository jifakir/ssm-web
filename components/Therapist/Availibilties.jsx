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
import { MdAccessTime, MdEdit, MdOutlineClose } from 'react-icons/md';
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
        value: '01:00am',
    },
    {
        label: '02:00 AM',
        value: '02:00am',
    },
    {
        label: '03:00 AM',
        value: '03:00am',
    },
    {
        label: '04:00 AM',
        value: '04:00am',
    },
    {
        label: '05:00 AM',
        value: '05:00am',
    },
    {
        label: '06:00 AM',
        value: '06:00am',
    },
    {
        label: '07:00 AM',
        value: '07:00am',
    },
    {
        label: '08:00 AM',
        value: '08:00am',
    },
    {
        label: '09:00 AM',
        value: '09:00am',
    },
    {
        label: '10:00 AM',
        value: '10:00am',
    },
    {
        label: '11:00 AM',
        value: '11:00am',
    },
    {
        label: '12:00 AM',
        value: '12:00am',
    },
];

const Availability = ({profile }) => {
    
    const [form, setForm] = useState(false);
    const { 
            register, handleSubmit, 
            control, watch, 
            formState: { errors} } = useForm({
                defaultValues: { 
                    days: profile?.availabilities ? [...profile?.availabilities.map( v => v.day )] : [],
                    start_time: profile?.availabilities ? profile?.availabilities[0].start_time : '12:00am', 
                    end_time: profile?.availabilities ? profile?.availabilities[0].end_time : '11:00pm', 
                }});
    const [updateTherapist, { 
        isSuccess, isLoading, isError 
    }] = useUpdateTherapistMutation();

    
    const handleNext = async (data) => {

        const { days, start_time, end_time } = data;
        if(days == null) return;
        const daysArr = days.filter(d=>d).map(day => {
            return {day,start_time,end_time}
        });
        await updateTherapist({id: profile?.id, availabilities: daysArr, registration_status: 'completed' });
    
    };

    useEffect(() => {
        if(isSuccess){
            setForm(false);
        }
    });
  
    return (
        <div className='relative'> 
            <div className="absolute top-2 right-0 text-2xl text-secondary cursor-pointer">
                {
                    form ? 
                    <MdOutlineClose onClick={() => setForm(false)} /> : 
                    <MdEdit onClick={() => setForm(true)} />
                }
            </div> 
           {form ?
            <form onSubmit={handleSubmit(handleNext)} className="">
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
                <div className="mt-5">
                    <Button 
                        title={'Submit'} 
                        btnQnr
                        disabled={
                            watch('days') ? 
                            watch('days').filter(d => d).length === 0 : 
                            !watch('days')} />
                </div>
            </form>:
            <div > 
            <div className="flex justify-start">
                <div className="flex font-semibold items-center justify-center text-primary">
                    <MdAccessTime className='text-xl' />
                    <h2 className="pl-2">Availability</h2>
                </div>
            </div>
            <div className="pt-5 flex flex-wrap justify-center md:justify-start gap-5">
                {
                     profile?.availabilities?.map((itm, idx) => (
                            <div key={idx} className="text-xs border-r-2 pr-5 last:border-r-0">
                                <h1 className="text-2xl text-center leading-8 capitalize">{itm.day.split('')[0]}</h1>
                                <p className="flex justify-between">
                                    <span className="">Start:</span> 
                                    <span className=""> &nbsp;{itm.start_time}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="">End:</span>
                                    <span className="">{itm.end_time}</span>
                                </p>
                            </div>
                        ))
                }
            </div>
        </div>
                        }
        </div>
    )
}

export default Availability;