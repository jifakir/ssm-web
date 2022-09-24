import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import RadioInput from '../UI/Radio';
import Button from '../UI/Button';
import { useEffect } from 'react';


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

const preferdata = {
    name: 'has_sexual_preference',
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




const Orientation = ({ step, setStep, profile}) => {

    const { 
        control, handleSubmit, 
        watch, formState: { errors} } = useForm({
            defaultValues: {
                sexual_orientation: profile?.sexual_orientation,
                has_sexual_preference: profile?.has_sexual_preference}});
    
    const [updatePatient, { isSuccess, isLoading, isError, error }] = useUpdatePatientMutation();
    
    const handleNext = async ({sexual_orientation, has_sexual_preference}) => {
        let form = { sexual_orientation };
        if(sexual_orientation) form = { sexual_orientation, has_sexual_preference };
        await updatePatient({
            id: profile?.id, ...form, registration_status: 'entered-sexual_orientation' });
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    useEffect(()=> {
        if(isSuccess){
            setStep(step + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isSuccess])
    
    return (
        <>
            <form id='orientationform' onSubmit={handleSubmit(handleNext)} className="text-left text-sm">
                <div className="w-full">
                <h1 className='text-lg my-2 text-left'>Which do you identify as?</h1>
                <RadioInput 
                    control={control}
                    rules={{
                        required: 'Orientation is required.'
                    }} 
                    data={data} />
                    <p className="text-accent text-xs font-bold py-1 text-left">{isError && error?.message || error?.data?.message}</p>
                </div>
                <div className={`w-full mt-5 ${watch('sexual_orientation') === 'straight' || watch('sexual_orientation') == null ? 'hidden' : 'block'}`}>
                    <h1 className="text-lg my-2 text-left">Are you interested in a provider that specializes in LGBTQ+ issues?</h1>
                    <div className="form-control w-full max-w-xs">
                        <RadioInput 
                            control={control} 
                            data={preferdata} />
                    </div>
                </div>
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr
                    btnSecondary
                     />
                <Button
                    title={'Next'} 
                    form="orientationform" 
                    btnQnr
                    disabled={watch('sexual_orientation') === 'straight' ? watch('sexual_orientation') == null : watch('has_sexual_preference') == null} />
            </div>
        </>
    )
}

export default Orientation;