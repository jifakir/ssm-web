import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';

const data = {
    name: 'age',
    options: [
        {
            label: '18-25 years',
            value: {head: 18, tail: 25}
        },
        {
            label: '26-30 years',
            value: {head: 26, tail: 30}
        },
        {
            label: '31-35 years',
            value: {head: 31, tail: 35}
        },
        {
            label: '36-40 years',
            value: {head: 36, tail: 40}
        },
        {
            label: '41-45 years',
            value: {head: 41, tail: 45}
        },
        {
            label: '46-50 years',
            value: {head: 46, tail: 50}
        },
        {
            label: '51-55 years',
            value: {head: 51, tail: 55}
        },
        {
            label: '56+years',
            value: {head: 56, tail: 60}
        },
    ]
};




// Component
const Age = ({ step, setStep, profile }) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {is_religion_biased: profile?.is_religion_biased}});
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { age } = data;
        console.log("Religion Biased: ", age);
        if(!age) return;
        await updatePatient({id: profile?.id, age, registration_status: 'entered-is_religious' });
        setStep(step + 1);
    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
    <>
        <form id="is-spiritual-form" onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
                <h1 className="text-lg my-2 text-left">Will you someday want to transition to in-person sessions?</h1>
                <div className="form-control w-full max-w-xs">
                    <Radio register={register} errors={errors} data={data} />
                </div>
            </div>
        </form>
        <div className={`flex gap-5 py-5`}>
            <Button 
                title={'Back'} 
                onClick={handleBack}
                className="btn-outline border-neutral px-8 text-2xl" />
            <Button 
                title={'Next'} 
                form="is-spiritual-form" 
                className={`${isLoading ? 'loading' : ''} px-8 text-2xl ${!watch().age ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
        </div>
    </>
    )
}

export default Age;