import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import TextInput from '../../components/UI/TextInput';
import { BiLoaderAlt } from 'react-icons/bi';

const Email = ({ step, setStep, profile }) => {

    const { control, handleSubmit, watch } = useForm({defaultValues: { email_address: profile?.email_address }});
    const [updateTherapist, {data, isSuccess, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { email_address } = data;
        if(!email_address) return;
        await updateTherapist({id: profile?.id, email_address, registration_status: 'entered-email' });

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    useEffect(() => {
        if(isSuccess){
            setStep(step + 1);
        }
    },[isSuccess]);

    return (
        <>
            <form id='email-form' onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <div className="form-control w-full max-w-xs">
                        <TextInput 
                            control={control}
                            name={'email_address'}
                            pHolder={'Email'}
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Enter a valid email'
                                }
                            }}
                             />
                    </div>
                </div>
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Back'}
                    btnQnr
                    btnSecondary
                    onClick={handleBack} />
                <Button 
                    title={'Next'}
                    btnQnr
                    form="email-form"
                    disabled={!watch('email_address')} >
                    {
                            isLoading ? <BiLoaderAlt className="animate-spin text-2xl mr-2" /> : ''
                        }
                </Button>
            </div>
        </>
    )
}

export default Email;