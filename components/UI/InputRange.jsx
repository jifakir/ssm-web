import React from 'react';
import { useController } from 'react-hook-form';
import { Range, getTrackBackground } from "react-range";

const STEP = 1;
const MIN = 0;
const MAX = 1000;

const InputRange = ({rtl, name, rules, control}) => {

    const {field} = useController({
        name,
        rules,
        control
    });
    const [values, setValues] = React.useState(field.value);

  return (
    <div className='flex justify-center flex-wrap mt-6'>
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(values) => {
          field.onChange(values);
          setValues(values);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%'
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values,
                  colors: ['#6F3E8D', '#949494', '#6F3E8D'],
                  min: MIN,
                  max: MAX,
                  rtl
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged, index }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '20px',
              width: '20px',
              border: '1px solid #6F3E8D',
              borderRadius: '50%',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA'
            }}
          >
            <div className="absolute bottom-full text-xs">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rotate-90 border-4 border-l-primary border-t-transparent border-r-transparent border-b-transparent"></div>
                <div className="relative bg-primary text-white p-2 rounded mb-2">
                    
                    ${Math.round(values[index])}
                </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}

export default InputRange;