import React from 'react';
import { useForm } from 'react-hook-form';
import InputText from '../components/UI/InputText';



const Test = () => {

    const { control, handleSubmit } = useForm();
    const onSubmitHandler = (data) => {
        console.log(data);
    };

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
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Test;