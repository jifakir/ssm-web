import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';

const data = {
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



const Gender = ({ step, setStep }) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm({mode: 'all'});
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { gender } = data;

        // await updateTherapist({ gender, registration_status: 'entered-email' });

        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    
    return (
        <form onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
                <h1 className="text-lg my-2 text-left">What is your gender?</h1>
                <div className="form-control w-full max-w-xs">
                    <Radio register={register} errors={errors} data={data} />
                </div>
            </div>
            <div className={`flex gap-5 py-5`}>
                <Button 
                    title={'Back'}
                    onClick={() => handleBack}
                    className="btn-outline border-neutral px-8 text-2xl" />
                <Button 
                    title={'Next'} 
                    type="submit"
                    className={`px-8 text-2xl ${!watch().gender ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </form>
    )
}

export default Gender;