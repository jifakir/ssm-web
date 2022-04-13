import React from 'react';
import { HiPlus } from 'react-icons/hi';


const Education = ({register, errors, watch, trigger, step, setStep}) => {

    const [qualifyNum, setQualifyNum] = React.useState(1);

    const next = qualifyNum === 1 ? watch().education1 && (Object.values(watch().education1).includes(undefined || '' || false)):
                qualifyNum === 2 ? watch().education2 && (Object.values(watch().education1).includes(false) || Object.values(watch().education2).includes(false) ):
                qualifyNum === 3 ? watch().education3 && (Object.values(watch().education1).includes(false) || Object.values(watch().education2).includes(false)  || Object.values(watch().education3).includes(false)):
                qualifyNum === 4 ? watch().education4 && (Object.values(watch().education1).includes(false) || Object.values(watch().education2).includes(false)  || Object.values(watch().education3).includes(false) || Object.values(watch().education4).includes(false)):
                watch().education5 && (Object.values(watch().education1).includes(false) || Object.values(watch().education2).includes(false)  || Object.values(watch().education3).includes(false) || Object.values(watch().education4).includes(false) || Object.values(watch().education5).includes(false))
    console.log("Next: ", next);
    console.log("QualifyNum: ", qualifyNum);
    const handleNext = async () => {

        const trig = qualifyNum === 1 ? 
                    await trigger(['education1.degree','education1.major','education1.school_name']):
                    qualifyNum === 2 ?
                    await trigger(['education1.degree','education1.major','education1.school_name','education2.degree','education2.major','education2.school_name']):
                    qualifyNum === 3 ? 
                    await trigger(['education1.degree','education1.major','education1.school_name', 'education2.degree','education2.major','education2.school_name', 'education3.degree','education3.major','education3.school_name']):
                    qualifyNum === 4 ?
                    await trigger(['education1.degree','education1.major','education1.school_name', 'education2.degree','education2.major','education2.school_name', 'education3.degree','education3.major','education3.school_name', 'education4.degree','education4.major','education4.school_name']):
                    await trigger(['education1.degree','education1.major','education1.school_name', 'education2.degree','education2.major','education2.school_name', 'education3.degree','education3.major','education3.school_name', 'education4.degree','education4.major','education4.school_name', 'education5.degree','education5.major','education5.school_name'])

        console.log("Trig",trig);

        if(!trig) return;

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };
    
    return (
        <div className="">
            <div className="flex flex-col md:flex-row items-center my-5">

                <h1 className="text-lg mr-5">Please add your education</h1>
                <button onClick={() => setQualifyNum(qualifyNum + 1)} className="btn btn-primary btn-outline btn-sm text-sm">
                    <HiPlus className='mr-1' />
                    Education
                </button>

            </div>
            <div className="flex flex-col md:flex-row gap-5">

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
                <button onClick={handleBack} className={`w-32 btn btn-outline btn-primary`}>
                    Back
                </button>
                <button onClick={handleNext} className={`w-32 btn text-white ${ !next ? 'bg-gray-400' : 'btn-primary'}`} >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Education;