import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';


const Gender = ({ step, setStep }) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { gender } = data;

        await updateTherapist({ gender, registration_status: 'entered-email' });

        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    const data = {
        title: 'What is your gender?',
        name: 'gender',
        options: [
            {
                label: 'Male',
                value: 'male'
            },
            {
                label: 'Female',
                value: 'female'
            },
            {
                label: 'Transgender Male',
                value: 'trans_male'
            },
            {
                label: 'Transgender Female',
                value: 'trans_female'
            },
            {
                label: 'Prefer not to say',
                value: 'not_preferred'
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
                <Button title={'Back'} />
                <Button title={'Next'} className={`${!watch().gender ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </form>
    )
}

export default Gender;