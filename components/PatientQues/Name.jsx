import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Input from '../UI/TextInput';


const Name = ({step, setStep}) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [registerTherapist, { isSuccess, isLoading, isError, error }] = useRegisterTherapistMutation();

    const handleNext = async (data) => {

        const { full_name } = data;

        console.log(data);

        // await registerTherapist({ full_name, registration_status: 'entered-fullname' });

        // if(!isSuccess){
        //     return
        // }

        setStep(step + 1);

    };

    const handleBack = () => {
        if(step === 1) return;
        setStep(step - 1);
    };

    // console.log(error);
    const inputData = [
        {
            title: 'What is your name?',
            pHolder: 'Full Name',
            name: 'full_name',
            required: true
        }
    ]

    return (
        <form onSubmit={handleSubmit(handleNext)}>
            {/* <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text text-lg">What is your name?</span>
                </label>
                <input {...register('full_name',{required: true})} type="text" placeholder="Full Name" className={`input input-bordered w-full max-w-xs ${errors.name && 'input-error'}`} />
                <p className="text-accent text-xs font-bold py-1">{isError && error?.message || error?.data?.message}</p>
            </div> */}

            {
                inputData.map(( v, idx ) => (<Input key={idx} errors={errors} register={register} data={v} />))
            }
            <div className={`flex gap-5 py-5`}>
                <button onClick={handleBack} className={`btn btn-outline btn-primary ${step >= 3 ? 'block' : 'hidden'}`}>
                    Back
                </button>
                <button type='submit' onClick={handleNext} className={`btn text-white ${!watch().full_name ? 'bg-gray-400' : 'btn-primary'}`} >
                    Next
                </button>
            </div>
        </form>
    )
}

export default Name;