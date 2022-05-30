import React from 'react';



const Input = ({data, register, titleStyle, className, errors, type, ...rest}) => {

    const {title, name, pHolder, required} = data;

    return (
        <div className="w-full">
            {
                title && (
                    <label className={`label ${titleStyle}`}>
                        <span className="label-text">{title}</span>
                    </label>
                )
            }
            {
                type === 'textarea' ? 
                <textarea
                    {...register(name, {required})} 
                    {...rest}
                    placeholder={pHolder}
                    rows="30"
                    cols={50}
                    className={`input input-bordered w-full border-2 hover:border-neutral shadow-sm focus:border-accent focus:outline-none bg-white max-w-xs rounded ${className} ${errors[name] && 'input-error'}`} 
                >
                </textarea>:
                <input 
                    {...register(name, {required})} 
                    {...rest} 
                    type={type ? type : 'text'} 
                    placeholder={pHolder}
                    className={`input input-bordered w-full border-2 hover:border-neutral shadow-sm focus:border-accent focus:outline-none bg-white max-w-xs rounded ${className} ${errors[name] && 'input-error'}`} 
                />
            }
            <p className="text-error text-[10px] pt-1 font-medium italic">
                {
                    errors[name] && errors[name].message
                }
            </p>
        </div>
    )
}

export default Input;