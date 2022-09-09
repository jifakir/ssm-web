import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/UI/TextInput';
import WelcomeForm from '../components/WelcomeForm';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const Landing = () => {

    const mailChimpUrl = process.env.NEXT_PUBLIC_MAILCHIMP_URL;

    return (
        <div className="fixed left-0 top-0 z-10 w-full min-h-screen bg-no-repeat bg-fixed bg-cover h-screen bg-welcome_mobile md:bg-welcome_tab lg:bg-welcome overflow-hidden">
            <div className="absolute hidden md:block w-full bottom-7 md:right-10">
                <p className="text-white text-xs md:text-base text-center md:text-right">Artwork by Reyna Noriega</p>
            </div>
            <div className="w-[80%] md:w-auto mx-auto md:ml-24 h-full">
                <div className="h-full flex flex-col justify-between md:justify-start items-center md:items-start">
                    <div className="mt-9 md:mt-10 relative md:mb-0 w-[100px] md:w-[147px] h-[90px] md:h-[118px]">
                        <Image src={'/img/whitelogo.png'} layout="fill" alt="Welcome" />
                    </div>
                    <div className="md:mt-16">
                        <h1 className="font-sterio text-primary text-center md:text-left text-5xl md:text-5xl lg:text-[68px] lg:leading-[64px]">
                            We can’t wait to<br className=''/> connect you!</h1>
                        <p className="mt-8 py-5 md:py-4 text-center md:text-left text-xs md:text-base leading-6 text-[#191847]">
                            Sign up for our newsletter to learn more 
                            about what we do and<br className='hidden md:block'/> to stay up to date 
                            on when we will be ready to connect you!​
                        </p>
                        <MailchimpSubscribe
                            url={mailChimpUrl}
                            render={(props) => {
                                const { subscribe, status, message } = props || {};
                                return (
                                    <WelcomeForm
                                     status={status}
                                     message={message}
                                     onValidated={ formData => subscribe( formData ) } />
                                )
                            }} />
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