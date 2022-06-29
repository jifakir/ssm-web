import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/UI/TextInput';


const Welcome = () => {

    const {control} = useForm();

    return (
        <div className="fixed z-10 w-full min-h-screen bg-no-repeat bg-fixed bg-cover h-screen bg-welcome">
            <div className="w-full pl-16 h-full flex items-center bg-gradient-to-r from-secondary/80 via-secondary/70 to-transparent">
                <div className="">
                    <div className="mb-20">
                        <Image src={'/img/whitelogo.png'} width={147} height={118} alt="Welcome" />
                    </div>
                    <h1 className="font-sterio text-primary text-[64px] leading-[64px]">We can’t wait to<br/> connect you!</h1>
                    <p className="py-9 leading-6">
                        Sign up for our newsletter to learn more 
                        about what we do and<br/> to stay up to date 
                        on when we will be ready to connect you!​
                    </p>
                    <form className="flex items-center gap-2">
                        <Input control={control}
                            name={'email_address'}
                            pHolder={'Email'}
                            rules={{
                                required: 'Email is required.',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Enter a valid email address'
                                }
                            }} />
                        <button
                            type={'submit'} 
                            className={`
                                text-2xl
                                leading-7
                                tracking-[0.055em]
                                bg-primary
                                uppercase
                                px-4
                                py-1
                                hover:bg-primary/90 
                                active:bg-accent-focus
                                rounded
                                gap-2
                                font-semibold
                                disabled:bg-[#C0C0C0]
                                disabled:text-[#3E3643]
                                disabled:cursor-not-allowed
                                border-[3px] 
                                border-primary 
                                text-white 
                                hover:border-primary/10
                                min-w-[156px]`}
                                >
                            <div className="flex justify-center items-center">
                            SIGN UP
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Welcome;