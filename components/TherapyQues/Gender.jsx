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

const Gender = ({ step, setStep, profile }) => {

    const { control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {gender: profile?.gender}});
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { gender } = data;
        console.log("Gender: ",gender);
        if(!gender) return;
        await updateTherapist({ gender, id: profile?.id, registration_status: 'entered-gender' });
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    
    return (
        <>
            <form id="gender-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <h1 className="text-lg my-2 text-left">What is your gender?</h1>
                    <div className="form-control w-full max-w-xs">
                        <Radio control={control} rules={{required: 'Gender is required'}} data={data} />
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
                    title={'Next'} 
                    form="gender-form"
                    btnQnr
                    disabled={!watch('gender')} />
            </div>
        </>
    )
}

export default Gender;