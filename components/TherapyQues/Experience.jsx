import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';
import Select from '../UI/Select';

const data = {
    name: 'gender',
    options: [
        {
            label: '0-5 years',
            value: '0-5'
        },
        {
            label: '6-10 years',
            value: '6-10'
        },
        {
            label: '11-15 years',
            value: '11-15'
        },
        {
            label: '16-20 years',
            value: '16-20'
        },
        {
            label: '21-25 years',
            value: '21-25'
        },
    ]
};



const Experience = ({ step, setStep }) => {

    const { register, handleSubmit, control, watch, formState: { errors} } = useForm({mode: 'all'});
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
                <h1 className="text-lg my-2 text-left">How many years of experience do you have?</h1>
                <div className="form-control w-full max-w-xs text-left">
                    <Select register={register} control={control} errors={errors} data={data} />
                </div>
            </div>
            <div className={`flex gap-5 py-5`}>
                <Button 
                    title={'Back'}
                    onClick={() => handleBack} />
                <Button 
                    title={'Next'} 
                    type="submit"
                    className={`${!watch().gender ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </form>
    )
}

export default Experience;