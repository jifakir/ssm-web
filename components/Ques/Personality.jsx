import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';


const Personality = ({ step, setStep }) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        await updateTherapist({ personality: {...data}, registration_status: 'entered-personality' });

        // if(!isSucces){
        //     return
        // }

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };


    return (
        <form onSubmit={handleSubmit(handleNext)} className="">
            <h1 className="text-left text-lg my-5">Share your Myers-Brigg Personality Type aspects</h1>
            <div className="flex text-sm gap-5">
                <div className="">
                    <h3 className="text-sm">Mind(select one)</h3>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input {...register('mind',{required: true})} type="radio" value={'introvert'} className={`radio ${errors.mind ? 'radio-accent' : 'checked:bg-primary'}`} />
                            <span className="label-text pl-2">Introvert</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input {...register('mind',{required: true})} type="radio" value={'extrovert'} className={`radio ${errors.mind ? 'radio-accent' : 'checked:bg-primary'}`} />
                            <span className="label-text justify-start pl-2">Extrovert</span>
                        </label>
                    </div>
                </div>
                <div className="">
                    <h3 className="text-sm">Energy(select one)</h3>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input {...register('energy',{required: true})} type="radio" value={'energy'}  className={`radio ${errors.energy ? 'radio-accent' : 'checked:bg-primary'}`} />
                            <span className="label-text pl-2">Observant</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input {...register('energy',{required: true})} type="radio" value={'energy'}  className={`radio ${errors.energy ? 'radio-accent' : 'checked:bg-primary'}`} />
                            <span className="label-text justify-start pl-2">Thinking</span>
                        </label>
                    </div>
                </div>
                <div className="">
                    <h3 className="text-sm">Nature(select one)</h3>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input {...register('nature',{required: true})} type="radio" value={'nature'}  className={`radio ${errors.nature ? 'radio-accent' : 'checked:bg-primary'}`} />
                            <span className="label-text pl-2">Feeling</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input {...register('nature',{required: true})} type="radio" value={'nature'}  className={`radio ${errors.nature ? 'radio-accent' : 'checked:bg-primary'}`} />
                            <span className="label-text justify-start pl-2">Thinking</span>
                        </label>
                    </div>
                </div>
                <div className="">
                    <h3 className="text-sm">Tactics(select one)</h3>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input {...register('tactics',{required: true})} type="radio" value={'tactics'}  className={`radio ${errors.tactics ? 'radio-accent' : 'checked:bg-primary'}`} />
                            <span className="label-text pl-2">Judging</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input {...register('tactics',{required: true})} type="radio" value={'tactics'} className={`radio ${errors.tactics ? 'radio-accent' : 'checked:bg-primary'}`} />
                            <span className="label-text justify-start pl-2">Prospecting</span>
                        </label>
                    </div>
                </div>
                <div className="">
                    <h3 className="text-sm">Identity(select one)</h3>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input {...register('identity',{required: true})} type="radio" value={'identity'}  className={`radio ${errors.identity ? 'radio-accent' : 'checked:bg-primary'}`} />
                            <span className="label-text pl-2">Assertive</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input {...register('identity',{required: true})} type="radio" value={'identity'}  className={`radio ${errors.identity ? 'radio-accent' : 'checked:bg-primary'}`} />
                            <span className="label-text justify-start pl-2">Turbulent</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className={`flex gap-5 py-5`}>
                <button onClick={handleBack} className={`btn btn-outline btn-primary`}>
                    Back
                </button>
                <button type='submit' className={`btn text-white ${!watch().mind || !watch().energy || !watch().nature || !watch().tactics || !watch().identity ? 'bg-gray-400' : 'btn-primary'}`} >
                    Next
                </button>
            </div>
        </form>
    )
}

export default Personality;