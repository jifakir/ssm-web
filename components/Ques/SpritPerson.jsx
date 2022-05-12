import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';



const SpritPerson = ({ step, setStep }) => {


    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        await updateTherapist({ ...data, registration_status: 'entered-sprituality' });

        // if(!isSucces){
        //     return
        // }

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };


    return (
        <form onSubmit={handleSubmit(handleNext)} className="text-left">
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
                <button onClick={handleBack} className={`btn btn-outline btn-primary`}>
                    Back
                </button>
                <button className={`btn text-white ${!watch().spiritual_person ? 'bg-gray-400' : 'btn-primary'}`} >
                    Next
                </button>
            </div>
        </form>
    )
}

export default SpritPerson;