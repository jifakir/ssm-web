import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import TextInput from '../../components/UI/TextInput';




const SessionFee = ({ step, setStep, profile }) => {


    const { register, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: { session_fee: profile?.session_fee }})
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { session_fee } = data;
        await updateTherapist({ id: profile?.id, session_fee, registration_status: 'entered-session_fee' });
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
        <>
            <form id="session_fee-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="form-control w-full max-w-xs">
                    <div className="form-control w-full max-w-xs">
                        <TextInput register={register} errors={errors} data={{type: 'text', pHolder: '500', name: 'session_fee', title: 'How much session fee do you take?'}} />
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
                    form="session_fee-form" 
                    className={`${isLoading ? 'loading' : ''} px-8 text-2xl ${!watch().session_fee ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </>
    )
}


export default SessionFee;