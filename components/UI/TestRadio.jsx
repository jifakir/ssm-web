import React from 'react';
import { useController } from 'react-hook-form';



const RadioInput = ({control, rules, name, title, options}) => {


    const { field, formState: {errors}} = useController({control, name, rules});
    const [value, setValue] = React.useState(field.value || []);

    console.log("Value: ", value);
    console.log("Value conver",value === value);
    return (
        <>
            <h1 className="text-lg text-left my-2">{title}</h1>
            {/* {
                options.map(( option, idx ) => (
                <div className="form-control" key={idx}>
                    <label className="label cursor-pointer justify-start">
                        <input 
                            // {...rest} 
                            // type="radio" 
                            // {...register(name, {required})}
                            // value={option.value} 
                            {...field}
                            className={`radio hover:radio-secondary ${errors[name] ? 'radio-error': 'checked:bg-neutral'}`} />
                        
                        <span className={`pl-2 ${errors[name] && 'text-error'}`}>{option.label}</span>
                    </label>
                </div>
                ))
            } */}

            {/* Testing */}
            <p className="text-error">{errors[name] ? errors[name].message : 'ok'}</p>
            
            {options.map((option, index) => (
                <input
                ref={field.ref}
                onChange={(e) => {
                    // update checkbox value
                    field.onChange(option.value)
                    setValue(option.value)
                }}
                key={`kdjkdoption${index}`}
                type="radio"
                value={option.value}
                checked={value == option.value ? true : false}
                className={`radio mx-2  ${errors[name] ? 'radio-error': 'checked:bg-neutral'}`} 
                />
            ))
            }
        </>
    )
}

export default RadioInput;