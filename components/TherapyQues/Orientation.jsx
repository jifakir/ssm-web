import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import RadioInput from '../UI/Radio';
import Button from '../UI/Button';


const Orientation = ({ step, setStep, profile}) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {sexual_orientation: profile?.sexual_orientation}});
    
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async ({sexual_orientation}) => {
        console.log("Orientation",sexual_orientation);
        if(!sexual_orientation) return;
        await updateTherapist({id: profile?.id, sexual_orientation, registration_status: 'entered-sexual_orientation' });
        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };


    const data = {
        title: 'Which do you identify as?',
        name: 'sexual_orientation',
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
        <>
            <form id='orientationform' onSubmit={handleSubmit(handleNext)} className="text-left text-sm">
                <RadioInput register={register} errors={errors} data={data} />
                <p className="text-accent text-xs font-bold py-1 text-left">{isError && error?.message || error?.data?.message}</p>
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr 
                    btnSecondary />
                <Button
                    title={'Next'} 
                    form="orientationform"
                    btnQnr
                    disabled={!watch('sexual_orientation')}  />
                
            </div>
        </>
    )
}

export default Orientation;