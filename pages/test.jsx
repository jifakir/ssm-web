import React from 'react';
import { useForm } from 'react-hook-form';
import InputText from '../components/UI/InputText';
import TestRadio from '../components/UI/TestRadio';



const Test = () => {

    const { control, watch, handleSubmit } = useForm({defaultValues: {testradio: false}});
    const onSubmitHandler = (data) => {
        console.log(data);
    };

    console.log(watch());
    
    return (
        <div className="min-h-screen">
            <form onSubmit={handleSubmit(onSubmitHandler)} className="px-10 py-20">
                <InputText 
                    control={control} 
                    name="test"
                    rules={{
                        required: "Test is required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Type valid email"
                        }
                    }}
                    pHolder={'Test'} />
                
                <TestRadio 
                    control={control} 
                    options={ [
                        {
                            label: 'Label',
                            value: true
                        },
                        {
                            label: 'Labe',
                            value: false
                        },
                    ]}
                    name={'testradio'}
                    title={'Testing'}
                    rules={{
                        required: 'Is requuired'
                    }} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Test;