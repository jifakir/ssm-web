import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Checkbox from '../UI/Checkbox';
import Select from '../UI/Select';
import Button from '../UI/Button';

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

const Availability = ({step, setStep}) => {
    

    const { register, handleSubmit, control, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        await updateTherapist({ availability: {...data}, registration_status: 'complete' });

        // if(!isSucces){
        //     return
        // }

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };


    return (
        <form onSubmit={handleSubmit(handleNext)} className="">
        <div className="text-left text-sm flex gap-5">
            <div className="w-1/5">
                <h1 className="text-lg my-2">Availability</h1>
                <Checkbox register={register} errors={errors} data={{name: 'availability.days', options: week }} />
            </div>
            <div className={`flex gap-10 ${!watch('availability.days') ? 'hidden' : 'block'}`}>
                <div className="mt-1 w-40">
                    <h3 className="my-2">M-Start Time</h3>
                    <Select control={control} data={{name: 'availability.startTime', options: pmTime}} />
                </div>
                <div className="mt-1 w-40">
                    <h3 className="my-2">M-End Time</h3>
                    <Select control={control} data={{name: 'availability.endTime', options: amTime}} />
                </div>
            </div>
        </div>
        <div className={`flex gap-5 py-5`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    className="btn-outline border-neutral px-8 text-2xl" />
                <Button 
                    title={'Submit'} 
                    type="submit" 
                    className={`px-8 text-2xl ${!watch().day && !watch().startTime && !watch().endTime ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
        </div>
        </form>
    )
}

export default Availability;