import React from 'react';
import TextInput from '../UI/TextInput';
import Button from '../UI/Button';
import { useForm } from 'react-hook-form';


const Newsletter = ({ status, message, onValidated }) => {

    const { control, handleSubmit} = useForm({
        defaultValues: {
            email: ""
        }
    });

    const onSubmitHandler = ({email}) => {
        console.log(email);
        onValidated({ EMAIL: email });
    }

    console.log("Status: ", status);
    console.log("Message: ", message);

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="">
            <h5 className="text-[15px] font-semibold text-center lg:text-left">
                Stay in touch with us!
            </h5>
            <div className="sm:w-[80%] md:w-auto mx-auto lg:flex justify-center items-start gap-2 mt-5 lg:mt-2">
                
                <div className="w-2/3 sm:w-full mx-auto">
                    <TextInput 
                        control={control} 
                        name='email'
                        pHolder='Email Address'
                        rules={{ 
                            required: "Email is required", 
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Please, enter a valid email'
                            }}}
                        inputLg
                        />
                </div>
                <div className="mt-5 lg:mt-0 text-center">
                    <Button title={'SUBMIT'} fontSize="w-1/2 sm:w-auto text-lg sm:text-xl"/>
                </div>
            </div>
        </form>
    )
}

export default Newsletter;