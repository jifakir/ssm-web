import React from 'react';



const Input = ({data, register, errors, ...rest}) => {

    const {title, name, pHolder, required} = data;

    return (
        <div className="w-full max-w-xs">
            {
                title && (
                    <label className="label">
                        <span className="label-text text-lg">{title}</span>
                    </label>
                )
            }
            <input 
                {...register(name, {required})} 
                {...rest} 
                type="text" 
                placeholder={pHolder} 
                className={`input input-bordered w-full border-2 hover:border-neutral shadow-sm focus:border-accent focus:outline-none bg-white max-w-xs rounded ${errors[name] && 'input-error'}`} 
                 />
            <p className="text-error text-[10px] pt-1 font-medium italic">
                {
                    errors[name] && errors[name].message
                }
            </p>
        </div>
    )
}

export default Input;