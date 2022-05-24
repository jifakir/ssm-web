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
            <div className="w-[90%] mx-auto my-10">
                <div className="w-1/2">
                    <div className="">
                        <h1 className="text-5xl font-sterio">Connect with us!</h1>
                        <p className="mt-5">
                            Vestibulum id ligula parta felis euismod semper. Donec id elit non mi porta gravida at eget metus.
                        </p>
                        <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-5">
                            <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                                <TextInput 
                                    data={{name: 'name', title: 'First Name', pHolder: 'First Name'}}
                                    register={register}
                                    errors={errors}
                                    titleStyle="px-0 py-0 pb-2"
                                    />
                                <TextInput 
                                    data={{name: 'name', title: 'First Name', pHolder: 'First Name'}}
                                    register={register}
                                    errors={errors}
                                    titleStyle="px-0 py-0 pb-2"
                                    />
                                <TextInput 
                                    data={{name: 'name', title: 'First Name', pHolder: 'First Name'}}
                                    register={register}
                                    errors={errors}
                                    titleStyle="px-0 py-0 pb-2"
                                    />
                                <TextInput 
                                    data={{name: 'name', title: 'First Name', pHolder: 'First Name'}}
                                    register={register}
                                    errors={errors}
                                    titleStyle="px-0 py-0 pb-2"
                                    />
                                <div className="col-span-2">
                                    <TextInput
                                    data={{name: 'name', type: 'textarea', title: 'First Name', pHolder: 'First Name'}}
                                    register={register}
                                    errors={errors}
                                    titleStyle="px-0 py-0 pb-2"
                                    className={'min-w-full'} />
                                </div>
                            </div>
                            <Button title={'Submit'} className="btn-secondary mt-2" />
                            <p className="text-error">There was an error with your submission.</p>
                        </form>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="relative">
                        <Image src={'/img/contact.png'} alt="Contact Image" layout='fill' />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Contact;