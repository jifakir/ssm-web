import React from 'react';
import Checkbox from '../../components/UI/Checkbox';
import { useForm } from 'react-hook-form';

import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Select from '../UI/Select';
import Button from '../UI/Button';
import Radio from '../UI/Radio';
import { useEffect } from 'react';

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
    
    const { 
        register, 
        control, 
        handleSubmit, 
        watch, 
        formState: { errors} } = useForm({
            defaultValues: { 
                languages: profile?.languages,
                speak_other_languages: profile?.speak_other_languages
             }});
    const [updateTherapist, { isSuccess, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {
        const { languages } = data;
        if(!languages) return;
        await updateTherapist({
            id: profile?.id,
            languages: languages.filter(v=> v), 
            registration_status: 'entered-language' });
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    useEffect(() => {
        if(isSuccess){
            setStep(step + 1);
        }
    },[isSuccess]);

    return (
        <>
            <form id="language-form" onSubmit={handleSubmit(handleNext)} className="text-left text-sm">
                <div className="">
                    <div className="">
                        <h1 className="text-lg my-2 text-left">Do you speak any other languages?</h1>
                        <div className="form-control w-full max-w-xs">
                            <Radio control={control} rules={{required: 'The field is required'}} data={otherdata} />
                        </div>
                    </div>
                    {
                        watch('speak_other_languages') && 
                        (
                            <Checkbox data={data} control={control} register={register} errors={errors} />
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
                    disabled={watch('speak_other_languages') ? (watch('languages') == null || watch('languages').length <= 0) : watch('languages') == null}/>
            </div>
        </>
    )
}

export default Language;