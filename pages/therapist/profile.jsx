import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { GrCertificate } from 'react-icons/gr';
import { FaEdit, FaGraduationCap, FaHeadSideVirus, FaSpinner } from 'react-icons/fa';
import { MdAccessTime, MdOutlineUpdate, MdEdit, MdOutlineCake, MdOutlineLocationOn, MdClose, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BsGenderTrans, BsTelephone } from 'react-icons/bs';
import { useFetchSubscriptionsQuery, useFetchTherapistQuery, useUploadPictureMutation } from '../../store/api/ssmApi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Input from '../../components/UI/TextInput';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Qualification from '../../components/Therapist/Qualification';
import Details from '../../components/Therapist/Details';
import Loader from '../../components/UI/Loader';
import Availability from '../../components/Therapist/Availibilties';
import MyersBriggs from '../../components/Therapist/Personality';
import Subsciption from '../../components/Therapist/Subscription';
import Select from '../../components/UI/Select';
import Button from '../../components/UI/Button';
import Head from 'next/head';


const TherapistProfile = () => {

    const [option, setOption] = useState('Personal Information');
    const [expand, setExpand] = useState(false);
    const [imgUrl, setImgUrl] = useState();
    const [briggs, setBriggs] = useState('efrj');
    const [factor, setFactor] = useState(false);
    const [details, setdetails] = useState(false);
    const [qualification, setQualification] = useState(false);
    const [availibility, setAvailability] = useState(false);
    const inputRef = useRef();
    const router = useRouter();
    const { control } = useForm();
    const { isLoggedIn } = useSelector(state => state.auth);
    const {data:profile, refetch, isLoading, isSuccess, isError} = useFetchTherapistQuery({},{
        refetchOnMountOrArgChange: true
    });
    const { data:subscriptions } = useFetchSubscriptionsQuery();
    const [uploadPicture,{ isLoading:pictureUploading }] = useUploadPictureMutation();
    
    const uploadHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("picture",file);
        await uploadPicture({id:profile?.id,formData});

    };

    const optionHandler = (value) => {
        setOption(value);
        setExpand(false);
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoggedIn]);

    if(isLoading){
        return (
            <div className="flex justify-center items-center min-h-72 h-72">
                <Loader />
            </div>
        )
    }

    if(isError){
        return (
            <div className="text-center h-72 min-h-72">
                <h1>Something went wrong reload please.</h1>
            </div>
        )
    }

    if(!profile?.is_subscribed){
        return (
            <div className="w-full flex justify-center items-center h-60">
                <div className="text-center">
                    <p className="text-lg mb-5 text-primary">You need to complete questionnaire and subscription first</p>
                    <Link href={'/therapist'} passHref><Button > Go to subscribe </Button></Link>
                </div>
            </div>
        )
    }
    
    const options = ['Personal Information', 'Professional Information', 'Availability', 'Subscription Plan'];
    

    return (
    <div className="">
        <Head>
            <title>Therapist - Start Saying More</title>
        </Head>
        <div className="border-b md:hidden">
            <div onClick={() => setExpand(state => !state)} className="relative px-4 py-3.5 text-xl border-t-2 cursor-pointer">
                {option}
                <span className="absolute top-1/2 transform -translate-y-1/2 right-2">
                    <MdOutlineKeyboardArrowDown className='text-3xl text-neutral' />
                </span>
            </div>
            <ul className={`transition-height duration-500 ease-in-out overflow-hidden ${expand ? 'h-[234px]' : 'h-0'}`}>
                {
                    
                    options.map((v,idx) => <li 
                        key={`dropdown_${idx}`}
                        onClick={() => optionHandler(v)} 
                        className="px-4 py-3.5 text-xl border-t-2 cursor-pointer">
                            {v}
                        </li>)
                }
            </ul>
        </div>
        <div className="w-[90%] mx-auto my-10">
            
            <div className="lg:flex gap-5">
                <div className="flex flex-col items-center justify-center lg:w-1/3 lg:block">
                    <h1 className="font-sterio text-4xl">Therapist Profile</h1>
                    <h4 className="py-3 text-2xl">{profile?.full_name}</h4>
                    <div className="w-60 border-2 border-primary rounded-lg overflow-hidden">
                        <div>
                            <div className="relative h-56 w-52">
                                {
                                    pictureUploading ?
                                    <Loader />:
                                    <Image 
                                        src={profile?.profile_picture ? profile?.profile_picture : '/img/profile.png'} 
                                        layout="fill"
                                        objectFit='cover' 
                                        alt="Profile" />
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
                    <div className={`${option === options[0] ? 'block' : 'hidden md:block'}`}>
                        <MyersBriggs profile={profile} />
                        <Details profile={profile} />
                    </div>
                    {/* Education Section */}
                    <div className={`${option === options[1] ? 'block' : 'hidden md:block'}`}>
                        <Qualification profile={profile} />
                    </div>
                    {/* Availability */}
                    <div className={`${option === options[2] ? 'block' : 'hidden md:block'}`}>
                        <Availability profile={profile} />
                    </div>
                    { /* Subscription */}
                    <div className={`${option === options[3] ? 'block' : 'hidden md:block'}`}>
                        <Subsciption profile={profile} />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default TherapistProfile;