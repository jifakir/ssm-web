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

        const { specialization } = data;

        await updateTherapist({ specialization, registration_status: 'email' });

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
        <form onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
            <div className="form-control w-full max-w-xs">
                <Checkbox control={control} register={register} errors={errors} data={data} />
            </div>
            </div>
            <div className={`flex gap-5 py-5`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    className="btn-outline border-neutral px-8 text-2xl" />
                <Button 
                    title={'Next'} 
                    type="submit" 
                    className={`px-8 text-2xl ${!watch().specialization ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </form>
    )
}

export default Specialization;