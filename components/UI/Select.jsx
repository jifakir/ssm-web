import React from 'react';
import ReactSelect from 'react-select';
import { Controller } from 'react-hook-form';


const Select = ({data, control, errors, ...rest}) => {
    
    const { options, title, name, required} = data;

    

    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text text-lg">{title}</span>
            </label>
            <Controller
                control={control}
                defaultValue={''}
                name={name}
                render={({ field: { onChange, value, ref } }) => (
                    <ReactSelect
                        inputRef={ref}
                        isMulti
                        classNamePrefix="outline-secondary text-primary"
                        options={options}
                        value={options.filter(c => value.includes(c.value))}
                        onChange={val => onChange(val.map(c => c.value))}
                    />
                )}
            />
        </div>
    )
}

export default Select;