import React from 'react';



const RelSess = ({register, errors, watch, trigger, step, setStep}) => {

    const handleNext = async () => {

        const trig = await trigger('rel_ses');
        if(!trig) return;

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };


    return (
        <div className="text-left">
            <h1 className="text-lg my-2">Do you include religion in your sessions?</h1>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" {...register('rel_ses', {required: true})} value={true} className={`radio ${errors.rel_ses ? 'radio-accent' : 'checked:bg-primary'}`} />
                    <span className="label-text pl-2">Yes</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" {...register('rel_ses', {required: true})} value={false} className={`radio ${errors.rel_ses ? 'radio-accent' : 'checked:bg-primary'}`} />
                    <span className="label-text justify-start pl-2">No</span>
                </label>
            </div>
            <div className={`flex gap-5 py-5`}>
                <button onClick={handleBack} className={`w-28 btn btn-outline btn-primary`}>
                    Back
                </button>
                <button onClick={handleNext} className={`w-28 btn text-white ${!watch().rel_ses ? 'bg-gray-400' : 'btn-primary'}`} >
                    Next
                </button>
            </div>
        </div>
    )
}

export default RelSess;