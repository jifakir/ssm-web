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
            <div className="absolute -z-10 -top-5">
                <Image src={'/img/footerbg.svg'} alt={"Footer Bg"} width={686} height={450} />
            </div>
            <div className="px-[2%] lg:flex justify-between">
                <div className="lg:w-2/3 md:flex justify-between items-center">
                    <div className="md:w-1/2 py-10 px-5 sm:px-0">
                        <div className="w-full flex justify-center">
                            <Image src={'/img/seclogo.svg'} alt="Footer Logo" width={326} height={106} />
                        </div>
                        <ul className="mt-5 flex justify-center items-center gap-5 text-2xl">
                            {
                                linksData.map(({component, url}, idx) => (
                                    <li key={`footer_link_${idx}`} className="text-primary cursor-pointer">
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
                    </div>
                    <div className="md:w-1/2 md:pr-10">
                        <form onSubmit={handleSubmit(onSubmitHandler)} className="">
                            <h5 className="text-[15px] font-semibold text-center md:text-left">
                                Stay in touch with us!
                            </h5>
                            <div className="flex justify-center items-start gap-2 mt-5 md:mt-2">
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
                                <div className="">
                                    <Button title={'SUBMIT'} fontSize="text-lg sm:text-xl" />
                                </div>
                            </div>
                        </form>
                        <div className="mt-5 text-center md:text-left">
                            <h5 className="text-[15px] font-semibold mb-2 md:mb-2">
                                Quick Links
                            </h5>
                            <ul className="sm:grid grid-cols-2 text-[15px] space-y-1">
                                {
                                    menuList.map( (menu, idx) => <li 
                                        key={`menu_item_${idx}`} 
                                        className="last:text-red-800 cursor-pointer hover:underline hover:text-secondary last:hover:text-error transition-all duration-300 ease-out">
                                            <Link href={menu.linkUrl}>
                                                {menu.title}
                                            </Link>
                                        </li> )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/3 lg:border-l border-primary sm:pl-10 mt-5 sm:mt-10 md:flex lg:block text-center lg:text-left">
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
                                <Button title={'START SAYING MORE'} btnSecondary fontSize={'text-xl'} />
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
                            <Button title={'REGISTER TODAY'} btnSecondary fontSize={'text-xl'} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="">
                <p className="text-xs text-center pt-8">
                    Copyright &copy; 2020 Start Saying More, LLC. All Rights Reserved. | Privacy Policy | Terms &amp; Conditions
                </p>
            </div>
        </footer>
    )
}

export default Footer;