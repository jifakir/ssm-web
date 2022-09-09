import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Drawer from 'react-modern-drawer';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { FaRegUser, FaUser } from 'react-icons/fa';
import { CgMenu } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/reducers/authReducer';
import Login from '../Auth/Login';
import { useFetchTherapistQuery } from '../../store/api/ssmApi';
import Therapist from '../Auth/Therapist';
import Patient from '../Auth/Patient';
import { useDetectClickOutside } from 'react-detect-click-outside';
import DropdownBody from './Dropdown';
import Dropdown from 'rc-dropdown';

const UserOutline = ({className}) => (
    <div className={className}>
        <svg stroke="currentColor" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z"/>
        </svg>
    </div>
);

const UserFill = ({className}) => (
    <div className={className}>
        <svg stroke="currentColor" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
        </svg>
    </div>
);

const menuList = [
    {
        title: 'Home',
        linkUrl: '/'
    },
    // {
    //     title: 'Find A Therapist',
    //     linkUrl: '/patient'
    // },
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
    const [therapist, setTherapist] = React.useState(false);
    const [patient, setPatient] = React.useState(false);
    const [redirectTo, setRedirectTo] = React.useState('/therapist/profile');
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [tab, setTab] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [profile, setProfile] = React.useState(false);
    
    const { isLoggedIn, userDetails } = useSelector(state => state.auth);
    const { data, isSuccess} = useFetchTherapistQuery();
    
    const dispatch = useDispatch();

    const signOutHandler = () => {
        dispatch(logOut());
        setOpen(false);
        setProfile(false);
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
        setTherapist(state => !state);
        setProfile(false);
    };

    const patientLogin = () => {
        setPatient(state => !state);
        setProfile(false);
    };

    const showProfileHandler = () => {
        setProfile(!profile);
        console.log("Event triggred!")
    }

    const onVisibleChange = (v) => {
        setProfile(v);
    }

    return (
        <div className="w-full py-1 md:py-5 px-5 border-b-[10px] border-primary">
            <Therapist open={therapist} setOpen={setTherapist} />
            <Patient open={patient} setOpen={setPatient} />
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
                        {/* {
                            !isLoggedIn ?
                            (
                            <div onClick={() => setProfile(state => !state)}>
                                <a className={`cursor-pointer transition-all duration-300 ease-out flex items-center hover:underline hover:text-secondary`}>
                                    <FaUser  />
                                    {
                                        profile ?
                                        <MdOutlineKeyboardArrowUp />:
                                        <MdOutlineKeyboardArrowDown  />
                                    }
                                </a>
                            </div>
                            ): */}
                            <Dropdown
                                onVisibleChange={onVisibleChange}
                                visible={profile}
                                overlay={<DropdownBody 
                                    isLoggedIn={isLoggedIn}
                                    userDetails={userDetails}
                                    therapistLogin={therapistLogin}
                                    patientLogin={patientLogin}
                                    signOutHandler={signOutHandler}
                                    profile={profile}
                                    setProfile={setProfile}
                                    showProfileHandler={showProfileHandler}
                                  />}
                                trigger={['click']} >
                                <div id="grand-parent" onClick={showProfileHandler} className={`cursor-pointer text-4xl transition-all duration-300 ease-out flex items-center hover:underline hover:text-secondary ${profile && 'text-secondary'}`}>
                                    {profile ?
                                    <div className='flex items-center'>  
                                        <UserOutline className={`w-7 h-7`} />
                                        <MdOutlineKeyboardArrowUp />
                                    </div>:
                                    <div className='flex items-center'>
                                        <UserFill className={`w-7 h-7`} />
                                        <MdOutlineKeyboardArrowDown  />
                                    </div>}
                                </div>
                            </Dropdown>
                            {/* <button onClick={() => setProfile(state => !state)} className={`cursor-pointer text-4xl transition-all duration-300 ease-out flex items-center hover:underline hover:text-secondary ${profile && 'text-secondary'}`}>
                                
                                    {
                                        profile ?
                                        <>  
                                            <UserOutline className={`w-7 h-7`} />
                                            <MdOutlineKeyboardArrowUp />
                                        </>:
                                        <>
                                            <UserFill className={`w-7 h-7`} />
                                            <MdOutlineKeyboardArrowDown  />
                                        </>
                                    }
                            </button> */}
                        {/* } */}
                    </div>
                    {/* {
                        profile && <DropdownBody
                        isLoggedIn={isLoggedIn}
                        userDetails={userDetails}
                        therapistLogin={therapistLogin}
                        patientLogin={patientLogin}
                        signOutHandler={signOutHandler}
                        profile={profile}
                        setProfile={setProfile}
                        showProfileHandler={showProfileHandler} />
                    } */}
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