import React from 'react';
import Checkbox from '../../components/UI/Checkbox';
import { useForm } from 'react-hook-form';

import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Select from '../UI/Select';
import Button from '../UI/Button';
import Radio from '../UI/Radio';

const otherdata = {
    name: 'speak_other_languages',
    options: [
        {
            label: 'Yes',
            value: true
        },
        {
            label: 'No',
            value: false
        },
    ]
};

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
                <div className="md:flex gap-20">
                    <div className="">
                        <h1 className="text-lg my-2 text-left">Do you speak any other languages?</h1>
                        <div className="form-control w-full max-w-xs">
                            <Radio control={control} rules={{required: 'The field is required'}} data={otherdata} />
                        </div>
                    </div>
                    {
                        watch('speak_other_languages') && 
                        (
                            <Checkbox data={data} register={register} errors={errors} />
                        )
                    }
                </div>
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr
                    btnSecondary />
                <Button 
                    title={'Next'} 
                    form="language-form" 
                    btnQnr 
                    disabled={!watch('speak_other_languages')}/>
            </div>
        </>
    )
}

export default Language;