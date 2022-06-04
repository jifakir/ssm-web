import Image from 'next/image';
import React from 'react';
import { GrCertificate } from 'react-icons/gr';
import { FaEdit, FaGraduationCap, FaHeadSideVirus, FaSpinner } from 'react-icons/fa';
import { MdAccessTime, MdEdit, MdOutlineCake, MdOutlineLocationOn } from 'react-icons/md';
import { BsGenderTrans, BsTelephone } from 'react-icons/bs';
import { useFetchTherapistQuery } from '../../store/api/ssmApi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';



const titles = [
    {
        label: 'Ph.D.',
        value: 'phd'
    },
    {
        label: 'Psy.D.',
        value: 'psyd'
    },
    {
        label: 'M.A.',
        value: 'ma'
    },
    {
        label: 'M.S.',
        value: 'ms'
    },
    {
        label: 'M.S.W.',
        value: 'msw'
    },
    {
        label: 'M.D.',
        value: 'md'
    },
    {
        label: 'Other',
        value: 'other'
    },
]

const TherapistProfile = () => {

    const router = useRouter();
    const { isLoggedIn } = useSelector(state => state.auth);
    const {data:profile, isLoading, isSuccess, isError} = useFetchTherapistQuery();

    if(!isLoggedIn){
        router.push("/login");
    }

    if(isLoading){
        return (
            <div className="flex justify-center items-center min-h-72">
                <FaSpinner className='spin' />
            </div>
        )
    }

    return (
        <div className="w-[90%] mx-auto my-10">
            <div className="md:flex gap-5">
                <div className="flex flex-col items-center justify-center md:w-1/3 md:block">
                    <h1 className="font-sterio text-4xl">Therapist Profile</h1>
                    <h4 className="py-3 text-2xl">{profile?.full_name}</h4>
                    <div className="w-60 border rounded-lg">
                        <div className="px-2 pt-2">
                            <div className="relative h-56">
                                <Image src={'/img/profile.png'} layout="fill" alt="Profile" />
                            </div>
                        </div>
                        <button className="w-full text-primary btn btn-secondary rounded-none rounded-b-lg">
                            upload profile picture
                        </button>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center border-b-2 border-black">
                        <div className="flex items-center text-primary">
                            <FaHeadSideVirus className='2xl' />
                            <h2 className="pl-2 font-semibold">Myers-Briggs Factors</h2>
                        </div>
                        <div className="text-2xl sm:text-4xl font-bold">
                            <h1 className="tracking-[10px] md:tracking-[60px] pt-5">ENFJ</h1>
                        </div>
                        <div className="text-secondary text-2xl cursor-pointer">
                            <MdEdit />
                        </div>
                    </div>
                    {/* Date of Birth */}
                    <div className="relative py-5 border-b-2 border-black">
                        <div className="absolute top-2 right-0 text-2xl text-secondary cursor-pointer">
                            <MdEdit />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-5">
                            <div className="flex items-center">
                                <div className="flex font-semibold justify-center items-center text-primary">
                                    <MdOutlineCake className='text-xl' />
                                    <h2 className="pl-2">Date of Birth</h2>
                                </div>
                                <h3 className="pl-5">{profile?.date_of_birth}</h3>
                            </div>
                            <div className="flex items-center">
                                <div className="flex font-semibold justify-center items-center text-primary">
                                    <MdOutlineLocationOn className='text-xl' />
                                    <h2 className="pl-2">Address</h2>
                                </div>
                                <h3 className="pl-5">{
                                    `${profile?.user_address.line1} 
                                    ${profile?.user_address.line2}
                                    ${profile?.user_address.city}
                                    ${profile?.user_address.state}
                                    ${profile?.user_address.zip_code}
                                    `
                                }</h3>
                            </div>
                            <div className="flex items-center">
                                <div className="flex font-semibold justify-center items-center text-primary">
                                    <BsTelephone className='text-xl' />
                                    <h2 className="pl-2">Phone Number</h2>
                                </div>
                                <h3 className="pl-5">{profile?.phone_number}</h3>
                            </div>
                            <div className="flex items-center">
                                <div className="flex font-semibold justify-center items-center text-primary">
                                    <BsGenderTrans className='text-xl' />
                                    <h2 className="pl-2">Gender</h2>
                                </div>
                                <h3 className="pl-5">{profile?.gender}</h3>
                            </div>
                        </div>
                    </div>
                    {/* Education Section */}
                    <div className="relative py-10 border-b-2 border-black">
                        <div className="absolute top-2 right-0 text-2xl text-secondary cursor-pointer">
                            <MdEdit />
                        </div>
                        <div className="">
                            <div className="flex justify-start">
                                <div className="flex font-semibold justify-center text-primary">
                                    <FaGraduationCap className='text-xl' />
                                    <h2 className="pl-2">Education</h2>
                                </div>
                                <div className="pl-5 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-5">
                                    {
                                        profile?.education?.map((edu, idx) => (
                                            <h4 key={idx} className="">
                                                {edu.degree + ', ' + edu.major + ', ' + edu.school_name}
                                            </h4>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="flex justify-start py-5">
                                <div className="flex font-semibold justify-center text-primary">
                                    <div className="text-2xl">
                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><desc></desc><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="15" cy="15" r="3"></circle><path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5"></path><path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73"></path><line x1="6" y1="9" x2="18" y2="9"></line><line x1="6" y1="12" x2="9" y2="12"></line><line x1="6" y1="15" x2="8" y2="15"></line></svg>
                                    </div>
                                    <h2 className="pl-2">Lincense</h2>
                                </div>
                                <div className="pl-5 flex-1">
                                    <h4 className="">
                                        {
                                            profile?.license
                                        }
                                    </h4>
                                </div>
                            </div>
                            <div className="flex justify-start py-5">
                                <div className="flex font-semibold justify-center text-primary">
                                    <div className="text-2xl">
                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><desc></desc><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="15" cy="15" r="3"></circle><path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5"></path><path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73"></path><line x1="6" y1="9" x2="18" y2="9"></line><line x1="6" y1="12" x2="9" y2="12"></line><line x1="6" y1="15" x2="8" y2="15"></line></svg>
                                    </div>
                                    <h2 className="pl-2">Title(s)</h2>
                                </div>
                                <div className="pl-5 flex-1">
                                    <h4 className="">
                                        {profile?.titles.map(v => {
                                            return v.toUpperCase() + ' '
                                        })} 
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Availability */}
                    <div className="relative py-5">
                        <div className="absolute top-2 right-0 text-2xl text-secondary cursor-pointer">
                            <MdEdit />
                        </div>
                        <div className="">
                            <div className="flex justify-start">
                                <div className="flex font-semibold items-center justify-center text-primary">
                                    <MdAccessTime className='text-xl' />
                                    <h2 className="pl-2">Availability</h2>
                                </div>
                            </div>
                            <div className="pt-5 flex flex-wrap justify-center md:justify-start gap-5">
                                {
                                    ['S','M','T','W','T','F','S'].map((itm, idx) => (
                                        <div key={idx} className="text-xs border-r-2 pr-5 last:border-r-0">
                                            <h1 className="text-2xl text-center leading-8">{itm}</h1>
                                            <p className="flex justify-between">
                                                <span className="">Start:</span> 
                                                <span className=""> &nbsp;09:00AM</span>
                                            </p>
                                            <p className="flex justify-between">
                                                <span className="">End:</span>
                                                <span className="">06:00AM</span></p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TherapistProfile;