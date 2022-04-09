import React from 'react';



const Orientation = ({register, errors, watch, trigger, step, setStep}) => {


    const handleNext = async () => {

        const trig = await trigger('religion');
        if(!trig) return;

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };


    return (
        <div className="text-left text-sm">
            <h1 className="text-lg my-2">Which do you identify as?</h1>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" {...register('religion', {required: true})} value="christian" className={`radio ${errors.religion ? 'radio-accent': 'checked:bg-primary'}`} />
                    <span className="label-text pl-2">Christianity</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" {...register('religion', {required: true})} value="judaism" className={`radio ${errors.religion ? 'radio-accent': 'checked:bg-primary'}`} />
                    <span className="label-text justify-start pl-2">Judaism</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" {...register('religion', {required: true})} value="islam" className={`radio ${errors.religion ? 'radio-accent': 'checked:bg-primary'}`} />
                    <span className="label-text justify-start pl-2">Islam</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" {...register('religion', {required: true})} value="hinduism" className={`radio ${errors.religion ? 'radio-accent': 'checked:bg-primary'}`} />
                    <span className="label-text justify-start pl-2">Hinduism</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" {...register('religion', {required: true})} value="buddhism" className={`radio ${errors.religion ? 'radio-accent': 'checked:bg-primary'}`} />
                    <span className="label-text justify-start pl-2">Buddhism</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" {...register('religion', {required: true})} value="atheist" className={`radio ${errors.religion ? 'radio-accent': 'checked:bg-primary'}`} />
                    <span className="label-text justify-start pl-2">Atheist</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" {...register('religion', {required: true})} value="none" className={`radio ${errors.religion ? 'radio-accent': 'checked:bg-primary'}`} />
                    <span className="label-text justify-start pl-2">None</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" {...register('religion', {required: true})} value="other" className={`radio ${errors.religion ? 'radio-accent': 'checked:bg-primary'}`} />
                    <span className="label-text justify-start pl-2">Other</span>
                    <input type="text" placeholder='Input religious affiliataions' className="input input-sm input-bordered ml-2 focus:outline-none border" />
                </label>
            </div>

            <div className={`flex gap-5 py-5`}>
                <button onClick={handleBack} className={`btn btn-outline btn-primary`}>
                    Back
                </button>
                <button onClick={handleNext} className={`btn text-white ${!watch().religion ? 'bg-gray-400' : 'btn-primary'}`} >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Orientation;