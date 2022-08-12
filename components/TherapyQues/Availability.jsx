import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { MdAdd, MdDeleteOutline } from 'react-icons/md';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Checkbox from '../UI/Checkbox';
import Select from '../UI/Select';
import Button from '../UI/Button';
import { useRouter } from 'next/router';
import Stripe from '../Stripe/index';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFetchSubscriptionsQuery, useSubscribeMutation } from '../../store/api/ssmApi';
import { BiLoaderAlt } from 'react-icons/bi';
import { week, pmTime, amTime } from '../data';

const Availability = ({step, setStep, profile }) => {
    
    const [payment, setPayment] = useState(false);
    const { 
            handleSubmit, 
            control, watch, 
            formState: { errors} } = useForm({
                defaultValues: { 
                    availabilities: profile?.availabilities || [{
                        day: 'monday',
                        start_time: '8:30am',
                        end_time: '8:30pm'
                    }]
                }});
    const [updateTherapist, { isSuccess, isLoading, isError }] = useUpdateTherapistMutation();
    const [subscribe, { 
        data:subscriptionData,
        error, 
        isLoading: subsLoading,
        isError:subsError,
        isSuccess:subsSuccess }] = useSubscribeMutation();

    const { data:isSubscribed } = useFetchSubscriptionsQuery();
    const { subscription } = useSelector(state => state);
    
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
    }

    const router = useRouter();

    const handleNext = async (data) => {
        await updateTherapist({id: profile?.id, ...data, registration_status: 'completed' });
    };


    const handleBack = () => {
        setStep(step - 1);
    };

    const isFilledUp = watch('availabilities').every((itm, idx) => itm.day && itm.start_time && itm.end_time);

    useEffect(() => {
        if(isSuccess && profile?.is_subscribed){
            router.push('/therapist/profile');
            return;
        }
        if(isSuccess){
            subscribe({subscription_plan_id: subscription?.id});
        }

    },[isSuccess]);
    
    useEffect(()=> {

        if(subsError && error.status == 401){
                dispatch(logOut());
                setOpen(state => !state);
        }

    },[subsError]);

    useEffect(() => {
        if(subsSuccess){
            setPayment(true);
        }
    },[subsSuccess]);
    

    return (
        <>  
            {
                payment && (
                        <div className="fixed bg-primary/50 bg-blend-saturation top-0 left-0 z-[500] w-full min-h-screen h-screen flex justify-center items-center">
                            <div className="shadow-lg rounded-lg relative w-1/2 min-h-52 h-auto bg-white text-whtie text-center flex justify-center items-center">
                                {/* <span onClick={() => setPayment(false)} className="absolute top-1 right-2 text-2xl cursor-pointer hover:text-red-600">
                                    <MdClose />
                                </span> */}
                                <Stripe loading={isLoading} data={subscriptionData} />
                            </div>
                        </div>
                        )
            }
            <form id="availability-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="md:w-1/2">
                    <div className="flex justify-start mb-2">
                        <button type='button' onClick={appendField} className='btn btn-outline btn-primary btn-sm'>
                            <MdAdd className='mr-1 text-lg' /> Add Day
                        </button>
                    </div>
                    <div className="w-full">
                        {
                            fields.map((field, idx) => {
                                return (
                                        <div key={field.id} className="w-full text-left flex items-center gap-5">
                                            <div className="min-w-52">
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
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                    <Button 
                        title={'Back'} 
                        onClick={handleBack}
                        btnQnr
                        btnSecondary />
                    <Button 
                        title={'Submit'} 
                        form="availability-form" 
                        btnQnr
                        disabled={!isFilledUp} >
                                {
                                    isLoading ? <BiLoaderAlt className="animate-spin text-2xl mr-2" /> : ''
                                }
                    </Button>
            </div>
        </>
    )
}

export default Availability;