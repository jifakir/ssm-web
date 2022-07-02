import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Drawer from 'react-modern-drawer';
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
    const [redirectTo, setRedirectTo] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [tab, setTab] = React.useState(0);
    const [open, setOpen] = React.useState(false);
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
        setDrawerOpen(!isOpen);
    };

    return (
        <div className="w-full py-1 md:py-5 px-5 border-b-[10px] border-primary">
            <Login open={open} setOpen={setOpen} redirectTo={data?.is_subscribed ? '/therapist/profile' : '/therapist/questionnaire'} />
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link href={'/'} className="cursor-pointer" passHref>
                        <div className="relative cursor-pointer w-[80px] h-[73px] md:w-[126px] md:h-[102px]">
                            <Image src={'/img/ssmlogo.svg'} alt={'Logo'} layout={'fill'} />
                        </div>
                    </Link>
                    <ul className="hidden lg:flex items-center gap-10 ml-14">
                        {
                            menuList.map( (menu, idx) => <li 
                                key={`menu_item_${idx}`} 
                                className="cursor-pointer text-[20px] hover:underline hover:text-secondary transition-all duration-300 ease-out">
                                    <Link href={menu.linkUrl}>
                                        {menu.title}
                                    </Link>
                                </li> )
                        }
                    </ul>
                </div>
                <div className="justify-self-end">
                    <div onClick={signOutHandler} className="hidden lg:block text-[20px]">
                        {
                            !isLoggedIn ?
                            (
                            <div >
                                <a className="cursor-pointer transition-all duration-300 ease-out flex items-center hover:underline hover:text-secondary">
                                    <FaUser className='text-3xl' />
                                    <h4 className="pl-1">
                                        Provider Login
                                    </h4>
                                </a>
                            </div>
                            ):
                            <div className="cursor-pointer transition-all duration-300 ease-out flex items-center hover:underline hover:text-secondary">
                                <FaRegUser className='text-3xl' />
                                <h4 className="pl-1">
                                    Sign out
                                </h4>
                            </div>
                        }
                    </div>
                    <div className="lg:hidden">
                        <CgMenu onClick={toggleDrawer} className="text-2xl text-primary" />
                    </div>
                </div>
            </div>
            <Drawer
                    open={drawerOpen}
                    onClose={toggleDrawer}
                    direction="left"
                >   
                    <div className="">
                        <div className="relative w-2/3 h-28">
                            <Image src={'/img/logo.svg'} alt={'Logo'} layout={'fill'} />
                        </div>
                    </div>
                    <ul className="p-5 text-lg space-y-3">
                        {
                            menuList.map( (menu, idx) => <li 
                                key={`menu_item_${idx}`} 
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