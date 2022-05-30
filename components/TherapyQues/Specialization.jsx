import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Select from '../../components/UI/Select';
import Checkbox from '../UI/Checkbox';


const Specialization = ({ step, setStep }) => {

    const { register, handleSubmit, control, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { orientation } = data;

        await updateTherapist({ orientation, registration_status: 'email' });

        // if(!isSucces){
        //     return
        // }

        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    const data = {
        title: 'Do you specialize in any type of therapy? (Select all that apply)',
        name: 'sexual_orientation',
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
        <form onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
            <div className="form-control w-full max-w-xs">
                <Checkbox control={control} register={register} errors={errors} data={data} />
            </div>
            </div>
            <div className={`flex gap-5 py-5`}>
                <Button title={'Back'} />
                <Button title={'Next'} className="btn-base text-black" />
            </div>
        </form>
    )
}

export default Specialization;