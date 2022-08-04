import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';
import { session_type } from '../data';

const SessionFee = ({ step, setStep, profile }) => {


    const { register, handleSubmit, control, watch, formState: { errors} } = useForm({defaultValues: { session_type: profile?.session_type }})
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        await updatePatient({ 
            id: profile?.id, 
            ...data, 
            registration_status: 'entered-session_type' });
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
        <>
            <form id="session_type-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="form-control w-full">
                    <h1 className="text-lg my-2 text-left">Do you prefer virtual or in-person sessions?</h1>
                    <div className="form-control w-full max-w-xs">
                        <Radio 
                            control={control} 
                            register={register} 
                            errors={errors} 
                            data={session_type} />
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
                    form="session_type-form" 
                    className={`${isLoading ? 'loading' : ''} px-8 text-2xl ${!watch().session_type ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </>
    )
}


export default SessionFee;