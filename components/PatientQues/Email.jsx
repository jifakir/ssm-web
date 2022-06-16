import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import TextInput from '../../components/UI/TextInput';


const Email = ({ step, setStep, profile }) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [updatePatient, {data, isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { email_address } = data;
        if(!email_address) return;
        await updatePatient({id: profile?.id, email_address, registration_status: 'entered-email' });

        setStep(step + 1);
    };

    const handleBack = () => {

        setStep(step - 1);
        
    };


    return (
        <>
            <form id='email-form' onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <div className="form-control w-full max-w-xs">
                        <TextInput defaultValue={ profile?.email_address } register={register} errors={errors} data={{ pHolder: 'Email', name: 'email_address', title: 'Email', pattern: /^\S+@\S+$/i}} />
                    </div>
                </div>
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr
                    btnSecondary />
                <Button 
                    title={'Next'} 
                    form="email-form"  
                    btnQnr
                    disabled={!watch().email_address} />
            </div>
        </>
    )
}

export default Email;