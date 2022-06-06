import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Drawer from 'react-modern-drawer';
import { FaRegUser, FaUser } from 'react-icons/fa';
import { CgMenu } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../store/reducers/authReducer';
import Login from './Auth/Login';

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
    const [tab, setTab] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full max-h-[120px] py-1 md:py-2 px-5 border-b-8 border-primary">
            <Login open={open} setOpen={setOpen} />
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link href={'/'} className="cursor-pointer" passHref>
                        <div className="relative cursor-pointer transform translate-y-1 w-[80px] h-[73px] md:w-[126px] md:h-[102px]">
                            <Image src={'/img/logo.svg'} alt={'Logo'} layout={'fill'} />
                        </div>
                    </Link>
                    <ul className="hidden lg:flex items-center gap-10 ml-14">
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
                </div>
                <div className="justify-self-end">
                    <div className="hidden lg:block">
                        {
                            !isLoggedIn ?
                            (
                            <div onClick={() => setOpen(true)}>
                                <a className="cursor-pointer transition-all duration-300 ease-out flex items-center hover:underline hover:text-secondary">
                                    <FaUser />
                                    <h4 className="text-sm pl-1">
                                        Provider Login
                                    </h4>
                                </a>
                            </div>
                            ):
                            <div onClick={() => dispatch(logOut())} className="cursor-pointer transition-all duration-300 ease-out flex items-center hover:underline hover:text-secondary">
                                <FaRegUser />
                                <h4 className="text-sm pl-1">
                                    Sign out
                                </h4>
                            </div>
                        }
                        
                    </div>
                    <div className="lg:hidden">
                        <CgMenu onClick={toggleDrawer} className="text-2xl text-secondary" />
                    </div>
                </div>
            </div>
            <Drawer
                    open={isOpen}
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