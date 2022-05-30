import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import TextInput from '../../components/UI/TextInput';


const Email = ({ step, setStep }) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {
        console.log("Triggered!")
        const { email } = data;

        // await updateTherapist({ email, registration_status: 'email' });

        setStep(step + 1);
    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
        <form onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
                <div className="form-control w-full max-w-xs">
                    <TextInput register={register} errors={errors} data={{ pHolder: 'Email', name: 'email', title: 'Email'}} />
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
                    className={`px-8 text-2xl ${!watch().email ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </form>
    )
}

export default Email;