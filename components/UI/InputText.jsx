import React from 'react';
import { useController } from 'react-hook-form';



const InputText = ({ control, name, rules, type, pHolder, inputLg, className,}) => {

    const { field, fieldState: {error} } = useController({ control, name, rules });

    return (
        <div className="">
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
                    rounded ${className} ${error && 'input-error'}`} 
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
                    rounded ${className} ${error && 'input-error'}`}
                />
            }
            {
                error && <p className="text-error text-[10px] pt-1 font-medium italic">
                    {error.message}
                </p>
            }
        </div>
    )
}

export default InputText;