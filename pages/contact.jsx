import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/UI/Button';
import TextInput from '../components/UI/TextInput';


const Contact = () => {

    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState(false);
    const { register, watch, trigger, handleSubmit, formState: { errors }} = useForm();
    console.log("errors: ", errors );
    const onSubmitHandler = (data) => {
        setSubmit(true);
    };
    
    return (
        <main className="">
            <div className="w-[90%] mx-auto my-5 sm:my-8 lg:my-16 flex flex-col lg:flex-row lg:gap-[50px]">
                <div className="lg:w-1/2 order-2 lg:order-none">
                    <div className="">
                        <h1 className="text-5xl mt-5 lg:mt-0 font-sterio">Connect with us!</h1>
                        <p className="mt-5">
                            Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus.
                        </p>
                        <form id='contact-form' onSubmit={handleSubmit(onSubmitHandler)} className="mt-10 md:pr-16">
                            <div className="w-full sm:grid  gap-5 space-y-3 sm:space-y-0">
                                <TextInput 
                                    data={{name: 'firstname', title: 'First Name', pHolder: 'First Name'}}
                                    register={register}
                                    required
                                    errors={errors}
                                    titleStyle="px-0 py-0 pb-2"
                                    className={'min-w-full'}
                                    />
                                <TextInput 
                                    data={{name: 'lastname', title: 'Last Name', pHolder: 'Last Name'}}
                                    register={register}
                                    required
                                    errors={errors}
                                    titleStyle="px-0 py-0 pb-2 "
                                    className={'min-w-full'}
                                    />
                                <TextInput
                                    data={{name: 'email', title: 'Email', pHolder: 'Email'}}
                                    register={register}
                                    required
                                    pattern="/^\S+@\S+$/i"
                                    errors={errors}
                                    titleStyle="px-0 py-0 pb-2"
                                    className={'min-w-full'}
                                    />
                                <TextInput 
                                    data={{name: 'phone', title: 'Phone Number', pHolder: 'Phone Number'}}
                                    register={register}
                                    required
                                    errors={errors}
                                    titleStyle="px-0 py-0 pb-2"
                                    className={'min-w-full'}
                                    />
                                <div className="col-span-2">
                                    <TextInput
                                    type={'textarea'}
                                    data={{name: 'message', type: 'textarea', title: 'Message', pHolder: 'We’d love to hear from you!'}}
                                    register={register}
                                    required
                                    errors={errors}
                                    titleStyle="px-0 py-0 pb-2"
                                    className={'min-w-full'} />
                                </div>
                            </div>
                            <Button 
                                title={'Submit'} 
                                type="submit"
                                form="contact-form"
                                className={'mt-8'} />
                            <p className="text-error text-xs sm:text-sm pt-2">{(submit && !error) ? 'Successfully! Submitted.' : error ? 'There was an error with your submission.': ''}</p>
                        </form>
                    </div>
                </div>
                <div className="relative lg:w-1/2 max-h-[350px] xs:max-h-[490px] sm:max-h-[640px] md:max-h-[850px] lg:max-h-[680px] overflow-hidden">
                        <Image src={'/img/contact.jpg'} alt="Contact Image" width={2832} height={4240} />
                </div>
            </div>
        </main>
    )
}

export default Contact;