import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';
import Checkbox from '../UI/Checkbox';
const raceData = {
    title: 'What other language(s) do you speak?',
    name: 'languages',
    required: true,
    options: [
        {
            label: 'Black/African descent',
            value: 'black'
        },
        {
            label: 'Asian',
            value: 'asian'
        },
        {
            label: 'Hispanic',
            value: 'hispanic'
        },
        {
            label: 'White',
            value: 'white'
        },
        {
            label: 'Other',
            value: 'other'
        },
    ]
};
const data = {
    name: 'has_race_preference',
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

const PreferOtherLang = ({ step, setStep, profile }) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {speak_other_languages: profile?.speak_other_languages}});
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { speak_other_languages } = data;
        if(!speak_other_languages) return;
        await updateTherapist({id: profile?.id, speak_other_languages, registration_status: 'entered-speak_other_languages' });

        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    return (
        <>
            <form id="other-lang-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <h1 className="text-lg my-2 text-left">Do you speak any other languages?</h1>
                    <div className="form-control w-full max-w-xs">
                        <Radio register={register} errors={errors} data={data} />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <Radio data={raceData} register={register} errors={errors} />
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
                    form="other-lang-form" 
                    className={`${isLoading ? 'loading' : ''} px-8 text-2xl  ${!watch().speak_other_languages ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </>
    )
}

export default PreferOtherLang;