import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';



const OtherLang = ({step, setStep}) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        await updateTherapist({ ...data, registration_status: 'entered-other-lang' });

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
            <h1 className="text-lg my-2">Do you speak other languages?</h1>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" {...register('other_lang', {required: true})} value={'yes'} className={`radio checked:radio-primary ${errors.other_lang && 'radio-accent'}`} />
                    <span className="label-text pl-2">Yes</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" {...register('other_lang', {required: true})} value={'no'} className={`radio checked:radio-primary ${errors.other_lang && 'radio-accent'}`} />
                    <span className="label-text justify-start pl-2">No</span>
                </label>
            </div>
            <div className={`flex gap-5 py-5`}>
                <button onClick={handleBack} className={`btn btn-outline btn-primary`}>
                    Back
                </button>
                <button type='submit' className={`btn  text-white ${!watch().other_lang ? 'bg-gray-400' : 'btn-primary'}`} >
                    Next
                </button>
            </div>
        </form>
    )
}

export default OtherLang;