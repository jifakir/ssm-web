import React from 'react';



const Phone = ({register, errors}) => {

    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text text-lg">Phone Number</span>
            </label>
            <input {...register('phone',{required: true})} type="tel" placeholder="Full Name" className={`input input-bordered w-full max-w-xs ${errors.phone && 'input-error'}`} />
        </div>
    )
}

export default Phone;