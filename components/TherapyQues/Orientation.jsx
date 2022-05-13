import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';



const Orientation = ({ step, setStep}) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {


        await updateTherapist({ ...data, registration_status: 'entered-orientaton' });

        // if(!isSucces){
        //     return
        // }

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };

    return (
        <form onSubmit={handleSubmit(handleNext)} className="text-left text-sm">
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
            <p className="text-accent text-xs font-bold py-1 text-left">{isError && error?.message || error?.data?.message}</p>
            <div className={`flex gap-5 py-5`}>
                <button onClick={handleBack} className={`btn btn-outline btn-primary`}>
                    Back
                </button>
                <button type='submit' onClick={handleNext} className={`btn text-white ${!watch().orientation ? 'btn-neutral' : 'btn-primary'}`} >
                    Next
                </button>
            </div>
        </form>
    )
}

export default Orientation;