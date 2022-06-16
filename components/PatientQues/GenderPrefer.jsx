import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';


const PreferGender = ({ step, setStep, profile }) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: { religion: profile?.religion }});
    const [updatePatient, {data, isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { religion } = data;
        if(!religion) return;
        await updatePatient({id: profile?.id, religion, registration_status: 'entered-email' });
        setStep(step + 1);
    };

    const handleBack = () => {

        setStep(step - 1);

    };

    return (
        <>
            <form id='perfer-gender-form' onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <h1 className="text-lg my-2 text-left">What is your religion?</h1>
                    <div className="form-control w-full max-w-xs">
                        <Radio 
                            register={register} 
                            errors={errors} 
                            data={{
                                name: 'has_gender_preference', 
                                options: [
                                    {label: 'Yes', value: true},
                                    {label: 'No', value: false}]
                                }} />
                    </div>
                    <div className={`${watch('has_gender_preference') ? 'block' : 'hidden'} w-full max-w-xs`}>
                        <Radio 
                            register={register} 
                            errors={errors} 
                            data={{
                                name: 'gender_preference', 
                                options: [
                                    {label: 'Male', value: 'male'},
                                    {label: 'Female', value: 'female'}, 
                                    {label: 'Non-binary', value: 'non_binary'}]
                                }} />
                    </div>
                </div>
            </form>
            <div className={`flex gap-5 py-5`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    className="btn-outline border-neutral px-8 text-2xl" />
                <Button 
                    title={'Next'} 
                    form="perfer-gender-form"
                    className={`${isLoading ? 'loading' : ''} px-8 text-2xl ${!watch().has_gender_preference ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </>
    )
}

export default PreferGender;