import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/UI/Button';
import TextInput from '../components/UI/TextInput';


const Contact = () => {


    const { register, watch, handleSubmit, formState: { errors }} = useForm();
    const onSubmitHandler = (data) => {
        console.log(data)
    };


    return (
        <main className="">
            <div className="w-[90%] mx-auto my-16 flex flex-col md:flex-row md:gap-[150px]">
                <div className="md:w-1/2 order-2 md:order-none">
                    <div className="">
                        <h1 className="text-5xl mt-5 md:mt-0 font-sterio">Connect with us!</h1>
                        <p className="mt-5">
                            Vestibulum id ligula parta felis euismod semper. Donec id elit non mi porta gravida at eget metus.
                        </p>
                        <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-5">
                            <div className="grid grid-cols-2 gap-7">
                                <TextInput 
                                    data={{name: 'firstname', title: 'First Name', pHolder: 'First Name'}}
                                    register={register}
                                    errors={errors}
                                    titleStyle="px-0 py-0 pb-2"
                                    />
                                <TextInput 
                                    data={{name: 'lastname', title: 'Last Name', pHolder: 'Last Name'}}
                                    register={register}
                                    errors={errors}
                                    titleStyle="px-0 py-0 pb-2"
                                    />
                                <TextInput 
                                    data={{name: 'email', title: 'Email', pHolder: 'Email'}}
                                    register={register}
                                    errors={errors}
                                    titleStyle="px-0 py-0 pb-2"
                                    />
                                <TextInput 
                                    data={{name: 'phone', title: 'Phone Number', pHolder: 'Phone Number'}}
                                    register={register}
                                    errors={errors}
                                    titleStyle="px-0 py-0 pb-2"
                                    />
                                <div className="col-span-2">
                                    <TextInput
                                    type={'textarea'}
                                    data={{name: 'message', type: 'textarea', title: 'Message', pHolder: 'We’d love to hear from you!'}}
                                    register={register}
                                    errors={errors}
                                    titleStyle="px-0 py-0 pb-2"
                                    className={'min-w-full'} />
                                </div>
                            </div>
                            <Button title={'Submit'} className="bg-[#EEA86D] border-[#EEA86D] text-2xl mt-2 px-10" />
                            <p className="text-error hidden">There was an error with your submission.</p>
                        </form>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <div className="relative h-[550px]">
                        <Image src={'/img/contact.png'} alt="Contact Image" layout='fill' />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Contact;