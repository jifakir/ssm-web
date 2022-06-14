import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Select from '../../components/UI/Select';
import Checkbox from '../UI/Checkbox';


const Specialization = ({ step, setStep, profile }) => {

    const { register, handleSubmit, control, watch, formState: { errors} } = useForm({defaultValues: {specialization: profile?.specialization}});
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { specialization } = data;

        await updateTherapist({ id: profile?.id, specialization, registration_status: 'entered-specialization' });
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    const data = {
        title: 'Do you specialize in any type of therapy? (Select all that apply)',
        name: 'specialization',
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
            <div className={`flex gap-5 py-5`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr
                    btnSecondary/>
                <Button 
                    title={'Next'} 
                    form="specialization-form" 
                    btnQnr
                    disabled={!watch('specialization')} />
            </div>
        </>
    )
}

export default Specialization;