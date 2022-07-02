import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { GrCertificate } from 'react-icons/gr';
import { FaEdit, FaGraduationCap, FaHeadSideVirus, FaSpinner } from 'react-icons/fa';
import { MdAccessTime, MdOutlineUpdate, MdEdit, MdOutlineCake, MdOutlineLocationOn, MdClose } from 'react-icons/md';
import { BsGenderTrans, BsTelephone } from 'react-icons/bs';
import { useFetchTherapistQuery } from '../../store/api/ssmApi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Input from '../../components/UI/TextInput';
import { useForm } from 'react-hook-form';
import Select from '../../components/UI/Select';
import Checkbox from '../../components/UI/Checkbox';
import Radio from '../../components/UI/Radio';
import {gender} from './data';
import Button from '../../components/UI/Button';
import { useEffect } from 'react';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';

const Details = ({profile}) => {

    const [details, setdetails] = useState(false);
    const {control, handleSubmit} = useForm({
        defaultValues: {
            date_of_birth: profile?.date_of_birth,
            phone: '',
            gender: profile?.gender,
            user_address: profile?.user_address
        }
    });

    const [updateTherapist, { isSuccess, isLoading, isError, error }] = useUpdateTherapistMutation();

    const detailsSubmitHandler = async (data) => {
        if(!data) return;
        await updateTherapist({ 
            id: profile?.id, 
            ...data,
            registration_status: 'completed' });
    };

    useEffect(() => {
        if(isSuccess){
            setdetails(false);
        }
    },[isSuccess]);
    
    return (
        <div className="relative py-5 border-b-2 border-black">
                        <div className="absolute top-2 right-0 text-2xl text-secondary cursor-pointer">
                            {
                                details ? 
                                <MdClose onClick={() => setdetails(false)} className="text-red-500" /> : 
                                <MdEdit onClick={() => setdetails(true)} />
                            }
                        </div>
                        <div className="pt-5">
                            {
                                details ?
                                <form onSubmit={handleSubmit(detailsSubmitHandler)} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                    <div className="form-control w-full max-w-xs">
                                        <Input
                                            type={'date'} 
                                            control={control}
                                            rules={{
                                                required: "Date of birth is required!"
                                            }}
                                            name={'date_of_birth'}
                                            title={"Date of birth"}
                                            className="cursor-pointer" />
                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <Input
                                            control={control}
                                            name={'phone'}
                                            title={"Phone Number"}
                                            pHolder={'000-000-0000'}

                                            className="cursor-pointer" />
                                    </div>
                                    <div className="w-full mt-5">
                                        <h1 className="my-2 text-left">What is your gender?</h1>
                                        <div className="form-control w-full max-w-xs">
                                            <Radio 
                                                control={control}
                                                rules={{
                                                    required: 'Gender is required.'
                                                }} 
                                                data={gender} />
                                        </div>
                                    </div>
                                    <div className="space-y-2 mt-5">
                                        <div className="form-control w-full max-w-xs">
                                            <Input
                                                control={control}
                                                name={'user_address.line1'}
                                                rules={{
                                                    required: 'Line 1 is required'
                                                }}
                                                pHolder={'Street Address Line 1'}
                                                title={'Address'} />
                                        </div>
                                        <div className="form-control w-full max-w-xs">
                                            <Input 
                                                control={control}
                                                name={'user_address.line2'}
                                                pHolder={'Street Address Line 2'} />
                                        </div>
                                        <div className="form-control w-full max-w-xs">
                                            <Input 
                                                control={control}
                                                name={'user_address.city'}
                                                rules={{
                                                    required: 'City is required'
                                                }}
                                                pHolder={'City'} />
                                        </div>
                                        <div className="form-control w-full max-w-xs relative">
                                            <Input 
                                                control={control}
                                                name={'user_address.state'}
                                                rules={{
                                                    required: 'State is required'
                                                }}
                                                pHolder={'State'}  
                                                className="float-left w-28" />
                                            <Input 
                                                control={control}
                                                name={'user_address.zip_code'}
                                                rules={{
                                                    required: 'Zip Code is required'
                                                }}
                                                pHolder={'Zip Code'}  
                                                className="w-48 absolute top-0 right-0" />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <Button type={'submit'} title={'Update'} btnQnr />
                                    </div>
                                </form>:
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <div className="flex items-center">
                                    <div className="flex font-semibold justify-center items-center text-primary">
                                        <MdOutlineCake className='text-xl' />
                                        <h2 className="pl-2">Date of Birth</h2>
                                    </div>
                                    <div className=" pl-5">
                                        <h3 className="pl-5">{profile?.date_of_birth}</h3>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex font-semibold justify-center items-center text-primary">
                                        <MdOutlineLocationOn className='text-xl' />
                                        <h2 className="pl-2">Address</h2>
                                    </div>
                                    <div className=" pl-5">
                                        
                                            <h3 className="">{
                                                `${profile?.user_address.line1} 
                                                ${profile?.user_address.line2}
                                                ${profile?.user_address.city}
                                                ${profile?.user_address.state}
                                                ${profile?.user_address.zip_code}
                                                `
                                            }</h3>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex font-semibold justify-center items-center text-primary">
                                        <BsTelephone className='text-xl' />
                                        <h2 className="pl-2">Phone Number</h2>
                                    </div>
                                    <div className="pl-5">
                                            <h3 className="">{profile?.phone_number}</h3>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex font-semibold justify-center items-center text-primary">
                                        <BsGenderTrans className='text-xl' />
                                        <h2 className="pl-2">Gender</h2>
                                    </div>
                                    <div className="pl-5">
                                        <h3 className="capitalize">{profile?.gender}</h3>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
    )
}

export default Details;