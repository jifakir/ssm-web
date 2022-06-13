import React from 'react';
import { useEffect } from 'react';



const Input = ({data, register, titleStyle, validate, inputLg, className, errors, type, ...rest}) => {

    const {title, name, pHolder, pattern, required} = data;
    console.log({...validate});
    useEffect(() => {
        console.log(errors);
    },[errors])
    return (
        <div className="w-full">
            {
                title && (
                    <label className={`label`}>
                        <span className={`label-text ${titleStyle}`}>{title}</span>
                    </label>
                )
            }
            {
                type === 'textarea' ? 
                <textarea
                    {...register(name, {required})} 
                    {...rest}
                    placeholder={pHolder}
                    className={`input min-h-40 h-40 input-bordered w-full border-2 hover:border-neutral shadow-sm focus:border-accent focus:outline-none bg-white max-w-xs rounded ${className} ${errors[name] && 'input-error'}`} 
                >
                </textarea>:
                <input 
                    {...register(name)}
                    {...rest}
                    type={type ? type : 'text'} 
                    placeholder={pHolder}
                    className={`
                    w-full
                    ${!inputLg ? 'px-4 py-2 text-sm' : 'p-4 text-base'}
                    border-2 
                    hover:border-neutral 
                    shadow-sm 
                    focus:border-accent 
                    focus:outline-none 
                    bg-white 
                    max-w-xs 
                    cursor-pointer
                    rounded ${className} ${errors[name] && 'input-error'}`}
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