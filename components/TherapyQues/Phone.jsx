import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import TextInput from '../../components/UI/TextInput';


const Phone = ({ step, setStep }) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { phone } = data;

        await updateTherapist({ phone, registration_status: 'email' });
        console.log("Triggered")

        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
        <form onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
                <div className="form-control w-full max-w-xs">
                    <TextInput register={register} errors={errors} data={{type: 'text', pHolder: '000-000-0000', name: 'phone', title: 'Phone Number'}} />
                </div>
            </div>
            <div className={`flex gap-5 py-5`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    className="btn-outline border-neutral px-8 text-2xl" />
                <Button 
                    title={'Next'}
                    type="submit"
                    onClick={handleNext} 
                    className={`px-8 text-2xl ${!watch().phone ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </form>
    )
}


export default Phone;