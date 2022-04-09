import React from 'react';



const Name = ({register, errors, watch, trigger, step, setStep}) => {

    const handleNext = async () => {

        const trig = await trigger('name');
        if(!trig) return;

        setStep(step + 1);

    };

    const handleBack = () => {
        if(step === 1) return;
        setStep(step - 1);
    };

    console.log(watch().name);

    return (
        <>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text text-lg">What is your name?</span>
                </label>
                <input {...register('name',{required: true})} type="text" placeholder="Full Name" className={`input input-bordered w-full max-w-xs ${errors.name && 'input-error'}`} />
            </div>
            <div className={`flex gap-5 py-5`}>
                <button onClick={handleBack} className={`btn btn-outline btn-primary ${step >= 3 ? 'block' : 'hidden'}`}>
                    Back
                </button>
                <button onClick={handleNext} className={`btn text-white ${!watch().name ? 'bg-gray-400' : 'btn-primary'}`} >
                    Next
                </button>
            </div>
        </>
    )
}

export default Name;