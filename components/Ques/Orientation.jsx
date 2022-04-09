import React from 'react';



const Orientation = ({register, errors, watch, trigger, step, setStep}) => {

    const handleNext = async () => {

        const trig = await trigger('orientation');
        if(!trig) return;

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };

    return (
        <div className="text-left text-sm">
            <h1 className="text-lg mt-2">Which do you identify as?</h1>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input {...register('orientation', {required: true})} value="straight" type="radio"  className={`radio ${errors.orientation ? 'radio-accent' : 'checked:radio-primary'}`} />
                    <span className="label-text pl-5">Straight</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input {...register('orientation', {required: true})} value="lesbian" type="radio"  className={`radio ${errors.orientation ? 'radio-accent' : 'checked:radio-primary'}`} />
                    <span className="label-text justify-start pl-5">Lesbian</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input {...register('orientation', {required: true})} value="gay" type="radio"  className={`radio ${errors.orientation ? 'radio-accent' : 'checked:radio-primary'}`} />
                    <span className="label-text justify-start pl-5">Gay</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input {...register('orientation', {required: true})} value="bi_sexual" type="radio"  className={`radio ${errors.orientation ? 'radio-accent' : 'checked:radio-primary'}`} />
                    <span className="label-text justify-start pl-5">Bi-Sexual</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input {...register('orientation', {required: true})} value="assexual" type="radio"  className={`radio ${errors.orientation ? 'radio-accent' : 'checked:radio-primary'}`} />
                    <span className="label-text justify-start pl-5">Assexual</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input {...register('orientation', {required: true})} value="pansexual" type="radio"  className={`radio ${errors.orientation ? 'radio-accent' : 'checked:radio-primary'}`} />
                    <span className="label-text justify-start pl-5">Pansexual</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input {...register('orientation', {required: true})} value="prefer_not_to_answer" type="radio"  className={`radio ${errors.orientation ? 'radio-accent' : 'checked:radio-primary'}`} />
                    <span className="label-text justify-start pl-5">Prefer not to answer</span>
                </label>
            </div>
            <div className={`flex gap-5 py-5`}>
                <button onClick={handleBack} className={`btn btn-outline btn-primary`}>
                    Back
                </button>
                <button onClick={handleNext} className={`btn text-white ${!watch().orientation ? 'btn-neutral' : 'btn-primary'}`} >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Orientation;