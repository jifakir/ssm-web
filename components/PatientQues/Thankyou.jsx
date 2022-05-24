import React from 'react';
import { useForm } from 'react-hook-form';

const Questionnaire = () => {


    const {register, trigger, formState: { errors }, watch, handleSubmit} = useForm({mode: 'all'});

    const handleNext = async (data) => {

        const { full_name } = data;

        await registerTherapist({ full_name, registration_status: 'entered-fullname' });

        // if(!isSuccess){
        //     return
        // }

        setStep(step + 1);

    };

    return (
        <div className="px-10 pt-5">
            <div className="">
                <h1 className="text-7xl">Thank You!</h1>
                <p className="text-2xl mt-5">
                    Thank you for completing our match survey! Please share your email address with us, and we will
                    send over your top  matches.
                </p>
            </div>
            <form onSubmit={handleSubmit(handleNext)} className="">
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text text-lg">E-Mail Address</span>
                </label>
                <input {...register('email',{required: true, pattern: /^\S+@\S+$/i})} type="email" placeholder="startsayingmore@gmail.com" className={`input input-bordered w-full max-w-xs ${errors.email && 'input-error'}`} />
                {/* <p className="text-accent text-xs font-bold py-1 text-left">{isError && error?.message || error?.data?.message}</p> */}
            </div>
            <div className={`flex gap-5 py-5`}>
                <button onClick={handleNext} className={`btn text-white ${!watch().email ? 'bg-gray-400' : 'btn-primary'}`} >
                    Submit
                </button>
            </div>
        </form>
        </div>
    )
}

export default Questionnaire;