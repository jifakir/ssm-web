import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';


const PreferGender = ({ step, setStep, profile }) => {

    const { 
        control, 
        handleSubmit, watch, formState: { errors} } = useForm({
            defaultValues: { 
                has_gender_preference: profile?.has_gender_preference || '',
                gender_preference: profile?.gender_preference || ''
            }});
    const [updatePatient, {data, isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { has_gender_preference, gender_preference } = data;
        if(has_gender_preference == null) return;
        await updatePatient({id: profile?.id, has_gender_preference, gender_preference, registration_status: 'entered-gender preference' });
        setStep(step + 1);
    };

    const handleBack = () => {

        setStep(step - 1);

    };

    return (
        <>
            <form id='perfer-gender-form' onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full md:flex gap-10">
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
                    <div className={`${watch('has_gender_preference') ? 'block' : 'hidden'}`}>
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