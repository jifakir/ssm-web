import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/UI/Button';
import TextInput from '../components/UI/TextInput';
import PhoneNumber from '../components/UI/Number';


const Contact = () => {

    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState(false);
    const { control, reset, handleSubmit } = useForm();


    const onSubmitHandler = (data) => {
        setSubmit(true);
    };

    useEffect(()=>{
        if(submit){
            reset({
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                message: ''
            });
            const timeout = setTimeout(() => setSubmit(false),5000);
            return () => clearTimeout(timeout);
        }
    },[reset, submit]);

    return (
        <main className="">
            <div className="w-[90%] mx-auto my-5 sm:my-8 lg:my-16 flex flex-col lg:flex-row lg:gap-[50px]">
                <div className="lg:w-1/2 order-2 lg:order-none">
                    <div className="text-center md:text-left">
                        <h1 className="text-[32px] md:text-5xl mt-5 lg:mt-0 font-sterio">Connect with us!</h1>
                        <p className="text-sm md:text-base mt-5">
                            If you would like to connect with us, please feel free to fill out the form below and we will get back to you as soon as possible.
                        </p>
                        <form id='contact-form' onSubmit={handleSubmit(onSubmitHandler)} className="mt-5 md:mt-10 md:pr-16">
                            <div className="w-full sm:grid  gap-5 space-y-3 sm:space-y-0">
                                <TextInput 
                                    name='firstname'
                                    title='First Name'
                                    pHolder='First Name'
                                    control={control}
                                    rules={{
                                        required: 'First name is required!'
                                    }}
                                    titleStyle="px-0 py-0 md:pb-2"
                                    className={'min-w-full'}
                                    />
                                <TextInput 
                                    name='lastname'
                                    title='Last Name'
                                    pHolder='Last Name'
                                    control={control}
                                    rules={{
                                        required: 'Last name is required!'
                                    }}
                                    titleStyle="px-0 py-0 md:pb-2 "
                                    className={'min-w-full'}
                                    />
                                <TextInput
                                    name='email'
                                    title='Email'
                                    pHolder='Email'
                                    control={control}
                                    rules={{
                                        required: 'Email is required!',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'Enter a valid email'
                                        }
                                    }}
                                    titleStyle="px-0 py-0 md:pb-2"
                                    className={'min-w-full'}
                                    />
                                <div className="">
                                    <h1 className="text my-2 text-left">Phone Number</h1>
                                    <PhoneNumber
                                        name='phone'
                                        title='Phone Number'
                                        pHolder='000-000-0000'
                                        control={control}
                                        rules={{
                                            pattern: {
                                                value: /^\d{3}(-|\s)\d{3}(-|\s)\d{4}$|^\d{10}$|^1\s\d{3}(-|\s)\d{3}(-|\s)\d{4}$|^(1\s?)?\(\d{3}\)(\s|\-)?\d{3}\-\d{4}$/,
                                                message: 'Enter a valid Phone Number'
                                            }
                                        }}
                                        className={'h-10 md:mt-5 w-full'}
                                        />
                                </div>
                                <div className="col-span-2">
                                    <TextInput
                                    type={'textarea'}
                                    name='message'
                                    title='Message'
                                    pHolder='We’d love to hear from you!'
                                    control={control}
                                    rules={{
                                        required: 'Message is required!',
                                    }}
                                    titleStyle="px-0 py-0 md:pb-2"
                                    className={'min-w-full'} />
                                </div>
                            </div>
                            <div className="w-full flex">
                                <Button 
                                    btnLg
                                    title={'Submit'} 
                                    type="submit"
                                    form="contact-form"
                                    className={'mt-8'} />
                            </div>
                            <p className={`${!submit ? 'text-error' : 'text-green-600'} font-medium text-xs sm:text-sm pt-2`}>{submit ? 'Thank you for your submission!' : error ? 'There was an error with your submission. Please fill out required fields.': ''}</p>
                        </form>
                    </div>
                </div>
                <div className="hidden md:block relative lg:w-1/2 max-h-[350px] xs:max-h-[490px] sm:max-h-[640px] md:max-h-[850px] lg:max-h-[680px] overflow-hidden">
                        <Image src={'/img/contact.jpg'} alt="Contact Image" width={2832} height={4240} />
                </div>
            </div>
        </main>
    )
}

export default Contact;