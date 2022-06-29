import React from 'react';



const Checkbox = ({data, register, errors, ...rest}) => {

    const { options, title, name, required} = data;

    return (
        <div className="">
            <h1 className="text-lg my-5">{title}</h1>
            {
                options.map(( option, idx ) => (
                <div className="form-control text-sm" key={idx}>
                    <label className="label cursor-pointer justify-start">
                        <input 
                            {...rest} 
                            type="checkbox" 
                            {...register(name, {required})}
                            value={option.value} 
                            className={`checkbox checkbox-accent ${errors[name] ? 'checkbox-error' : ''}`} />
                        
                        <span className={`pl-2 ${errors[name] && 'text-error'}`}>{option.label}</span>
                    </label>
                </div>
                ))
            }
        </div>
    )
}

export default Checkbox;