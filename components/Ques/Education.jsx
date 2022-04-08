import React from 'react';
import { HiPlus } from 'react-icons/hi';


const Education = () => {

    const [qualifyNum, setQualifyNum] = React.useState(1);
    
    return (
        <div className="">
            <div className="flex items-center my-5">
                <h1 className="text-2xl mr-5">Please add your education</h1>
                <button onClick={() => setQualifyNum(qualifyNum + 1)} className="btn btn-primary btn-outline">
                    <HiPlus className='mr-1' />
                    Education
                </button>
            </div>
            <div className="flex gap-5">
                {
                    Array(qualifyNum).fill('').map((v, idx) => (
                        <div className="space-y-3" key={`_education${idx}`}>
                            <h2 className="text-left">Education {idx + 1}</h2>
                            <div className="form-control w-full max-w-xs">
                                <input type="text" placeholder="Degree" className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <input type="text" placeholder="Major/Minor/Degree Focus" className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <input type="text" placeholder="Full Name of School" className="input input-bordered w-full max-w-xs" />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Education;