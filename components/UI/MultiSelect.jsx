import React from 'react';
import ReactSelect, { components } from 'react-select';
import { Controller } from 'react-hook-form';

const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <div className="flex items-center">
            <input
                type="checkbox"
                checked={props.isSelected}
                onChange={() => null}
                className="checkbox pr-2"
            />{" "}
            <label className='ml-2'>{props.label}</label>
          </div>
        </components.Option>
      </div>
    );
  };


const Select = ({data, control, errors, ...rest}) => {
    
    const { options, title, name, required} = data;


    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-lg">{title}</span>
            </label>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value, ref } }) => (
                    <ReactSelect
                        inputRef={ref}
                        value={options.filter(c => value.includes(c.value))}
                        onChange={val => onChange(val.map(c => c.value))}
                        isMulti
                        components={{Option}}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
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
                        classNamePrefix="outline-secondary text-primary"
                        options={options}
                    />
                )}
            />
        </div>
    )
}

export default Select;