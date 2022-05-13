import React from 'react';



const RadioInput = ({data, register, errors, ...rest}) => {

    const { options, title, name, required} = data;

    return (
        <div className="">
            <h1 className="text-lg my-2">{title}</h1>
            {
                options.map(( option, idx ) => (
                <div className="form-control" key={idx}>
                    <label className="label cursor-pointer justify-start">
                        <input {...rest} type="radio" {...register(name, {required})} value={option.value} className={`radio ${errors.religion ? 'radio-accent': 'checked:bg-primary'}`} />
                        <span className="label-text pl-2">{option.label}</span>
                    </label>
                </div>
                ))
            }
        </div>
    )
}

export default RadioInput;