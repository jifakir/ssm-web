import React from 'react';
import { Controller, useController } from 'react-hook-form';
import NumberFormat from 'react-number-format';


const PhonNumber = ({control,name, rules, className}) => {

    const {field, fieldState: {error}} = useController({ name,control,rules });

    return (
        <div className="">
            <NumberFormat
                      {...field}
                      placeholder="000-000-0000"
                      format="###-###-####"
                      mask={"_"}
                      className={`input input-bordered 
                      w-full border-2 hover:border-neutral 
                      shadow-sm focus:border-accent
                      focus:outline-none bg-white
                      max-w-xs rounded ${className} ${error && 'input-error'}`}
                    />
            {
                error && <p className="text-error text-left text-[10px] pt-1 font-medium italic">
                    {error.message}
                </p>
            }
        </div>
    )
}

export default PhonNumber;