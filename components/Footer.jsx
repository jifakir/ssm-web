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
        <footer className="relative bg-neutral/30 pt-5">
            <div className="absolute -z-10 top-0 left-0 h-2/3 md:h-full w-full sm:w-full md:w-1/3">
                <Image src={'/img/footerbg.png'} alt={"Footer Bg"} layout={"fill"} />
            </div>
            <div className="px-[5%] md:px-[10%] lg:flex justify-between">
                <div className="lg:w-2/3 sm:flex justify-between items-center">
                    <div className="sm:w-1/2 py-10">
                        <div className="flex justify-center">
                            <Image src={'/img/ssm-footer.png'} alt="Footer Logo" width={260} height={84} />
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
                    <div className="sm:w-1/2 sm:pr-5">
                        <form action="" className="">
                            <h5 className="text-sm font-semibold text-center sm:text-left">
                                Stay intouch with us!
                            </h5>
                            <div className="flex gap-2 mt-2">
                                <TextInput data={{
                                    name: 'email',
                                    pHolder: 'Email Address'
                                    }} 
                                    register={register}
                                    errors={errors} />
                                <div className="">
                                    <Button title={'SUBMIT'} className="btn-secondary" />
                                </div>
                            </div>
                        </form>
                        <div className="mt-5 text-center sm:text-left">
                            <h5 className="text-sm font-semibold mb-2">
                                Quick Links
                            </h5>
                            <ul className="sm:grid grid-cols-2 text-sm space-y-1">
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
                <div className="lg:w-1/3 lg:border-l border-primary sm:pl-5 mt-5 sm:mt-10 sm:flex lg:block text-center lg:text-left">
                    <div className="sm:w-1/2 lg:w-full">
                        <h5 className="text-sm font-semibold">Find A Therapist</h5>
                        <p className="text-sm py-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                        <Button title={'START SAYING MORE'} className="btn-outline" />
                    </div>
                    <div className="sm:w-1/2 lg:w-full mt-5 sm:mt-0 lg:mt-5">
                        <h5 className="text-sm font-semibold">Find A Therapist</h5>
                        <p className="text-sm py-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                        <Button title={'START SAYING MORE'} className="btn-outline" />
                    </div>
                </div>
            </div>
            <div className="">
                <p className="text-xs text-center py-5">
                    Copyright &copy; 2020 Start Saying More, LLC. All Rights Reserved. | Privacy Policy | Terms &amp; Conditions
                </p>
            </div>
        </footer>
    )
}

export default Footer;