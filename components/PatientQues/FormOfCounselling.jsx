import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';
import Checkbox from '../UI/Checkbox';
import { useEffect } from 'react';

const langData = {
    title: 'What form of counseling are you interested in?',
    name: 'counseling_areas',
    required: true,
    options: [
        {
            label: 'Psychodynamic therapy',
            value: 'psychodynamic'
        },
        {
            label: 'Cognitive behavioral therapy',
            value: 'congnitive'
        },
        {
            label: 'Behavioral therapy',
            value: 'behavioral'
        },
        {
            label: 'Humanistic therapy',
            value: 'humanistic'
        },
        {
            label: 'Substance abuse counseling',
            value: 'substance'
        },
        {
            label: 'Emotion-Focused Therapy (EFT)',
            value: 'emotion_f_t'
        },
        {
            label: 'Not Applicable',
            value: 'not_applicable'
        },
        {
            label: 'Other',
            value: 'other'
        },
    ]
};

const data = {
    name: 'specific_form',
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

const FormOfCounselling = ({ step, setStep, profile }) => {

    const { control, register, handleSubmit, watch, formState: { errors} } = useForm({
        defaultValues: {
            counseling_areas: profile?.counseling_areas,
            specific_form: profile?.specific_form,
        }});
    const [updatePatient, { isSuccess, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { specific_form, counseling_areas } = data;
        let form = {specific_form};
        if(specific_form) form = { counseling_areas };
        await updatePatient({id: profile?.id, ...form, registration_status: 'entered-speak_other_languages' });
    };

    const handleBack = () => {

        setStep(step - 1);

    };

    useEffect(() => {

        if(isSuccess){
            setStep(step + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isSuccess]);

    return (
        <>
            <form id="form-lang-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <div className="">
                        <h1 className="text-lg my-2 text-left">Are you interested in any specific form of counseling?</h1>
                        <div className="form-control w-full max-w-xs">
                            <Radio control={control} data={data} />
                        </div>
                    </div>
                    <div className={`text-left mt-5 ${watch('specific_form') ? 'block' : 'hidden'}`}>
                        
                        <Checkbox control={control} data={langData} register={register} errors={errors} />
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
                    form="form-lang-form" 
                    btnQnr
                    disabled={watch('specific_form') == null} />
            </div>
        </>
    )
}

export default FormOfCounselling;