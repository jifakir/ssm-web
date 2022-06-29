import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Select from '../../components/UI/Select';
import Checkbox from '../UI/Checkbox';


const Specialization = ({ step, setStep, profile }) => {

    const { register, handleSubmit, control, watch, formState: { errors} } = useForm({
        defaultValues: {therapy_specializations: profile?.therapy_specializations}
    });
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { therapy_specializations } = data;
        if(therapy_specializations == null) return;
        await updateTherapist({ id: profile?.id, therapy_specializations, registration_status: 'entered-specialization' });
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    const data = {
        title: 'Do you specialize in any type of therapy? (Select all that apply)',
        name: 'therapy_specializations',
        options: [
            {
                label: 'Psychodynamic therapy',
                value: 'psychodynamictherapy'
            },
            {
                label: 'Cognitive behavioral therapy',
                value: 'Cognitive behavioral therapy'
            },
            {
                label: 'Behavioral therapy',
                value: 'Behavioral therapy'
            },
            {
                label: 'Humanistic therapy',
                value: 'Humanistic therapy'
            },
            {
                label: 'Substance abuse counseling',
                value: 'Substance abuse counseling'
            },
            {
                label: 'Emotion-Focused Therapy (EFT)',
                value: 'Not applicable'
            },
            {
                label: 'Prefer not to say',
                value: 'not_preferred'
            },
        ]
    };
    return (
        <>
            <form id="specialization-form" onSubmit={handleSubmit(handleNext)} className="">
                
                <div className="w-full text-left">
                    <Checkbox control={control} register={register} errors={errors} data={data} />
                </div>
                    
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr
                    btnSecondary/>
                <Button 
                    title={'Next'} 
                    form="specialization-form" 
                    btnQnr
                    disabled={watch('therapy_specializations') == null || watch('therapy_specializations').length === 0 } />
            </div>
        </>
    )
}

export default Specialization;