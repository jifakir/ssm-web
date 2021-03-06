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
import { useEffect } from 'react';
import Qualification from '../../components/Therapist/Qualification';
import Details from '../../components/Therapist/Details';
import Loader from '../../components/UI/Loader';
import Availability from '../../components/Therapist/Availibilties';
import MyersBriggs from '../../components/Therapist/Personality';



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

    if(isError){
        return (
            <div className="text-center h-72 min-h-72">
                <h1>Something went wrong reload please.</h1>
            </div>
        )
    }

    const { personality_type: { mind, energy, nature, tactics, identity } } = profile;
    
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
                    <div className="">
                        <MyersBriggs profile={profile} />
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