import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';



const Orientation = ({ step, setStep}) => {


    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        await updateTherapist({ ...data, registration_status: 'entered-religion' });

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
                <button type='submit' className={`btn text-white ${!watch().religion ? 'bg-gray-400' : 'btn-primary'}`} >
                    Next
                </button>
            </div>
        </form>
    )
}

export default Orientation;