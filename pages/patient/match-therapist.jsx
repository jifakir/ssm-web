import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/UI/Loader';
import { useFetchTherapistQuery, useMatchTherapistQuery } from '../../store/api/ssmApi';



const MatchTherapist = () => {
    const { userDetails } = useSelector(state => state.auth);
    const {data:profile} = useFetchTherapistQuery();
    const {data, isSuccess, isLoading, isError} = useMatchTherapistQuery({
        patientId: '84befdc9-52bf-4df9-829a-6dd4e6a36649'});
    
    console.log("Match Data: ", data);
    console.log("User Data: ", userDetails);
    console.log("Profile Data: ", profile);
    if(isLoading){
        return (
            <div className="flex justify-center items-center min-h-72 h-72">
                <Loader className='text-primary text-5xl' />
            </div>
        )
    }
    if(isError){
        return (
            <div className="">
                <h1 className="">Something went wrong!</h1>
            </div>
        )
    }
    return (
        <div className="px-10 py-5">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-between">
                {
                    data?.map(therapist => (
                        <div key={therapist.id} className="rounded-lg shadow-lg p-3">
                            <div className="relative w-full h-44">
                                <Image src={'/img/profile.png'} alt="Profile Image" layout='fill' />
                            </div>
                            <div className="text-primary">
                                <h1 className="text-center">{therapist.full_name}</h1>
                            </div>
                            <div className="text-secondary flex justify-between items-center">
                                <div className="">
                                    <span>Rank: <span className="font-medium">{therapist.rank}</span></span>
                                </div>
                                <div className="">
                                    <span>Score:  <span className="font-medium">{therapist.percent_score}</span></span>
                                </div>
                            </div>
                            <div className="">
                                <button className="btn btn-sm w-full">Contact</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MatchTherapist;