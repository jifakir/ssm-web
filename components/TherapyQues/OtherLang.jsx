import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';
const data = {
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

const OtherLang = ({ step, setStep, profile }) => {

    const { register, control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {speak_other_languages: profile?.speak_other_languages}});
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
                        <Radio control={control} rules={{required: 'Other language is required.'}} data={data} />
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

export default OtherLang;