import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import RadioInput from '../UI/Radio';
import Button from '../UI/Button';


const data = {
    title: 'Which do you identify as?',
    name: 'orientation',
    required: true,
    options: [
        {
            name: 'Christianity',
            value: 'christianity'
        },
        {
            name: 'Judaism',
            value: 'judaism'
        },
        {
            name: 'Islam',
            value: 'islam'
        },
        {
            name: 'Hinduism',
            value: 'hinduism'
        },
        {
            name: 'Buddhism',
            value: 'buddhism'
        },
        {
            name: 'Atheism',
            value: 'atheism'
        },
        {
            name: 'None',
            value: 'none'
        },
        {
            name: 'Other',
            value: 'other'
        },
    ]
};

const Religion = ({ step, setStep, profile}) => {


    const { register, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: { religion: profile?.religion }});
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async ({religion}) => {

        if(!religion) return;
        await updateTherapist({ id: profile?.id, religion, registration_status: 'entered-religion' });
        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };


    return (
        <>
            <form id='religion-form' onSubmit={handleSubmit(handleNext)} className="text-left text-sm">
                <h1 className="text-lg my-2">Which do you identify as?</h1>
                {
                    <RadioInput register={register} errors={errors} data={data} />
                }
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
            </form>
            <div className={`flex gap-5 py-5`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    className="btn-outline border-neutral px-8 text-2xl" />
                <Button 
                    title={'Next'} 
                    form="religion-form" 
                    className={`${isLoading ? 'loading' : ''} px-8 text-2xl ${!watch().religion ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </>
    )
}

export default Religion;