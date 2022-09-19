import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useFetchPatientQuery, useFetchTherapistQuery, useUploadPictureMutation } from '../../store/api/ssmApi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loader from '../../components/UI/Loader';
import MyersBriggs from '../../components/Therapist/Personality';
import PersonalInfo from '../../components/Patient/PersonalInfo';
import MatchSurvey from '../../components/Patient/MatchSurvey';
import Head from 'next/head';



const PatientProfile = () => {

    const inputRef = useRef();
    const router = useRouter();

    const { isLoggedIn } = useSelector(state => state.auth);
    const {data:profile, refetch, isLoading, isSuccess, isError} = useFetchPatientQuery({},{
        refetchOnMountOrArgChange: true
    });
    const [uploadPicture,{ isLoading:pictureUploading }] = useUploadPictureMutation();
    
    const uploadHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("picture",file);
        await uploadPicture({id:profile?.id,formData});

    };

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

    const { registration_status, personality_type } = profile;
    // if(registration_status !== 'completed'){
    //     router.push('/patient/questionnaire');
    //     return;
    // }
    const { mind, energy, nature, tactics, identity } = personality_type;
    return (
        <div className="w-[90%] mx-auto my-10">
            <Head>
                <title>Patient - Start Saying More</title>
            </Head>
            <div className="lg:flex gap-5">
                <div className="flex flex-col items-center justify-center lg:w-1/3 lg:block">
                    <h1 className="font-sterio text-4xl">Patient Profile</h1>
                    <h4 className="py-3 text-2xl">{profile?.full_name}</h4>
                    <div className="w-60 border-2 border-primary rounded-lg overflow-hidden">
                        <div>
                            <div className="relative h-56">
                                {
                                    pictureUploading ?
                                    <Loader />:
                                    <Image 
                                        src={profile?.profile_picture ? profile?.profile_picture : '/img/profile.png'} 
                                        layout="fill" 
                                        alt="Profile"
                                        objectPosition={'center'} />
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
                    <PersonalInfo profile={profile} />
                    <MatchSurvey profile={profile} />
                </div>
            </div>
        </div>
    )
}

export default PatientProfile;