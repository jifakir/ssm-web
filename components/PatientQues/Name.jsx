import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterPatientMutation } from '../../store/api/ssmApi';
import TextInput from '../../components/UI/TextInput';
import Button from '../UI/Button';
import { useSelector } from 'react-redux';


const Name = ({ step, setStep, data:profile }) => {

    const { token } = useSelector(state => state.auth.userDetails );
    const { control, handleSubmit, watch, formState: { errors} } = useForm();
    const [registerTherapist, {data , isSuccess, isLoading, isError, error }] = useRegisterPatientMutation();

    const handleNext = async (data) => {
        console.log("Triggered!")
        const { full_name } = data;
        if(!full_name) return;
        await registerTherapist({ full_name, registration_status: 'entered-fullname' });
        setStep(step + 1);
    };

    return (
        <form id='form-name' onSubmit={handleSubmit(handleNext)}>
            <div className="form-control w-full max-w-xs">
                <TextInput 
                    control={control}
                    name={'full_name'}
                    pHolder={'Full Name'}
                    title={'Name'}
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
                    disabled={!watch().full_name} />
            </div>
        </form>
    )
}

export default Name;