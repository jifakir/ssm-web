import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import TextInput from '../../components/UI/TextInput';


const Address = ({ step, setStep }) => {

    const { register, watch, handleSubmit, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();
    const [submitted, setSubmitted] = useState(false);
    const handleNext = async (data) => {

        const { email } = data;

        await updateTherapist({ email, registration_status: 'email' });

        // if(!isSucces){
        //     return
        // }
        setStep(step + 1);
    };

    const handleBack = () => {

        setStep(step - 1);

    };

    // useEffect(() => {
    //     if(submitted){
    //         setStep(step + 1)
    //     }
    // },[submitted]);


    return (
        <form onSubmit={handleSubmit(handleNext)} className="">
            <div className="space-y-1">
                <div className="form-control w-full max-w-xs">
                    <TextInput register={register} errors={errors} data={{type: 'text', pHolder: 'Street Address Line 1', name: 'user_address.line1', title: 'Address'}} />
                </div>
                <div className="form-control w-full max-w-xs">
                    <TextInput register={register} errors={errors} data={{type: 'text', pHolder: 'Street Address Line 2', name: 'user_address.line2' }} />
                </div>
                <div className="form-control w-full max-w-xs">
                    <TextInput register={register} errors={errors} data={{type: 'text', pHolder: 'City', name: 'user_address.city', }} />
                </div>
                <div className="form-control w-full max-w-xs relative">
                    <TextInput register={register} errors={errors} data={{type: 'text', pHolder: 'State', name: 'user_address.state', }} className="float-left w-28" />
                    <TextInput register={register} errors={errors} data={{type: 'text', pHolder: 'Zip Code', name: 'user_address.zip_code', }} className="w-48 absolute top-0 right-0" />
                </div>
            </div>
            <div className={`flex gap-5 py-5`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    className="btn-outline border-neutral px-8 text-2xl" />

                <Button 
                    title={'Next'} 
                    onClick={handleNext} 
                    className={`px-8 text-2xl ${ !watch('user_address.state') ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </form>
    )
}

export default Address;