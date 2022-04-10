import React from 'react';



const Language = ({register, errors, watch, trigger, step, setStep}) => {
    
    const handleNext = async () => {

        const trig = await trigger('language');
        
        console.log("Trig from Language", watch().language);

        if(!trig) return;

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };


    return (
        <div className="text-left text-sm">
            <h1 className="my-2 text-lg">Select all languages that apply</h1>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input {...register('language', {required: true})} value="spanish" type="checkbox" className={`checkbox checked:checkbox-primary ${errors.language && 'checkbox-accent'}`} />
                    <span className="label-text pl-2">Spanish</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input {...register('language', {required: true})} value="french" type="checkbox" className={`checkbox checked:checkbox-primary ${errors.language && 'checkbox-accent'}`} />
                    <span className="label-text justify-start pl-2">French</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input {...register('language', {required: true})} value="kreyol" type="checkbox" className={`checkbox checked:checkbox-primary ${errors.language && 'checkbox-accent'}`} />
                    <span className="label-text justify-start pl-2">Kreyol</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input {...register('language', {required: true})} value="yoruba" type="checkbox" className={`checkbox checked:checkbox-primary ${errors.language && 'checkbox-accent'}`} />
                    <span className="label-text justify-start pl-2">Yoruba</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input {...register('language', {required: true})} value="igbo" type="checkbox" className={`checkbox checked:checkbox-primary ${errors.language && 'checkbox-accent'}`} />
                    <span className="label-text justify-start pl-2">Igbo</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input {...register('language', {required: true})} value="other" type="checkbox" className={`checkbox checked:checkbox-primary ${errors.language && 'checkbox-accent'}`} />
                    <span className="label-text justify-start pl-2">Other</span>
                    <input {...register('other_language', {required: watch().language === 'other' ? true : false })} type="text" placeholder='Input language' className="input input-bordered input-sm ml-2 focus:outline-none border" />
                </label>
            </div>
            <div className={`flex gap-5 py-5`}>
                <button onClick={handleBack} className={`w-28 btn btn-outline btn-primary`}>
                    Back
                </button>
                <button onClick={handleNext} className={`w-28 btn text-white ${!watch().language ? 'bg-gray-400' : 'btn-primary'}`} >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Language;