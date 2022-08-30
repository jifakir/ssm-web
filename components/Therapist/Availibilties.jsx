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
import { week, pmTime, amTime } from '../data';

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
        <div className='mt-5 md:mt-0 relative px-4 py-2.5 md:py-5 border-[1.5px] md:border-0 rounded-md md:rounded-none md:border-b-2 border-primary md:border-black'> 
            <div className="absolute top-2 md:top-2 right-2 md:right-0 text-2xl text-secondary cursor-pointer">
                {
                    form ? 
                    <MdOutlineClose onClick={() => setForm(false)} className="hidden md:block" /> : 
                    <div onClick={() => setForm(true)} className="">
                        <MdEdit className="hidden md:block" />
                        <div className="md:hidden text-sm font-medium underline underline-offset-4">Edit</div>
                    </div>
                }
            </div> 
           {form ?
            <form onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <h1 className="text-lg my-2 text-left">Provide your current availability</h1>
                    <div className="flex justify-start mb-2">
                        <button type='button' onClick={appendField} className='btn btn-outline btn-secondary btn-sm'>
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
                                                <h3 className={`my-2 ${idx=== 0 ? 'block' : 'hidden'}`}>Start Time</h3>
                                                <Select 
                                                    control={control} 
                                                    data={{name: `availabilities.${idx}.start_time`, options: amTime}} />
                                            </div>
                                            <div className=" w-40">
                                                <h3 className={`my-2 ${idx=== 0 ? 'block' : 'hidden'}`}>End Time</h3>
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
                <div className="mt-5 space-x-5">
                    <Button
                        onClick={() => setForm(false)}
                        title={'Cancel'}
                        type="button"
                        btnOutline
                        btnSecondary
                        />
                    <Button 
                        title={'Save'} 
                        btnOutline
                        disabled={!isFilledUp} />
                </div>
            </form>:
            <div > 
                <div className="flex justify-start">
                    <div className="flex font-semibold items-center justify-center text-primary">
                        <MdAccessTime className='text-xl hidden md:block' />
                        <h2 className="hidden md:block pl-2">Availability</h2>
                        <h2 className="md:hidden">Schedule</h2>
                    </div>
                </div>
                <div className="pt-5 text-sm md:text-base md:flex flex-wrap md:justify-start gap-5">
                    {
                        week.map((itm, idx) => {

                            const itmDay = profile?.availabilities.find(v => v.day === itm.value);
                            
                            return (
                                <div key={idx} className="flex items-center md:block text-sm md:text-base md:border-r-2 pr-5 last:border-r-0">
                                    <h1 className="hidden md:block text-2xl text-center leading-8 capitalize">{itm.label.split('')[0]}</h1>
                                    <h1 className="md:hidden text-center font-medium leading-8 capitalize">{itm.label}:</h1>
                                    {
                                        itmDay ? (
                                            <>
                                                <p className="flex justify-between">
                                                    <span className="hidden md:block">Start:</span> 
                                                    <span className=""> &nbsp;{itmDay.start_time}</span>
                                                </p>
                                                <span className="md:hidden">-</span>
                                                <p className="flex justify-between">
                                                    <span className="hidden md:block">End:</span>
                                                    <span className="">{itmDay.end_time}</span>
                                                </p>
                                            </>
                                        ): <p className="text-black/50 pl-2 md:pl-0">Unavailable</p>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
        </div>
                        }
        </div>
    )
}

export default Availability;