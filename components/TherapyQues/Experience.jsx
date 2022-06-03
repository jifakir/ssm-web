import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';
import Select from '../UI/Select';

const data = {
    name: 'years_of_experience',
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



const Experience = ({ step, setStep, profile }) => {

    // const { head, tail } = profile?.years_of_experience;
    const { register, handleSubmit, control, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { years_of_experience } = data;
        if(!years_of_experience) return;
        const splitted_year = years_of_experience?.value.split('-');
        await updateTherapist({id: profile?.id, years_of_experience: {head:splitted_year[0], tail:splitted_year[1]}, registration_status: 'entered-years_of_experience' });
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    
    return (
        <>
            <form id="experience-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <h1 className="text-lg my-2 text-left">How many years of experience do you have?</h1>
                    <div className="form-control w-full max-w-xs text-left">
                        <Select register={register} control={control} errors={errors} data={data} />
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
                    form="experience-form" 
                    className={`${isLoading ? 'loading' : ''} px-8 text-2xl ${!watch().years_of_experience ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </>
    )
}

export default Experience;