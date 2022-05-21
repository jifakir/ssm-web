import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import RadioInput from '../UI/Radio';



const Orientation = ({ step, setStep}) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {


        await updateTherapist({ ...data, registration_status: 'entered-orientaton' });

        // if(!isSucces){
        //     return
        // }

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };


    const data = {
        title: 'Which do you identify as?',
        name: 'orientation',
        required: true,
        options: [
            {
                label: 'Straight',
                value: 'straight'
            },
            {
                label: 'Lesbian',
                value: 'lesbian'
            },
            {
                label: 'Gay',
                value: 'gay'
            },
            {
                label: 'Bi-Sexual',
                value: 'Assexual'
            },
            {
                label: 'Pansexual',
                value: 'pansexual'
            },
            {
                label: 'Prefer not to answer',
                value: 'not_prefer'
            },
        ]
    };

    return (
        <form onSubmit={handleSubmit(handleNext)} className="text-left text-sm">
            <RadioInput register={register} errors={errors} data={data} />
            <p className="text-accent text-xs font-bold py-1 text-left">{isError && error?.message || error?.data?.message}</p>
            <div className={`flex gap-5 py-5`}>
                <button onClick={handleBack} className={`btn btn-outline btn-primary`}>
                    Back
                </button>
                <button type='submit' onClick={handleNext} className={`btn text-white ${!watch().orientation ? 'btn-neutral' : 'btn-primary'}`} >
                    Next
                </button>
            </div>
        </form>
    )
}

export default Orientation;