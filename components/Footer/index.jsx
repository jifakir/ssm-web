import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TextInput from '../UI/TextInput';
import Button from '../UI/Button';
import { AiFillInstagram, AiFillFacebook, AiOutlineTwitter, AiFillLinkedin } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import Newsletter from './Newsletter';

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

    const mailChimpUrl = process.env.NEXT_PUBLIC_MAILCHIMP_URL;

    return (
        <footer className="relative bg-neutral/30 pb-4 overflow-hidden bg-gradient-to-r from-transparent via-neutral/40 to-transparent">
            <div className="md:hidden absolute -z-10 top-0 left-0 w-full h-full">
                <Image src={'/img/footerbgmobile.svg'} layout="fill" objectFit='fit'  alt={"Footer Bg"} />
            </div>
            {/* <div className="hidden md:block absolute -z-10 -top-5">
                <Image src={'/img/footerbg.svg'} alt={"Footer Bg"} width={686} height={450} />
            </div> */}
            <div className="w-full lg:flex">
                <div className="lg:w-2/5 md:flex justify-between items-center bg-footer_bg bg-contain bg-top-left">
                    <div className="md:w-full py-10 px-5 sm:px-0">
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
                </div>
                <div className="pb-20 w-3/5 flex">
                    <div className="md:w-1/2 md:pr-10 mt-10">
                        <MailchimpSubscribe
                            url={mailChimpUrl}
                            render={(props) => {
                                const { subscribe, status, message } = props || {};
                                return (
                                    <Newsletter
                                     status={status}
                                     message={message}
                                     onValidated={ formData => subscribe( formData ) } />
                                )
                            }} />
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
                    <div className="lg:border-l border-primary sm:pl-10 mt-5 sm:mt-10 lg:block text-center lg:text-left">
                        <div className="md:w-1/2 lg:w-full pr-5">
                            <h5 className="relative text-[15px] font-semibold inline-block">
                                <span>Find A Therapist</span>
                                <div className="absolute -z-10 -top-4 -right-5">
                                    <Image 
                                        width={46} 
                                        height={49} 
                                        src={'/img/speechbubble.svg'} 
                                        alt="Seech" />
                                </div>
                            </h5>
                            <p className="text-[15px] pt-4 pb-3">
                                Are you ready to start your<br className=''/> therapy journey? Match with
                                <br/> one today!
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
                                <div className="absolute -z-10 -top-1 -right-5">
                                    <Image 
                                        width={59} 
                                        height={40} 
                                        src={'/img/lip.svg'} 
                                        alt="Seech" />
                                </div>
                            </h5>
                            <p className="text-[15px] pt-4 pb-3">
                                Interested in joining our <br/>directory?
                            </p>
                            <Link href={'/therapist'} passHref>
                                <Button title={'REGISTER TODAY'} btnSecondary btnOutline fontSize={'text-xl'} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute w-full bottom-5">
                <p className="md:hidden lg:block text-[10px] px-10 sm:px-0 sm:text-xs text-center pt-12 sm:pt-0">
                    Copyright &copy; 2020 Start Saying More, LLC. All Rights Reserved. | Privacy Policy | Terms &amp; Conditions
                </p>
            </div>
        </footer>
    )
}

export default Footer;