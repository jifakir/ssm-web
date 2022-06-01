import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation } from '../../store/api/ssmApi';
import TextInput from '../../components/UI/TextInput';
import Button from '../UI/Button';
import { useSelector } from 'react-redux';


const Name = ({ step, setStep, data:profile }) => {

    const { token } = useSelector(state => state.auth.userDetails );
    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [registerTherapist, {data , isSuccess, isLoading, isError, error }] = useRegisterTherapistMutation();

    const handleNext = async (data) => {
        console.log("Triggered!")
        const { full_name } = data;
        if(!full_name) return;
        await registerTherapist({ full_name, registration_status: 'entered-fullname' });
        setStep(step + 1);
    };

    if(isSuccess){
        console.log(data);
    }

    console.log(profile);

    return (
        <form onSubmit={handleSubmit(handleNext)}>
            <div className="form-control w-full max-w-xs">
                <TextInput register={register} value={profile.full_name} errors={errors} data={{type: 'text', pHolder: 'Full Name', name: 'full_name', title: 'Name'}} />
            </div>
            <div className={`flex gap-5 py-5`}>
                <Button 
                    title={'Next'} 
                    type="submit" 
                    className={`${isLoading ? 'loading' : ''} px-8 text-2xl ${!watch().full_name ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </form>
    )
}

export default Name;