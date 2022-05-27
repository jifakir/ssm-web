import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';


const Religion = ({ step, setStep }) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { religion } = data;
        if(!religion) return;
        await updateTherapist({ religion, registration_status: 'email' });

        // if(!isSucces){
        //     return
        // }

        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    const data = {
        title: 'What is your religion?',
        name: 'religion',
        options: [
            {
                label: 'Christianity',
                value: 'christianity'
            },
            {
                label: 'Judaism',
                value: 'judaism'
            },
            {
                label: 'Islam',
                value: 'islam'
            },
            {
                label: 'Hinduism',
                value: 'hinduism'
            },
            {
                label: 'Buddhism',
                value: 'buddhism'
            },
            {
                label: 'Atheism',
                value: 'atheism'
            },
            {
                label: 'None',
                value: 'none'
            },
            {
                label: 'Other',
                value: 'other'
            },
        ]
    };
    return (
        <form onSubmit={handleSubmit(handleNext)} className="">
            <div className="form-control w-full max-w-xs">
            <div className="form-control w-full max-w-xs">
                <Radio register={register} errors={errors} data={data} />
            </div>
            </div>
            <div className={`flex gap-5 py-5`}>
                <Button title={'Back'} onClick={handleBack} />
                <Button title={'Next'} onClick={handleNext} className={`${!watch().religion ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </form>
    )
}

export default Religion;