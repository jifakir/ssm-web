import React from 'react';



const SpritPerson = ({register, errors, watch, trigger, step, setStep}) => {


    const handleNext = async () => {

        const trig = await trigger('spiritual_person');
        console.log("Sprit Person: ", trig);
        console.log("Watch Sprit: ", watch('spiritual_person'))
        if(!trig) return;

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };


    return (
        <div className="text-left">
            <h1 className="text-lg my-2">Do you consider yourself a spiritual person?</h1>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" {...register('spiritual_person', {required: true})} value={'yes'} className={`radio ${errors.spiritual_person ? 'radio-accent' : 'checked:radio-primary'}`} />
                    <span className="label-text pl-2">Yes</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" {...register('spiritual_person', {required: true})} value={'no'} className={`radio ${errors.spiritual_person ? 'radio-accent' : 'checked:radio-primary'}`} />
                    <span className="label-text justify-start pl-2">No</span>
                </label>
            </div>
            <div className={`flex gap-5 py-5`}>
                <button onClick={handleBack} className={`w-28 btn btn-outline btn-primary`}>
                    Back
                </button>
                <button onClick={handleNext} className={`w-28 btn text-white ${!watch().spiritual_person ? 'bg-gray-400' : 'btn-primary'}`} >
                    Next
                </button>
            </div>
        </div>
    )
}

export default SpritPerson;