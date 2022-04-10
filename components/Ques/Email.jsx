import React from 'react';



const Email = ({register, errors, watch, trigger, step, setStep}) => {

    const handleNext = async () => {

        const trig = await trigger('email');
        if(!trig) return;

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };


    return (
        <div className="">
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text text-lg">E-Mail Address</span>
                </label>
                <input {...register('email',{required: true, pattern: /^\S+@\S+$/i})} type="email" placeholder="startsayingmore@gmail.com" className={`input input-bordered w-full max-w-xs ${errors.email && 'input-error'}`} />
            </div>
            <div className={`flex gap-5 py-5`}>
                <button onClick={handleBack} className={`w-28 btn btn-outline btn-primary`}>
                    Back
                </button>
                <button onClick={handleNext} className={`w-28 btn text-white ${!watch().email ? 'bg-gray-400' : 'btn-primary'}`} >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Email;