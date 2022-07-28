import React from 'react';
import InputText from './InputText';
import { useController } from 'react-hook-form';

const Checkbox = ({data, register, control, errors, ...rest}) => {

    const { options, title, name, required} = data;
    const { field, fieldState } = useController({control, name});
    const [value, setValue] = React.useState(field.value || []);

    return (
        <div className="">
            <h1 className="text-lg my-5">{title}</h1>
            {
                options.map(( option, idx ) => (
                <div className="form-control text-sm" key={idx}>
                    <label className="label cursor-pointer justify-start">
                        <input 
                            ref={field.ref}
                            onChange={(e) => {
                                if(value.includes(option.value)){
                                    
                                }
                                const valueCopy = [...value];
                                valueCopy[idx] = e.target.checked ? e.target.value : null;
                                field.onChange(valueCopy);
                                setValue(valueCopy)
                            }} 
                            type="checkbox" 
                            checked={value.includes(option.value)}
                            value={option.value} 
                            className={`checkbox checkbox-secondary ${errors[name] ? 'checkbox-error' : ''}`} />
                        
                        <span className={`px-2 ${errors[name] && 'text-error'}`}>{option.label}</span>
                        <InputText
                        control={control}
                        name={'other'}
                        pHolder={'Other'}
                        className={`${(value.includes(option.value) && option.value === 'other') ? 'block' : 'hidden'}`} />
                    </label>
                </div>
                ))
            }
        </div>
    )
}

export default Checkbox;