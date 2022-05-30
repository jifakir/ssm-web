import React from 'react';



const RadioInput = ({data, register, errors, ...rest}) => {

    const { options, title, name, required} = data;

    return (
        <>
            <h1 className="text-lg text-left my-2">{title}</h1>
            {
                options.map(( option, idx ) => (
                <div className="form-control" key={idx}>
                    <label className="label cursor-pointer justify-start">
                        <input 
                            {...rest} 
                            type="radio" 
                            {...register(name, {required})}
                            value={option.value} 
                            className={`radio hover:radio-secondary ${errors[name] ? 'radio-error': 'checked:bg-neutral'}`} />
                        
                        <span className={`pl-2 ${errors[name] && 'text-error'}`}>{option.label}</span>
                    </label>
                </div>
                ))
            }
        </>
    )
}

export default RadioInput;