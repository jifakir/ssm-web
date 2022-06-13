import React from 'react';
import Checkbox from '../../components/UI/Checkbox';
import { useForm } from 'react-hook-form';

import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Select from '../UI/Select';
import Button from '../UI/Button';


const data = {
        title: 'What other language(s) do you speak?',
        name: 'languages',
        required: true,
        options: [
            {
                label: 'Spanish',
                value: 'spanish'
            },
            {
                label: 'French',
                value: 'french'
            },
            {
                label: 'Kreyol',
                value: 'kreyol'
            },
            {
                label: 'Yoruba',
                value: 'yoruba'
            },
            {
                label: 'Igbo',
                value: 'igbo'
            },
            {
                label: 'Other',
                value: 'other'
            },
        ]
    };

const Language = ({ step, setStep, profile }) => {
    
    const { register, control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: { languages: profile?.languages }});
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {
        const { languages } = data;
        if(!languages) return;
        await updateTherapist({id: profile?.id, ...data, registration_status: 'entered-language' });
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    return (
        <>
            <form id="language-form" onSubmit={handleSubmit(handleNext)} className="text-left text-sm">
                <Checkbox data={data} register={register} errors={errors} />
            </form>
            <div className={`flex gap-5 py-5`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    className="btn-outline border-neutral px-8 text-2xl" />
                <Button 
                    title={'Next'} 
                    form="language-form" 
                    className={`${isLoading ? 'loading' : ''} px-8 text-2xl ${!watch().languages ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </>
    )
}

export default Language;