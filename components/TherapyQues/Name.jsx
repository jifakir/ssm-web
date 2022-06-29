import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation } from '../../store/api/ssmApi';
import TextInput from '../../components/UI/TextInput';
import Button from '../UI/Button';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';


const Name = ({ step, setStep, data:profile }) => {

    const { token } = useSelector(state => state.auth.userDetails );
    const { control, watch, handleSubmit } = useForm({
        defaultValues: {
            full_name: profile?.full_name
        }
    });
    const [registerTherapist, {data , isSuccess, isLoading, isError, error }] = useRegisterTherapistMutation({ full_name: profile?.full_name });

    const handleNext = async (data) => {
        console.log("Triggered!")
        const { full_name } = data;
        if(!full_name) return;
        await registerTherapist({ full_name, registration_status: 'entered-fullname' });
        
    };

    useEffect(() => {
        if(isSuccess){
            setStep(step + 1);
        }
        if(isError){
            if(error.status === 409){
                setStep(step + 1);
            }
        }
    },[isSuccess, isError]);

    return (
        <form onSubmit={handleSubmit(handleNext)}>
            <div className="form-control w-full max-w-xs">
                <TextInput 
                    control={control}
                    name={'full_name'}
                    pHolder={'Full Name'}
                    title={'Name'}
                    rules={{
                        required: 'Name is required'
                    }} />
            </div>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Next'} 
                    btnQnr
                    disabled={!watch('full_name')}>
                        {
                            isLoading ? <BiLoaderAlt className="animate-spin text-2xl mr-2" /> : ''
                        }
                </Button>
            </div>
        </form>
    )
}

export default Name;