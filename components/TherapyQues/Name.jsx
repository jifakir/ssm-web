import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation } from '../../store/api/ssmApi';
import TextInput from '../../components/UI/TextInput';
import Button from '../UI/Button';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';


const Name = ({ step, setStep, data:profile }) => {

    const { control, watch, handleSubmit } = useForm({
        defaultValues: {
            full_name: profile?.full_name || ''
        }
    });
    const [registerTherapist, {
        data , isSuccess, isLoading, isError, error 
    }] = useRegisterTherapistMutation({ full_name: profile?.full_name });

    const handleNext = async (data) => {
        await registerTherapist({ ...data, registration_status: 'entered-fullname' });
        
    };

    useEffect(() => {
        if(isError){
            if(error.status === 409){
                setStep(step + 1);
            }
        }
    },[isError]);

    useEffect(() => {
        if(isSuccess){
            setStep(step + 1);
        }
    },[isSuccess]);


    return (
        <>
            <form id='name-form' onSubmit={handleSubmit(handleNext)}>
                <div className="form-control w-full md:max-w-xs">
                    <TextInput 
                        control={control}
                        name={'full_name'}
                        pHolder={'Full Name'}
                        title={'Name'}
                        rules={{
                            required: 'Name is required'
                        }} />
                </div>
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    form="name-form"
                    title={'Next'} 
                    btnQnr
                    disabled={!watch('full_name')}>
                        {
                            isLoading ? <BiLoaderAlt className="animate-spin text-2xl mr-2" /> : ''
                        }
                </Button>
            </div>
        </>
    )
}

export default Name;