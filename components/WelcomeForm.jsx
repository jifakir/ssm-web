import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from './UI/TextInput';

const WelcomeForm = ({ status, message, onValidated }) => {

    const { control, reset, handleSubmit} = useForm({
        defaultValues: {
            email: ""
        }
    });

    const submitHandler = async ({email}) => {
        await onValidated({ EMAIL: email });
    };

    useEffect(() => {
        if(status === 'success'){
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[status]);
    
    return (
        <form onSubmit={handleSubmit(submitHandler)} className="mt-3 mr-5">
            <div className="flex flex-col md:flex-row items-center gap-2">
                <Input control={control}
                    name={'email'}
                    pHolder={'Email'}
                    className="text-base mb-2 md:mb-0"
                    rules={{
                        required: 'Email is required.',
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Enter a valid email address'
                        }
                    }} />
                <button
                    type={'submit'} 
                    className={`
                        text-2xl
                        leading-7
                        tracking-[0.055em]
                        bg-primary
                        uppercase
                        px-2
                        py-[5px]
                        hover:bg-primary/90 
                        active:bg-accent-focus
                        rounded
                        gap-2
                        font-semibold
                        disabled:bg-[#C0C0C0]
                        disabled:text-[#3E3643]
                        disabled:cursor-not-allowed
                        border-[3px] 
                        border-primary 
                        text-white 
                        hover:border-primary/10
                        min-w-[156px]`}
                        >
                    <div className="flex justify-center items-center">
                        SIGN UP
                    </div>
                </button>
            </div>
            <p className="text-xs text-[#191847] pt-1">{message}</p>
        </form>
    )
}

export default WelcomeForm;