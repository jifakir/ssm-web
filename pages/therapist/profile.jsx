import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { GrCertificate } from 'react-icons/gr';
import { FaEdit, FaGraduationCap, FaHeadSideVirus, FaSpinner } from 'react-icons/fa';
import { MdAccessTime, MdOutlineUpdate, MdEdit, MdOutlineCake, MdOutlineLocationOn } from 'react-icons/md';
import { BsGenderTrans, BsTelephone } from 'react-icons/bs';
import { useFetchTherapistQuery } from '../../store/api/ssmApi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Input from '../../components/UI/TextInput';
import { useForm } from 'react-hook-form';
import Select from '../../components/UI/Select';
import Checkbox from '../../components/UI/Checkbox';


const week = [
    {
        label: 'Monday',
        value: 'monday'
    },
    {
        label: 'Tuesday',
        value: 'tuesday'
    },
    {
        label: 'Wednesday',
        value: 'wednesday'
    },
    {
        label: 'Thursday',
        value: 'thursday'
    },
    {
        label: 'Friday',
        value: 'friday'
    },
    {
        label: 'Saturday',
        value: 'saturday'
    },
    {
        label: 'Sunday',
        value: 'sunday'
    },
]


const pmTime = [
    {
        label: '01:00 PM',
        value: '01:00pm',
    },
    {
        label: '02:00 PM',
        value: '02:00pm',
    },
    {
        label: '03:00 PM',
        value: '03:00pm',
    },
    {
        label: '04:00 PM',
        value: '04:00pm',
    },
    {
        label: '05:00 PM',
        value: '05:00pm',
    },
    {
        label: '06:00 PM',
        value: '06:00pm',
    },
    {
        label: '07:00 PM',
        value: '07:00pm',
    },
    {
        label: '08:00 PM',
        value: '08:00pm',
    },
    {
        label: '09:00 PM',
        value: '09:00pm',
    },
    {
        label: '10:00 PM',
        value: '10:00pm',
    },
    {
        label: '11:00 PM',
        value: '11:00pm',
    },
    {
        label: '12:00 PM',
        value: '12:00pm',
    },
];


const amTime = [
    {
        label: '01:00 AM',
        value: '01:00pm',
    },
    {
        label: '02:00 AM',
        value: '02:00pm',
    },
    {
        label: '03:00 AM',
        value: '03:00pm',
    },
    {
        label: '04:00 AM',
        value: '04:00pm',
    },
    {
        label: '05:00 AM',
        value: '05:00pm',
    },
    {
        label: '06:00 AM',
        value: '06:00pm',
    },
    {
        label: '07:00 AM',
        value: '07:00pm',
    },
    {
        label: '08:00 AM',
        value: '08:00pm',
    },
    {
        label: '09:00 AM',
        value: '09:00pm',
    },
    {
        label: '10:00 AM',
        value: '10:00pm',
    },
    {
        label: '11:00 AM',
        value: '11:00pm',
    },
    {
        label: '12:00 AM',
        value: '12:00pm',
    },
];


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

    const [imgUrl, setImgUrl] = useState();
    const [factor, setFactor] = useState(false);
    const [details, setdetails] = useState(false);
    const [qualification, setQualification] = useState(false);
    const [availibility, setAvailability] = useState(false);
    const inputRef = useRef();
    const router = useRouter();
    const { isLoggedIn } = useSelector(state => state.auth);
    const {data:profile, isLoading, isSuccess, isError} = useFetchTherapistQuery();
    const { register, watch, control, formState: {errors} } = useForm();

    const uploadHandler = (e) => {

        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const url = reader.result;
            setImgUrl(url);
        }
        reader.onerror = (error) => {
            console.log(error);
        }

    };

    if(!isLoggedIn){
        router.push("/");
    }

    if(isLoading){
        return (
            <div className="flex justify-center items-center min-h-72 h-72">
                <FaSpinner className='animate-spin text-primary text-5xl' />
            </div>
        )
    }

    return (
        <div className="w-[90%] mx-auto my-10">
            <div className="lg:flex gap-5">
                <div className="flex flex-col items-center justify-center lg:w-1/3 lg:block">
                    <h1 className="font-sterio text-4xl">Therapist Profile</h1>
                    <h4 className="py-3 text-2xl">{profile?.full_name}</h4>
                    <div className="w-60 border rounded-lg overflow-hidden">
                        <div>
                            <div className="relative h-56">
                                <Image src={imgUrl ? imgUrl : '/img/profile.png'} layout="fill" alt="Profile" />
                            </div>
                        </div>
                        <input ref={inputRef} onChange={uploadHandler} type="file" className="hidden" />
                        <button onClick={() => inputRef.current.click()} className="w-full text-primary btn btn-secondary rounded-none rounded-b-lg">
                            upload profile picture
                        </button>
                    </div>
                </div>
                <div className="pt-10 flex-1">
                    <div className="flex justify-between items-center border-b-2 border-black">
                        <div className="flex items-center text-primary">
                            <FaHeadSideVirus className='2xl' />
                            <h2 className="pl-2 font-semibold">Myers-Briggs Factors</h2>
                        </div>
                        <div className="text-2xl sm:text-4xl font-bold">
                            {
                                factor ? 
                                <Input 
                                    register={register} 
                                    value={'EFRJ'} 
                                    errors={errors} 
                                    data={{name: 'factor', pHolder: 'name'}}
                                    className="mb-2" /> : (
                                <h1 className="tracking-[10px] md:tracking-[60px] pt-5">
                                    EFRJ
                                </h1>
                                )
                            }
                        </div>
                        <div className="text-secondary text-2xl cursor-pointer">
                            {
                                factor ? 
                                <MdOutlineUpdate onClick={() => setFactor(false)} /> : 
                                <MdEdit onClick={() => setFactor(true)} />
                            }
                        </div>
                    </div>
                    {/* Date of Birth */}
                    <div className="relative py-5 border-b-2 border-black">
                        <div className="absolute top-2 right-0 text-2xl text-secondary cursor-pointer">
                            {
                                details ? 
                                <MdOutlineUpdate onClick={() => setdetails(false)} /> : 
                                <MdEdit onClick={() => setdetails(true)} />
                            }
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-5">
                            <div className="flex items-center">
                                <div className="flex font-semibold justify-center items-center text-primary">
                                    <MdOutlineCake className='text-xl' />
                                    <h2 className="pl-2">Date of Birth</h2>
                                </div>
                                <div className=" pl-5">
                                    {
                                    details ? 
                                    <Input 
                                        register={register} 
                                        errors={errors} 
                                        type="date"
                                        data={{name: 'date_of_birth', pHolder: 'Date'}}
                                        className="w-52" /> : 
                                    <h3 className="pl-5">{profile?.date_of_birth}</h3>
                                    }
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex font-semibold justify-center items-center text-primary">
                                    <MdOutlineLocationOn className='text-xl' />
                                    <h2 className="pl-2">Address</h2>
                                </div>
                                <div className=" pl-5">
                                    {
                                    details ? 
                                    <Input 
                                        register={register} 
                                        errors={errors}
                                        data={{name: 'date_of_birth', pHolder: 'Address'}}
                                        className="w-52" /> : 
                                        <h3 className="">{
                                            `${profile?.user_address.line1} 
                                            ${profile?.user_address.line2}
                                            ${profile?.user_address.city}
                                            ${profile?.user_address.state}
                                            ${profile?.user_address.zip_code}
                                            `
                                        }</h3>
                                    }
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex font-semibold justify-center items-center text-primary">
                                    <BsTelephone className='text-xl' />
                                    <h2 className="pl-2">Phone Number</h2>
                                </div>
                                <div className="pl-5">
                                    {
                                        details ? 
                                        <Input 
                                            register={register} 
                                            errors={errors}
                                            data={{name: 'date_of_birth', pHolder: 'Phone Number'}}
                                            className="w-52" /> : 
                                            <h3 className="">{profile?.phone_number}</h3>
                                    }
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex font-semibold justify-center items-center text-primary">
                                    <BsGenderTrans className='text-xl' />
                                    <h2 className="pl-2">Gender</h2>
                                </div>
                                <div className="pl-5">
                                    {
                                        details ? 
                                        <Input 
                                            register={register} 
                                            errors={errors}
                                            data={{name: 'gender', pHolder: 'eg: male'}}
                                            className="w-52" /> : 
                                            <h3 className="">{profile?.gender}</h3>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* Education Section */}
                    <div className="relative py-10 border-b-2 border-black">
                        <div className="absolute top-2 right-0 text-2xl text-secondary cursor-pointer">
                            {
                                qualification ? 
                                <MdOutlineUpdate onClick={() => setQualification(false)} /> : 
                                <MdEdit onClick={() => setQualification(true)} />
                            }
                        </div>
                        <div className="">
                            <div className="flex justify-start items-center">
                                <div className="flex font-semibold justify-center text-primary">
                                    <FaGraduationCap className='text-xl' />
                                    <h2 className="pl-2">Education</h2>
                                </div>
                                <div className=" pl-5">
                                    {
                                    qualification ? 
                                        <div className='flex justify-between gap-2'>
                                            <Input 
                                            register={register} 
                                            errors={errors}
                                            data={{name: 'date_of_birth', pHolder: 'Degree'}}
                                            className="w-52" />
                                            <Input 
                                            register={register} 
                                            errors={errors}
                                            data={{name: 'date_of_birth', pHolder: 'Major'}}
                                            className="w-52" />
                                            <Input 
                                            register={register} 
                                            errors={errors}
                                            data={{name: 'date_of_birth', pHolder: 'School'}}
                                            className="w-52" />
                                        </div> : 
                                        profile?.education?.map((edu, idx) => (
                                            <h4 key={idx} className="">
                                                {edu.degree + ', ' + edu.major + ', ' + edu.school_name}
                                            </h4>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="flex justify-start py-5">
                                <div className="flex items-center font-semibold justify-center text-primary">
                                    <div className="text-2xl">
                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><desc></desc><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="15" cy="15" r="3"></circle><path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5"></path><path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73"></path><line x1="6" y1="9" x2="18" y2="9"></line><line x1="6" y1="12" x2="9" y2="12"></line><line x1="6" y1="15" x2="8" y2="15"></line></svg>
                                    </div>
                                    <h2 className="pl-2">Lincense</h2>
                                </div>
                                <div className="pl-5 flex-1">
                                    {
                                        qualification ? 
                                        <Input 
                                            register={register} 
                                            errors={errors}
                                            data={{name: 'gender', pHolder: 'eg: male'}}
                                            className="w-52" /> : 
                                            <h4 className="">
                                                {
                                                    profile?.license_type
                                                }
                                            </h4>
                                    }
                                </div>
                            </div>
                            <div className="flex items-center justify-start py-2">
                                <div className="flex font-semibold justify-center text-primary">
                                    <div className="text-2xl">
                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><desc></desc><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="15" cy="15" r="3"></circle><path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5"></path><path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73"></path><line x1="6" y1="9" x2="18" y2="9"></line><line x1="6" y1="12" x2="9" y2="12"></line><line x1="6" y1="15" x2="8" y2="15"></line></svg>
                                    </div>
                                    <h2 className="pl-2">Title(s)</h2>
                                </div>
                                <div className="pl-5 flex-1">
                                    {
                                        qualification ? 
                                        <Input 
                                            register={register} 
                                            errors={errors}
                                            data={{name: 'gender', pHolder: 'eg: male'}}
                                            className="w-52" /> : 
                                            <h4 className="">
                                                {profile?.titles.map(v => {
                                                    return v.toUpperCase() + ' '
                                                })} 
                                            </h4>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Availability */}
                    <div className="relative py-5">
                        <div className="absolute top-2 right-0 text-2xl text-secondary cursor-pointer">
                            {
                                availibility ? 
                                <MdOutlineUpdate onClick={() => setAvailability(false)} /> : 
                                <MdEdit onClick={() => setAvailability(true)} />
                            }
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
                                    availibility ? 
                                    (
                                        <div className="text-left text-sm flex gap-5">
                                            <div className="w-1/5">
                                                <h1 className="text-lg my-2">Availability</h1>
                                                <Checkbox register={register} errors={errors} data={{name: 'day', options: week }} />
                                            </div>
                                            <div className={`flex gap-10 ${!watch('day') ? 'hidden' : 'block'}`}>
                                                <div className="mt-1 w-40">
                                                    <h3 className="my-2">M-Start Time</h3>
                                                    <Select control={control} data={{name: 'start_time', options: pmTime}} />
                                                </div>
                                                <div className="mt-1 w-40">
                                                    <h3 className="my-2">M-End Time</h3>
                                                    <Select control={control} data={{name: 'end_time', options: amTime}} />
                                                </div>
                                            </div>
                                        </div>
                                    ) : 
                                    (
                                        profile?.availabilities?.map((itm, idx) => (
                                            <div key={idx} className="text-xs border-r-2 pr-5 last:border-r-0">
                                                <h1 className="text-2xl text-center leading-8 capitalize">{itm.day.split('')[0]}</h1>
                                                <p className="flex justify-between">
                                                    <span className="">Start:</span> 
                                                    <span className=""> &nbsp;{itm.start_time}</span>
                                                </p>
                                                <p className="flex justify-between">
                                                    <span className="">End:</span>
                                                    <span className="">{itm.end_time}</span>
                                                </p>
                                            </div>
                                        ))
                                    )
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