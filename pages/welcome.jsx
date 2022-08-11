import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/UI/TextInput';



const Landing = () => {

    const {control, handleSubmit} = useForm();
    const submitHandler = (data) => {
        console.log(data);
    };

    return (
        <div className="fixed left-0 top-0 z-10 w-full min-h-screen bg-no-repeat bg-fixed bg-cover h-screen bg-welcome_mobile md:bg-welcome_tab lg:bg-welcome overflow-hidden">
            <div className="absolute hidden md:block w-full bottom-7 md:right-10">
                <p className="text-white text-xs md:text-base text-center md:text-right">Artwork by Reyna Noriega</p>
            </div>
            <div className="w-[80%] md:w-auto mx-auto md:mx-8 h-full flex lg:items-center">
                <div className="flex flex-col justify-between md:justify-start items-center md:items-start">
                    <div className="mt-9 md:mt-14 relative md:mb-14 w-[100px] md:w-[147px] h-[90px] md:h-[118px]">
                        <Image src={'/img/whitelogo.png'} layout="fill" alt="Welcome" />
                    </div>
                    <div className="mt-32">
                        <h1 className="font-sterio text-primary text-center md:text-left text-5xl md:text-5xl lg:text-[68px] lg:leading-[64px]">We can’t wait to<br className='md:hidden'/> connect you!</h1>
                        <p className="py-5 md:py-4 text-center md:text-left text-xs md:text-base leading-6 text-[#191847]">
                            Sign up for our newsletter to learn more 
                            about what we do and<br className='hidden md:block'/> to stay up to date 
                            on when we will be ready to connect you!​
                        </p>
                        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col md:flex-row items-center gap-2">
                            <Input control={control}
                                name={'email_address'}
                                pHolder={'Email'}
                                className="text-base mb-2 md:mb-0"
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
                                    px-2
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
                    <div className="w-full bottom-7 mb-7 md:hidden">
                        <p className="text-white text-xs md:text-base text-center md:text">Artwork by Reyna Noriega</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;