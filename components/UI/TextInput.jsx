import React from 'react';



const Input = ({data, register, errors, ...rest}) => {

    const {title, name, pHolder, required} = data;

    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text text-lg">{title}</span>
            </label>
            <input {...register(name, {required})} {...rest} type="text" placeholder={pHolder} className={`input input-bordered w-full max-w-xs ${errors[name] && 'input-error'}`} />
        </div>
    )
}

export default Input;