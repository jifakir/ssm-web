import React from 'react';



const Select = ({data, register, errors, ...rest}) => {
    
    const { options, title, name, required} = data;

    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text text-lg">{title}</span>
            </label>
            <select {...rest } {...register(name, { required })} className={`select select-bordered w-full max-w-xs ${errors[name] ? 'select-accent' : 'select-neutral'}`}>
                <option value="" > Select a value</option>
                {
                    options.map(( option,idx ) => <option key={idx} value={option.value} >{option.label}</option>)
                }
            </select>
        </div>
    )
}

export default Select;