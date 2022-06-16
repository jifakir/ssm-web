import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';

const data = {
    name: 'prefer_other_language',
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

    const { register, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {prefer_other_language: profile?.prefer_other_language}});
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { prefer_other_language } = data;
        if(!prefer_other_language) return;
        await updatePatient({id: profile?.id, prefer_other_language, registration_status: 'entered-prefer_other_language' });

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
                    className={`${isLoading ? 'loading' : ''} px-8 text-2xl  ${!watch().prefer_other_language ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </>
    )
}

export default PreferOtherLang;