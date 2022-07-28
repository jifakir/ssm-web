import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { MdAccessTime, MdAdd, MdDeleteOutline, MdEdit, MdOutlineClose } from 'react-icons/md';
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
        label: '01:30 PM',
        value: '01:30pm',
    },
    {
        label: '02:00 PM',
        value: '02:00pm',
    },
    {
        label: '02:30 PM',
        value: '02:30pm',
    },
    {
        label: '03:00 PM',
        value: '03:00pm',
    },
    {
        label: '03:30 PM',
        value: '03:30pm',
    },
    {
        label: '04:00 PM',
        value: '04:00pm',
    },
    {
        label: '04:30 PM',
        value: '04:30pm',
    },
    {
        label: '05:00 PM',
        value: '05:00pm',
    },
    {
        label: '05:30 PM',
        value: '05:30pm',
    },
    {
        label: '06:00 PM',
        value: '06:00pm',
    },
    {
        label: '06:30 PM',
        value: '06:30pm',
    },
    {
        label: '07:00 PM',
        value: '07:00pm',
    },
    {
        label: '07:30 PM',
        value: '07:30pm',
    },
    {
        label: '08:00 PM',
        value: '08:00pm',
    },
    {
        label: '08:30 PM',
        value: '08:30pm',
    },
    {
        label: '09:00 PM',
        value: '09:00pm',
    },
    {
        label: '09:30 PM',
        value: '09:30pm',
    },
    {
        label: '10:00 PM',
        value: '10:00pm',
    },
    {
        label: '10:30 PM',
        value: '10:30pm',
    },
    {
        label: '11:30 PM',
        value: '11:30pm',
    },
    {
        label: '12:00 PM',
        value: '12:00pm',
    },
    {
        label: '12:30 PM',
        value: '12:30pm',
    },
];


const amTime = [
    {
        label: '01:00 AM',
        value: '01:00am',
    },
    {
        label: '01:30 AM',
        value: '01:30am',
    },
    {
        label: '02:00 AM',
        value: '02:00am',
    },
    {
        label: '02:30 AM',
        value: '02:30am',
    },
    {
        label: '03:00 AM',
        value: '03:00am',
    },
    {
        label: '03:30 AM',
        value: '03:30am',
    },
    {
        label: '04:00 AM',
        value: '04:00am',
    },
    {
        label: '04:30 AM',
        value: '04:30am',
    },
    {
        label: '05:00 AM',
        value: '05:00am',
    },
    {
        label: '05:30 AM',
        value: '05:30am',
    },
    {
        label: '06:00 AM',
        value: '06:00am',
    },
    {
        label: '06:30 AM',
        value: '06:30am',
    },
    {
        label: '07:00 AM',
        value: '07:00am',
    },
    {
        label: '07:30 AM',
        value: '07:30am',
    },
    {
        label: '08:00 AM',
        value: '08:00am',
    },
    {
        label: '08:30 AM',
        value: '08:30am',
    },
    {
        label: '09:00 AM',
        value: '09:00am',
    },
    {
        label: '09:30 AM',
        value: '09:30am',
    },
    {
        label: '10:00 AM',
        value: '10:00am',
    },
    {
        label: '10:30 AM',
        value: '10:30am',
    },
    {
        label: '11:00 AM',
        value: '11:00am',
    },
    {
        label: '11:30 AM',
        value: '11:30am',
    },
    {
        label: '12:00 AM',
        value: '12:00am',
    },
    {
        label: '12:30 AM',
        value: '12:30am',
    },
];



const Availability = ({profile }) => {
    
    const [form, setForm] = useState(false);

    const { 
        handleSubmit, 
        control, watch, 
        formState: { errors} } = useForm({
            defaultValues: { 
                availabilities: profile?.availabilities
            }});

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'availabilities'
    });
    
    const appendField = () => {
        if(fields.length >= 6) return;
        append({
                day: 'monday',
                start_time: '8:00am',
                end_time: '8:00pm'
        });
    };

    const [updateTherapist, { 
        isSuccess, isLoading, isError 
    }] = useUpdateTherapistMutation();

    
    const handleNext = async (data) => {
        await updateTherapist({id: profile?.id, ...data, registration_status: 'completed' });
    
    };

    const isFilledUp = watch('availabilities').every((itm, idx) => itm.day && itm.start_time && itm.end_time);

    useEffect(() => {
        if(isSuccess){
            setForm(false);
        }
    },[isSuccess]);
  
    return (
        <div className='relative border-b-2 pb-5 border-black'> 
            <div className="absolute top-2 right-0 text-2xl text-secondary cursor-pointer">
                {
                    form ? 
                    <MdOutlineClose onClick={() => setForm(false)} /> : 
                    <div className="">
                        <MdEdit onClick={() => setForm(true)} className="hidden md:block" />
                        <div className="md:hidden text-sm font-medium underline underline-offset-4">Edit</div>
                    </div>
                }
            </div> 
           {form ?
            <form onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <div className="flex justify-start mb-2">
                        <button type='button' onClick={appendField} className='btn btn-outline btn-primary btn-sm'>
                            <MdAdd className='mr-1 text-lg' /> Add Day
                        </button>
                    </div>
                    <div className="">
                        {
                            fields.map((field, idx) => {
                                return (
                                    <div key={field.id} className="text-left flex items-center gap-5">
                                        <div className="w-52">
                                                <h3 className={`my-2 ${idx=== 0 ? 'block' : 'hidden'}`}>Day</h3>
                                                <Select 
                                                    control={control} 
                                                    data={{name: `availabilities.${idx}.day`, options: week}} />
                                            </div>
                                            <div className=" w-40">
                                                <h3 className={`my-2 ${idx=== 0 ? 'block' : 'hidden'}`}>M-Start Time</h3>
                                                <Select 
                                                    control={control} 
                                                    data={{name: `availabilities.${idx}.start_time`, options: amTime}} />
                                            </div>
                                            <div className=" w-40">
                                                <h3 className={`my-2 ${idx=== 0 ? 'block' : 'hidden'}`}>M-End Time</h3>
                                                <Select 
                                                    control={control} 
                                                    data={{name: `availabilities.${idx}.end_time`, options: pmTime}} />
                                            </div>
                                            <div onClick={() => remove(idx)} className="w-5 flex items-center">
                                                <MdDeleteOutline className={`cursor-pointer text-secondary hover:text-error mt-3 text-lg ${idx === 0 ? 'hidden' : 'block'}`} />
                                            </div>
                                        </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="mt-5">
                    <Button 
                        title={'Submit'} 
                        btnQnr
                        disabled={!isFilledUp} />
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