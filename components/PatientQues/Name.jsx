import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterPatientMutation } from '../../store/api/ssmApi';
import TextInput from '../../components/UI/TextInput';
import Button from '../UI/Button';
import { useSelector } from 'react-redux';


const Name = ({ step, setStep, profile }) => {

    const { control, handleSubmit, watch, formState: { errors} } = useForm({
        defaultValues: {
            full_name: profile?.full_name || ''
        }
    });
    const [registerTherapist, {data , isSuccess, isLoading, isError, error }] = useRegisterPatientMutation();

    const handleNext = async (data) => {
        const { full_name } = data;
        if(!full_name) return;
        await registerTherapist({ full_name, registration_status: 'entered-fullname' });
        setStep(step + 1);
    };

    return (
        <form id='form-name' onSubmit={handleSubmit(handleNext)}>
            <div className="form-control w-full sm:max-w-xs">
                <TextInput 
                    control={control}
                    name={'full_name'}
                    pHolder={'Full Name'}
                    title={'What is your name?'}
                    rules={{
                        required: true
                    }} 
                     />
            </div>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Next'}
                    btnQnr
                    form="form-name"
                    disabled={watch().full_name == null} />
            </div>
        </form>
    )
}

export default Name;