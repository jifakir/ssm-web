import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';
import Checkbox from '../UI/Checkbox';
const langData = {
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

const sessdata = {
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

    const { control, register, handleSubmit, watch, formState: { errors} } = useForm({
        defaultValues: {
            speak_other_languages: profile?.speak_other_languages,
            prefer_other_language: profile?.prefer_other_language,
            languages: profile?.languages,
        }});
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { speak_other_languages, prefer_other_language, languages } = data;
        if(speak_other_languages == null) return;
        await updatePatient({id: profile?.id, speak_other_languages, prefer_other_language, languages, registration_status: 'entered-speak_other_languages' });
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    return (
        <>
            <form id="other-lang-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <div className="">
                        <h1 className="text-lg my-2 text-left">Do you speak any other languages?</h1>
                        <div className="form-control w-full max-w-xs">
                            <Radio control={control} data={data} />
                        </div>
                    </div>
                    <div className={`text-left mt-5 ${watch('speak_other_languages') ? 'block' : 'hidden'}`}>
                        
                        <Checkbox data={langData} register={register} errors={errors} />
                        <div className="mt-5">
                            <h1 className="text-lg my-2 text-left">Would you prefer to have sessions in another language?</h1>
                            <div className="form-control w-full max-w-xs">
                                <Radio control={control} data={sessdata} />
                            </div>
                        </div>
                    </div>
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
                    form="other-lang-form" 
                    btnQnr
                    disabled={watch('speak_other_languages') == null} />
            </div>
        </>
    )
}

export default PreferOtherLang;