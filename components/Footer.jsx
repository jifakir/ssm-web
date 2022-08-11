import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TextInput from './UI/TextInput';
import Button from './UI/Button';
import { AiFillInstagram, AiFillFacebook, AiOutlineTwitter, AiFillLinkedin } from 'react-icons/ai';
import { useForm } from 'react-hook-form';

const linksData = [
    {
        component: <AiFillInstagram />,
        url: 'http://www.instagram.com/startsayingmore'
    },
    {
        component: <AiFillFacebook />,
        url: 'https://www.facebook.com/StartSayingMore'
    },
    {
        component: <AiOutlineTwitter />,
        url: 'http://www.twitter.com/startsayingmore'
    },
    {
        component: <AiFillLinkedin />,
        url: 'https://www.linkedin.com/company/startsayingmore/'
    }
];

const menuList = [
    {
        title: 'Home',
        linkUrl: '/'
    },
    {
        title: 'About',
        linkUrl: '/'
    },
    {
        title: 'Contact',
        linkUrl: '/'
    },
    {
        title: 'FAQs',
        linkUrl: '/faqs'
    },
    {
        title: 'Donate',
        linkUrl: 'https://www.kickstarter.com/projects/olamideafolabi/launch-an-innovative-therapist-matching-platform'
    },
    {
        title: 'Emergency Resources',
        linkUrl: '/'
    },
];

const Footer = () => {

    const { control, handleSubmit} = useForm();
    const onSubmitHandler = (data) => {
        console.log(data);
    }

    return (
        <footer className="relative bg-neutral/30 py-4 overflow-hidden bg-gradient-to-r from-transparent via-neutral/40 to-transparent">
            <div className="md:hidden absolute -z-10 top-0 left-0 w-full h-full">
                <Image src={'/img/footerbgmobile.svg'} layout="fill" objectFit='cover'  alt={"Footer Bg"} />
            </div>
            <div className="hidden md:block absolute -z-10 -top-5">
                <Image src={'/img/footerbg.svg'} alt={"Footer Bg"} width={686} height={450} />
            </div>
            <div className="px-[2%] lg:flex justify-between">
                <div className="lg:w-2/3 md:flex justify-between items-center">
                    <div className="md:w-1/2 py-10 px-5 sm:px-0">
                        <div className="w-full px-20 flex justify-center">
                            <Image src={'/img/seclogo.svg'} alt="Footer Logo" width={326} height={106} />
                        </div>
                        <ul className="mt-5 flex justify-center items-center gap-5 text-2xl">
                            {
                                linksData.map(({component, url}, idx) => (
                                    <li key={`footer_link_${idx}`} className="text-3xl text-primary cursor-pointer">
                                        <Link href={url} passHref>
                                            <a target="_blank">
                                                {
                                                    component
                                                }
                                            </a>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="">
                            <p className=" hidden md:block lg:hidden text-[10px] px-6 sm:text-xs text-center pt-12 sm:pt-8">
                                Copyright &copy; 2020 Start Saying More, LLC. All Rights Reserved. | Privacy Policy | Terms &amp; Conditions
                            </p>
                        </div>
                    </div>
                    <div className="md:w-1/2 md:pr-10">
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
                        <div className="mt-10 lg:mt-5 text-center lg:text-left">
                            <h5 className="text-[15px] font-semibold mb-2 md:mb-2">
                                Quick Links
                            </h5>
                            <ul className="grid grid-cols-2 gap-y-5 sm:gap-y-auto text-[15px] space-y-1">
                                {
                                    menuList.map( (menu, idx) => <li 
                                        key={`menu_item_${idx}`} 
                                        className="last:text-red-800 text-sm sm:text-base cursor-pointer hover:underline hover:text-secondary last:hover:text-error transition-all duration-300 ease-out">
                                            <Link href={menu.linkUrl}>
                                                {menu.title}
                                            </Link>
                                        </li> )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:border-l border-primary sm:pl-10 mt-5 sm:mt-10 lg:block text-center lg:text-left">
                    <div className="md:w-1/2 lg:w-full">
                        <h5 className="relative text-[15px] font-semibold inline-block">
                            <span>Find A Therapist</span>
                            <div className="absolute -top-4 -right-5">
                                <Image 
                                    width={46} 
                                    height={49} 
                                    src={'/img/speechbubble.svg'} 
                                    alt="Seech" />
                            </div>
                        </h5>
                        <p className="text-[15px] pt-4 pb-3">
                            Are you ready to start your therapy journey? Match with one today!
                        </p>
                        <Link href={'/patient'} passHref>
                            <a >
                                <Button title={'START SAYING MORE'} btnSecondary btnOutline fontSize={'text-xl'} />
                            </a>
                        </Link>
                    </div>
                    <div className="md:w-1/2 lg:w-full mt-5 sm:mt-6 lg:mt-6">
                        <h5 className="relative inline-block text-[15px] font-semibold">
                            <span>Join As A Therapist</span>
                            <div className="absolute -top-1 -right-5">
                                <Image 
                                    width={59} 
                                    height={40} 
                                    src={'/img/lip.svg'} 
                                    alt="Seech" />
                            </div>
                        </h5>
                        <p className="text-[15px] pt-4 pb-3">
                            Interested in joining our directory?
                        </p>
                        <Link href={'/therapist'} passHref>
                            <Button title={'REGISTER TODAY'} btnSecondary btnOutline fontSize={'text-xl'} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="">
                <p className="md:hidden lg:block text-[10px] px-10 sm:px-0 sm:text-xs text-center pt-12 sm:pt-8">
                    Copyright &copy; 2020 Start Saying More, LLC. All Rights Reserved. | Privacy Policy | Terms &amp; Conditions
                </p>
            </div>
        </footer>
    )
}

export default Footer;