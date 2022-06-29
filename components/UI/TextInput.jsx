import React from 'react';
import { useEffect } from 'react';
import { useController } from 'react-hook-form';


const Input = ({ titleStyle, inputLg, title, className, type, pHolder, rules, name, control }) => {

    // console.log({...validate});
    // useEffect(() => {
    //     console.log(errors);
    // },[errors]);

    const { field, formState: { errors } } = useController({ 
        control, name, rules 
    });

    return (
        <div className="w-full">
            {
                title && (
                    <label className={`label`}>
                        <span className={`label-text text-base mb-3 text-black ${titleStyle}`}>{title}</span>
                    </label>
                )
            }
            {
                type === 'textarea' ? 
                <textarea
                    {...field}
                    placeholder={pHolder}
                    className={`
                    input min-h-40 h-40 input-bordered 
                    w-full border-2 hover:border-neutral 
                    shadow-sm focus:border-accent
                    focus:outline-none bg-white 
                    max-w-xs rounded ${className} ${errors[name] && 'input-error'}`} 
                >
                </textarea>:
                <input 
                    {...field}
                    placeholder={pHolder}
                    type={type ? type : 'text'}
                    className={`
                    w-full
                    ${!inputLg ? 'px-4 py-2 text-sm' : 'p-4 text-base'}
                    border-2 
                    hover:border-neutral 
                    shadow-sm 
                    focus:border-accent 
                    focus:outline-none 
                    bg-white
                    cursor-pointer
                    rounded ${className} ${errors[name] && 'input-error'}`}
                />
            }
            {
                errors[name] && <p className="text-error text-left text-[10px] pt-1 font-medium italic">
                    {errors[name].message}
                </p>
            }
            
        </div>
    )
}

export default Input;