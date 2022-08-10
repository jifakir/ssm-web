import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Drawer from 'react-modern-drawer';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { FaRegUser, FaUser } from 'react-icons/fa';
import { CgMenu } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../store/reducers/authReducer';
import Login from './Auth/Login';
import { useFetchTherapistQuery } from '../store/api/ssmApi';
import { useEffect } from 'react';

const menuList = [
    {
        title: 'Home',
        linkUrl: '/'
    },
    {
        title: 'Find A Therapist',
        linkUrl: '/patient'
    },
    {
        title: 'Join As A Therapist',
        linkUrl: '/therapist'
    },
    {
        title: 'About',
        linkUrl: '/about'
    },
    {
        title: 'Contact',
        linkUrl: '/contact'
    },
];

const Header = () => {

    const [isOpen, setIsOpen] = React.useState(false);
    const [redirectTo, setRedirectTo] = React.useState('/therapist/profile');
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [tab, setTab] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [profile, setProfile] = React.useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { data, isSuccess} = useFetchTherapistQuery();

    const dispatch = useDispatch();

    const signOutHandler = () => {
        if(isLoggedIn){
            dispatch(logOut())
        }else{
            setOpen(state => !state);
        }
    };
    
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const therapistLogin = () => {
        if(data?.is_subscribed){
            setRedirectTo('/therapist/profile');
        }else{
            setRedirectTo('/therapist/questionnaire');
        }
        setOpen(!open);
        setProfile(false);
    };

    const patientLogin = () => {
        setRedirectTo('/patient/profile');
        setOpen(!open);
        setProfile(false);
    };

    return (
        <div className="w-full py-1 md:py-5 px-5 border-b-[10px] border-primary">
            <Login open={open} setOpen={setOpen} redirectTo={redirectTo} />
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link href={'/'} className="cursor-pointer" passHref>
                        <div className="hidden md:block relative cursor-pointer w-[80px] h-[73px] md:w-[126px] md:h-[102px]">
                            <Image src={'/img/ssmlogo.svg'} alt={'Logo'} layout={'fill'} />
                        </div>
                    </Link>
                    <Link href={'/'} className="cursor-pointer" passHref>
                        <div className="md:hidden relative cursor-pointer w-[160px] h-[52px] py-10">
                            <Image src={'/img/logomobile.svg'} alt={'Logo'} layout={'fill'} />
                        </div>
                    </Link>
                    <ul className="hidden lg:flex items-center gap-10 ml-14">
                        {
                            menuList.map( (menu, idx) => <li 
                                key={`menu_item_${idx}`} 
                                className="cursor-pointer text-lg lg:text-[20px] hover:underline hover:text-secondary transition-all duration-300 ease-out">
                                    <Link href={menu.linkUrl}>
                                        {menu.title}
                                    </Link>
                                </li> )
                        }
                    </ul>
                </div>
                <div className="relative justify-self-end">
                    <div className="hidden lg:block text-3xl">
                        {
                            !isLoggedIn ?
                            (
                            <div onClick={() => setProfile(state => !state)}>
                                <a className="cursor-pointer transition-all duration-300 ease-out flex items-center hover:underline hover:text-secondary">
                                    <FaUser  />
                                    {
                                        profile ?
                                        <MdOutlineKeyboardArrowUp />:
                                        <MdOutlineKeyboardArrowDown  />
                                    }
                                </a>
                            </div>
                            ):
                            <a onClick={() => setProfile(state => !state)} className="cursor-pointer transition-all duration-300 ease-out flex items-center hover:underline hover:text-secondary">
                                <FaUser  />
                                    {
                                        profile ?
                                        <MdOutlineKeyboardArrowUp />:
                                        <MdOutlineKeyboardArrowDown  />
                                    }
                            </a>
                        }
                    </div>
                    <div className={`${profile ? 'block' : 'hidden'} absolute w-max top-full right-0 rounded-md shadow-md z-10 overflow-hidden`}>
                        <div className="bg-white">
                            {
                                !isLoggedIn ?
                                (
                                <>
                                    <div className="w-full px-4 py-2.5 text-[15px] bg-secondary/50 border-b border-black">
                                        <h1 className="">Select Profile Type</h1>
                                    </div>
                                    <div className="px-4 py-2.5 text-[20px]">
                                        <h1 onClick={therapistLogin} className="cursor-pointer">Therapist</h1>
                                        <h1 onClick={patientLogin} className="cursor-pointer">Patient</h1>
                                    </div>
                                </>
                                ):
                                (
                                <>
                                    <div className="px-4 py-2.5 text-[20px]">
                                        <Link href={'/therapist/profile'}>
                                            <a>
                                                Profile
                                            </a>
                                        </Link>
                                        <h1 onClick={signOutHandler} className='cursor-pointer'>
                                            Signout
                                        </h1>
                                    </div>
                                </>
                                )
                            }
                        </div>
                    </div>
                    <div className="lg:hidden cursor-pointer">
                        <CgMenu onClick={toggleDrawer} className="text-4xl text-primary" />
                    </div>
                </div>
            </div>
            <Drawer
                    open={drawerOpen}
                    onClose={toggleDrawer}
                    direction="left"
                >   
                    <div className=" px-5">
                        <div className="relative w-full h-28">
                            <Image src={'/img/logomobile.svg'} alt={'Logo'} layout={'fill'} />
                        </div>
                    </div>
                    <ul className="p-5 text-lg space-y-3">
                        {
                            menuList.map( (menu, idx) => <li 
                                key={`menu_item_${idx}`}
                                onClick={toggleDrawer}
                                className="cursor-pointer hover:underline hover:text-secondary transition-all duration-300 ease-out">
                                    <Link href={menu.linkUrl}>
                                        {menu.title}
                                    </Link>
                                </li> )
                        }
                    </ul>
            </Drawer>
        </div>
    )
}

export default Header;