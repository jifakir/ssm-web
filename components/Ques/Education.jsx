import React from 'react';
import { HiPlus } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';



const Education = ({step, setStep}) => {

    const [qualifyNum, setQualifyNum] = React.useState(1);

    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {


        await updateTherapist({ ...data, registration_status: 'entered-education' });

        // if(!isSucces){
        //     return
        // }

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };

    
    const ec1 = watch().education1 && Object.values(watch().education1).every(itm => itm);
    const ec2 = watch().education2 && Object.values(watch().education2).every(itm => itm);
    const ec3 = watch().education3 && Object.values(watch().education3).every(itm => itm);
    const ec4 = watch().education4 && Object.values(watch().education4).every(itm => itm);
    const ec5 = watch().education5 && Object.values(watch().education5).every(itm => itm);

    const isFilledUp = qualifyNum === 1 ? ec1:
                qualifyNum === 2 ? ec1 && ec2:
                qualifyNum === 3 ? ec1 && ec2 && ec3 && ec4:
                qualifyNum === 4 ? ec1 && ec2 && ec3 && ec4:
                qualifyNum === 5 ? ec1 && ec2 && ec3 && ec4 && ec5: false;

    
    return (
        <form onSubmit={handleSubmit(handleNext)} className="">

            <div className="flex items-center my-5">

                <h1 className="text-lg mr-5">Please add your education</h1>
                <button onClick={() => setQualifyNum(qualifyNum + 1)} className="btn btn-primary btn-outline btn-sm text-sm">
                    <HiPlus className='mr-1' />
                    Education
                </button>

            </div>
            <div className="flex gap-5">

                <div className="space-y-3" >
                    <h2 className="text-left">Education 1</h2>
                    <div className="form-control w-full max-w-xs">
                        <input {...register(`education1.degree`, { required: true })} type="text" placeholder="Degree" className={`input input-bordered w-full max-w-xs ${errors.education1 && errors.education1.degree && 'input-accent'}`} />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input {...register(`education1.major`, { required: true })} type="text" placeholder="Major/Minor/Degree Focus" className={`input input-bordered w-full max-w-xs ${errors.education1 && errors.education1.major && 'input-accent'}`} />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input {...register(`education1.school_name`, { required: true })} type="text" placeholder="Full Name of School" className={`input input-bordered w-full max-w-xs ${ errors.education1 && errors.education1.school_name && 'input-accent'}`} />
                    </div>
                </div>

                <div className={`space-y-3 ${qualifyNum >= 2 ? 'block' : 'hidden'}`} >
                    <h2 className="text-left">Education 2</h2>
                    <div className="form-control w-full max-w-xs">
                        <input {...register(`education2.degree`, { required: true })} type="text" placeholder="Degree" className={`input input-bordered w-full max-w-xs ${errors.education2 && errors.education2.degree && 'input-accent'}`} />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input {...register(`education2.major`, { required: true })} type="text" placeholder="Major/Minor/Degree Focus" className={`input input-bordered w-full max-w-xs ${errors.education2 && errors.education2.major && 'input-accent'}`} />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input {...register(`education2.school_name`, { required: true })} type="text" placeholder="Full Name of School" className={`input input-bordered w-full max-w-xs ${ errors.education2 && errors.education2.school_name && 'input-accent'}`} />
                    </div>
                </div>
                <div className={`space-y-3 ${qualifyNum >= 3 ? 'block' : 'hidden'}`} >
                    <h2 className="text-left">Education 3</h2>
                    <div className="form-control w-full max-w-xs">
                        <input {...register(`education3.degree`, { required: true })} type="text" placeholder="Degree" className={`input input-bordered w-full max-w-xs ${errors.education3 && errors.education3.degree && 'input-accent'}`} />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input {...register(`education3.major`, { required: true })} type="text" placeholder="Major/Minor/Degree Focus" className={`input input-bordered w-full max-w-xs ${errors.education3 && errors.education3.major && 'input-accent'}`} />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input {...register(`education3.school_name`, { required: true })} type="text" placeholder="Full Name of School" className={`input input-bordered w-full max-w-xs ${ errors.education3 && errors.education3.school_name && 'input-accent'}`} />
                    </div>
                </div>
                <div className={`space-y-3 ${qualifyNum >= 4 ? 'block' : 'hidden'}`} >
                    <h2 className="text-left">Education 4</h2>
                    <div className="form-control w-full max-w-xs">
                        <input {...register(`education4.degree`, { required: true })} type="text" placeholder="Degree" className={`input input-bordered w-full max-w-xs ${errors.education4 && errors.education4.degree && 'input-accent'}`} />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input {...register(`education4.major`, { required: true })} type="text" placeholder="Major/Minor/Degree Focus" className={`input input-bordered w-full max-w-xs ${errors.education4 && errors.education4.major && 'input-accent'}`} />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input {...register(`education4.school_name`, { required: true })} type="text" placeholder="Full Name of School" className={`input input-bordered w-full max-w-xs ${ errors.education4 && errors.education4.school_name && 'input-accent'}`} />
                    </div>
                </div>
                <div className={`space-y-3 ${qualifyNum >= 5 ? 'block' : 'hidden'}`} >
                    <h2 className="text-left">Education 5</h2>
                    <div className="form-control w-full max-w-xs">
                        <input {...register(`education5.degree`, { required: true })} type="text" placeholder="Degree" className={`input input-bordered w-full max-w-xs ${errors.education5 && errors.education5.degree && 'input-accent'}`} />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input {...register(`education5.major`, { required: true })} type="text" placeholder="Major/Minor/Degree Focus" className={`input input-bordered w-full max-w-xs ${errors.education5 && errors.education5.major && 'input-accent'}`} />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input {...register(`education5.school_name`, { required: true })} type="text" placeholder="Full Name of School" className={`input input-bordered w-full max-w-xs ${ errors.education5 && errors.education5.school_name && 'input-accent'}`} />
                    </div>
                </div>

            </div>
            <div className={`flex gap-5 py-5`}>
                <button onClick={handleBack} className={`btn btn-outline btn-primary`}>
                    Back
                </button>
                <button type='submit' onClick={handleNext} className={`btn text-white ${ !isFilledUp ? 'bg-gray-400' : 'btn-primary'}`} >
                    Next
                </button>
            </div>
        </form>
    )
}

export default Education;