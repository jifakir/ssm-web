import React from 'react';
import { useController } from 'react-hook-form';



const RadioInput = ({data, control,}) => {

    const { options, title, name, rules} = data;

    const { field, fieldState: {error}} = useController({control, name, rules});
    const [value, setValue] = React.useState(field.value || '');

    return (
        <>
            <h1 className="text-lg text-left my-2">{title}</h1>
            {
                options.map(( option, idx ) => (
                <div className="form-control" key={idx}>
                    <label className="label cursor-pointer justify-start">
                        <input 
                            ref={field.ref}
                            onChange={(e) => {
                                // update checkbox value
                                field.onChange(option.value)
                                setValue(option.value)
                            }}
                            type="radio" 
                            value={option.value}
                            checked={value == option.value ? true : false}
                            className={`radio hover:radio-secondary ${error ? 'radio-error': 'checked:bg-neutral'}`} />
                        
                        <span className={`pl-2 ${error && 'text-error'}`}>{option.label}</span>
                    </label>
                </div>
                ))
            }
        </>
    )
}

export default RadioInput;