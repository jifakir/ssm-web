import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import TextInput from '../../components/UI/TextInput';




const SessionFee = ({ step, setStep }) => {


    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { phone } = data;

        await updateTherapist({ email, registration_status: 'email' });

        // if(!isSucces){
        //     return
        // }

        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
        <form onSubmit={handleSubmit(handleNext)} className="">
            <div className="form-control w-full max-w-xs">
            <div className="form-control w-full max-w-xs">
                <TextInput register={register} errors={errors} data={{type: 'text', pHolder: '500', name: 'session_fee', title: 'How much session fee do you take?'}} />
            </div>
            </div>
            <div className={`flex gap-5 py-5`}>
                <Button title={'Back'} />
                <Button title={'Next'} onClick={handleNext} className="btn-base text-black" />
            </div>
        </form>
    )
}


export default SessionFee;