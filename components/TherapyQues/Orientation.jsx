import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import RadioInput from '../UI/Radio';
import Button from '../UI/Button';
import { useEffect } from 'react';


const Orientation = ({ step, setStep, profile}) => {

    const { register, control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {sexual_orientation: profile?.sexual_orientation}});
    
    const [updateTherapist, { isSuccess, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async ({sexual_orientation}) => {
        console.log("Orientation",sexual_orientation);
        if(!sexual_orientation) return;
        await updateTherapist({id: profile?.id, sexual_orientation, registration_status: 'entered-sexual_orientation' });
    };

    const handleBack = () => {
        setStep(step - 1);
    };


    const data = {
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

    useEffect(() => {
        if(isSuccess){
            setStep(step + 1);
        }
    },[isSuccess]);

    return (
        <>
            <form id='orientationform' onSubmit={handleSubmit(handleNext)} className="text-left text-sm">
                <h1 className="text-lg my-2 text-left">Which do you identify as?</h1>
                <RadioInput control={control} rules={{required: 'This field is required.'}} data={data} />
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