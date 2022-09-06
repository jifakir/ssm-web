import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useDetectClickOutside } from 'react-detect-click-outside';

const Dropdown = ({ 
    isLoggedIn, therapistLogin, 
    patientLogin, userDetails, 
    signOutHandler, setProfile, showProfileHandler, profile }) => {
    
    const [clickedOutside, setClickedOutside] = useState(false);
    const myRef = useRef();
    
    return (
        <div id="parent-node"   className={`absolute w-max top-[120%] right-0 z-50`}>
            <div className="bg-white rounded-md shadow-md">
                {
                    !isLoggedIn ?
                    (
                    <>
                        <div className="w-full px-5 py-2.5 text-[15px] rounded-t-md bg-secondary/50 border-b border-black">
                            <h1 className="">Select Profile Type</h1>
                        </div>
                        <div className="px-5 py-2.5 space-y-3 text-[20px]">
                            <h1 onClick={therapistLogin} className="cursor-pointer">Therapist</h1>
                            <h1 onClick={patientLogin} className="cursor-pointer">Patient</h1>
                        </div>
                    </>
                    ):
                    (
                    <>
                        <div className="px-5 py-2.5 text-[20px]">
                            <Link href={`${ userDetails?.role === 1 ? '/therapist/profile' : '/patient/profile'}`}>
                                <a>
                                    Profile
                                </a>
                            </Link>
                            <h1 onClick={() => signOutHandler()} className='cursor-pointer'>
                                Signout
                            </h1>
                        </div>
                    </>
                    )
                }
            </div>
        </div>
    )
}

export default Dropdown;