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
        url: '/'
    },
    {
        component: <AiFillFacebook />,
        url: '/'
    },
    {
        component: <AiOutlineTwitter />,
        url: '/'
    },
    {
        component: <AiFillLinkedin />,
        url: '/'
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
        linkUrl: '/'
    },
    {
        title: 'Donate',
        linkUrl: '/'
    },
    {
        title: 'Emergency Resources',
        linkUrl: '/'
    },
];

const Footer = () => {

    const { register, watch, handleSubmit, formState: {errors}} = useForm();

    return (
        <footer className="relative bg-neutral/30 py-4 overflow-hidden ">
            <div className="absolute -z-10 -top-5">
                <Image src={'/img/footerbg.svg'} alt={"Footer Bg"} width={686} height={450} />
            </div>
            <div className="px-[2%] lg:flex justify-between">
                <div className="lg:w-2/3 sm:flex justify-between items-center">
                    <div className="sm:w-1/2 py-10">
                        <div className="w-full flex justify-center">
                            <Image src={'/img/seclogo.svg'} alt="Footer Logo" width={326} height={106} />
                        </div>
                        <ul className="mt-5 flex justify-center items-center gap-5 text-2xl">
                            {
                                linksData.map(({component, url}, idx) => (
                                    <li key={`footer_link_${idx}`} className="text-primary cursor-pointer">
                                        <Link href={url} passHref>
                                            {
                                                component
                                            }
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="sm:w-1/2 sm:pr-10">
                        <form action="" className="">
                            <h5 className="text-[15px] font-semibold text-center sm:text-left">
                                Stay in touch with us!
                            </h5>
                            <div className="flex gap-2 mt-2">
                                <TextInput data={{
                                    name: 'email',
                                    pHolder: 'Email Address'
                                    }} 
                                    inputLg
                                    register={register}
                                    errors={errors} />
                                <div className="">
                                    <Button title={'SUBMIT'} className="btn-secondary" />
                                </div>
                            </div>
                        </form>
                        <div className="mt-5 text-center sm:text-left">
                            <h5 className="text-[15px] font-semibold mb-2">
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
                <div className="lg:w-1/3 lg:border-l border-primary sm:pl-10 mt-5 sm:mt-10 sm:flex lg:block text-center lg:text-left">
                    <div className="sm:w-1/2 lg:w-full">
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
                        <Button title={'START SAYING MORE'} btnSecondary />
                    </div>
                    <div className="sm:w-1/2 lg:w-full mt-5 sm:mt-0 lg:mt-6">
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
                        <Button title={'REGISTER TODAY'} btnSecondary />
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