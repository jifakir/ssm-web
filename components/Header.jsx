import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Drawer from 'react-modern-drawer';
import { FaRegUser, FaUser } from 'react-icons/fa';
import { CgMenu } from 'react-icons/cg';
import { useSelector } from 'react-redux';

const menuList = [
    {
        title: 'Home',
        linkUrl: '/'
    },
    {
        title: 'Find A Therapist',
        linkUrl: '/therapist'
    },
    {
        title: 'Join As A Therapist',
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
];

const Header = () => {

    const [isOpen, setIsOpen] = React.useState(true);
    const { isLoggedIn } = useSelector(state => state.auth);


    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full max-h-[120px] py-2 px-2 border-b-8 border-primary">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="relative w-24 h-16">
                        <Image src={'/img/logo.svg'} alt={'Logo'} layout={'fill'} />
                    </div>
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
                        <Link href={'/login'}>
                            <a className="transition-all duration-300 ease-out flex items-center hover:underline hover:text-secondary">
                                {
                                    !isLoggedIn ?
                                    (
                                    <>
                                        <FaUser />
                                        <h4 className="text-sm pl-1">
                                            Provider Login
                                        </h4>
                                    </>
                                    ):
                                    <>
                                        <FaRegUser />
                                        <h4 className="text-sm pl-1">
                                            Sign out
                                        </h4>
                                    </>
                                }
                            </a>
                        </Link>
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