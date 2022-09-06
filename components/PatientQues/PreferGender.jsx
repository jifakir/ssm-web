import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';


const PreferGender = ({ step, setStep, profile }) => {

    const { 
        control, 
        handleSubmit, watch, formState: { errors} } = useForm({
            defaultValues: { 
                has_gender_preference: profile?.has_gender_preference,
                gender_preference: profile?.gender_preference
            }});
    const [updatePatient, {data, isSuccess, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { has_gender_preference, gender_preference } = data;
        let form = { has_gender_preference };
        if(gender_preference) form = { has_gender_preference, gender_preference };
        await updatePatient({id: profile?.id, ...form, registration_status: 'entered-gender preference' });
        setStep(step + 1);
    };

    const handleBack = () => {

        setStep(step - 1);

    };
    useEffect(() => {
        if(isSuccess){
            setStep(step + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isSuccess])
    return (
        <>
            <form id='perfer-gender-form' onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <div className="">
                        <h1 className="text-lg my-2 text-left">Do you have a gender preference for your provider?</h1>
                        <div className="form-control w-full max-w-xs">
                            <Radio 
                                control={control}
                                rules={{
                                    required: 'Gender is required.'
                                }} 
                                data={{
                                    name: 'has_gender_preference', 
                                    options: [
                                        {label: 'Yes', value: true},
                                        {label: 'No', value: false}]
                                    }} />
                        </div>
                    </div>
                    <div className={`mt-5 ${watch('has_gender_preference') ? 'block' : 'hidden'}`}>
                        <h1 className={`text-lg my-2 text-left `}>What is your gender preference?</h1>
                        <div className={` w-full max-w-xs`}>
                            <Radio 
                                control={control}
                                rules={{
                                    required: 'Gender preference is requried.'
                                }}
                                data={{
                                    name: 'gender_preference', 
                                    options: [
                                        {label: 'Male', value: 'male'},
                                        {label: 'Female', value: 'female'}, 
                                        {label: 'Non-binary', value: 'non_binary'}]
                                    }} />
                        </div>
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
                    form="perfer-gender-form"
                    btnQnr
                    disabled={watch('has_gender_preference') ? watch('gender_preference') == null : watch('has_gender_preference') == null} />
            </div>
        </>
    )
}

export default PreferGender;