import React from 'react';
import ReactSelect, { components } from 'react-select';
import { Controller } from 'react-hook-form';

const Select = ({data, control, errors, isMulti, ...rest}) => {
    
    const { options, title, name, required} = data;


    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text text-lg">{title}</span>
            </label>
            <Controller
                control={control}
                defaultValue={'Value'}
                name={name}
                render={({ field }) => {
                    return (
                        <ReactSelect
                            { ...field }
                            styles={{
                                control: base => ({
                                    ...base,
                                    border: '2px solid #ddd',
                                    padding: '4px 8px',
                                    fontSize: '14px'
                                  }),
                                option: base => ({
                                    ...base,
                                    // borderBottom: '1px solid #6F3E8D'
                                })
                            }}
                            theme={(theme) => ({
                                ...theme,
                                padding: '5px',
                                colors: {
                                  ...theme.colors,
                                  primary25: '#E0914F',
                                  primary: '#EEA86D',
                                  neutral0: '#fff',
                                  neutral30: '#E7D895',
                                  neutral20: '#ddd',
                                },
                              })}
                            options={options}
                        />
                    )
                }}
            />
        </div>
    )
}

export default Select;