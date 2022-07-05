import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { GrCertificate } from 'react-icons/gr';
import { FaEdit, FaGraduationCap, FaHeadSideVirus, FaSpinner } from 'react-icons/fa';
import { MdAccessTime, MdOutlineUpdate, MdEdit, MdOutlineCake, MdOutlineLocationOn, MdClose } from 'react-icons/md';
import { BsGenderTrans, BsTelephone } from 'react-icons/bs';
import { useFetchTherapistQuery, useUploadPictureMutation } from '../../store/api/ssmApi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Input from '../../components/UI/TextInput';
import { useForm } from 'react-hook-form';
import Select from '../../components/UI/Select';
import Checkbox from '../../components/UI/Checkbox';
import Radio from '../../components/UI/Radio';
import {gender} from './../../components/data';
import Button from '../../components/UI/Button';
import { useEffect } from 'react';
import Qualification from '../../components/Therapist/Qualification';
import Details from '../../components/Therapist/Details';
import Loader from '../../components/UI/Loader';
import Availability from '../../components/Therapist/Availibilties';
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
    const [briggs, setBriggs] = useState('efrj');
    const [factor, setFactor] = useState(false);
    const [details, setdetails] = useState(false);
    const [qualification, setQualification] = useState(false);
    const [availibility, setAvailability] = useState(false);
    const inputRef = useRef();
    const router = useRouter();

    const {control} = useForm();
    const { isLoggedIn } = useSelector(state => state.auth);
    const {data:profile, refetch, isLoading, isSuccess, isError} = useFetchTherapistQuery({},{
        refetchOnMountOrArgChange: true
    });
    const [uploadPicture,{ isLoading:pictureUploading }] = useUploadPictureMutation();
    
    const uploadHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("picture",file);
        await uploadPicture({id:profile?.id,formData});

    };

    // Side Effects
    
    useEffect(() => {
        refetch();
        if(isSuccess && !profile?.is_subscribed){
            router.push('/therapist/questionnaire');
        }
    },[]);

    useEffect(()=> {
        if(!isLoggedIn){
            router.push("/");
        }
    },[isLoggedIn]);

    if(isLoading){
        return (
            <div className="flex justify-center items-center min-h-72 h-72">
                <Loader />
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
                                {
                                    pictureUploading ?
                                    <Loader />:
                                    <Image src={profile?.profile_picture ? profile?.profile_picture : '/img/profile.png'} layout="fill" alt="Profile" />
                                }
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
                                    value={briggs}
                                    control={control}
                                    name={'factor'}
                                    pHolder={'Factors'}
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
                   
                    <Details profile={profile} />
                    {/* Education Section */}
                    <div className="relative py-10 border-b-2 border-black">
                        <Qualification profile={profile} />
                    </div>
                    {/* Availability */}
                    <div className="mt-6">
                        <Availability profile={profile} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TherapistProfile;