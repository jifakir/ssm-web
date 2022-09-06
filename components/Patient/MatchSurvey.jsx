import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { MdAccessTime, MdOutlineUpdate, MdEdit, MdOutlineCake, MdOutlineLocationOn, MdClose } from 'react-icons/md';
import { BsGenderTrans, BsTelephone } from 'react-icons/bs';
import { BiLoaderAlt } from 'react-icons/bi';
import {  useUpdatePatientMutation } from '../../store/api/ssmApi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Input from '../UI/TextInput';
import { useForm } from 'react-hook-form';
import Select from '../UI/Select';
import Checkbox from '../UI/Checkbox';
import Radio from '../UI/Radio';
import { age_preference, gender, is_religion_biased, is_spiritual_biased, race_preference, session_type, specific_concerns, therapy_specializations } from '../data';
import Button from '../UI/Button';
import { useEffect } from 'react';

const MatchSurvey = ({profile}) => {

    const [form, setForm] = useState(false);
    const {control, handleSubmit} = useForm({
        defaultValues: {
            gender: profile?.gender,
            is_spiritual_biased: profile?.is_spiritual_biased,
            is_religion_biased: profile?.is_religion_biased,
            age_preference: `${profile?.age_preference?.head}-${profile?.age_preference?.tail}`,
            session_type: profile?.session_type,
            race_preference: profile?.race_preference,
            specific_concerns: profile?.specific_concerns,
            therapy_specializations: profile?.therapy_specializations
        }
    });

    const [updatePatient, { isSuccess, isLoading, isError, error }] = useUpdatePatientMutation();

    const onSubmit = async (data) => {
        if(!data) return;

        const [head, tail] = data.age_preference.split('-');

        await updatePatient({ 
            id: profile?.id, 
            ...data,
            age_preference: {
                head,
                tail
            },
            specific_concerns: data.specific_concerns.filter(v=>v),
            registration_status: 'completed' });
    };

    useEffect(() => {
        if(isSuccess){
            setForm(false);
        }
    },[isSuccess]);
    
    return (
        <div className="relative mt-5 md:mt-0 px-4 py-2.5 md:py-5 border-[1.5px] md:border-0 rounded-md md:rounded-none border-primary">
                        <div className="absolute top-0 md:top-2 right-2 md:right-0 text-2xl text-secondary cursor-pointer">
                            {
                                form ? 
                                <MdClose onClick={() => setForm(false)} className="text-red-500" /> : 
                                <div className="">
                                    <MdEdit onClick={() => setForm(true)} className="hidden md:block" />
                                    <span className="md:hidden text-sm font-medium underline underline-offset-4">Edit</span>
                                </div>
                            }
                        </div>
                        <h2 className="font-medium">Match Survey Preferences</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex ">
                                        <div className="font-base text-primary">
                                            {/* <MdOutlineCake className='text-xl' /> */}
                                            <h2 className="">Gender Preference</h2>
                                        </div>
                                        <div className="pl-5">
                                            {
                                                !form ? 
                                                gender.options.find(v => v.value === profile?.gender).label:
                                                <div className="form-control w-full max-w-xs">
                                                    <Radio 
                                                        control={control}
                                                        rules={{
                                                            required: 'Gender is required.'
                                                        }} 
                                                        data={gender} />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex ">
                                        <div className="font-base text-primary">
                                            {/* <MdOutlineCake className='text-xl' /> */}
                                            <h2 className="">Spiritual Preference</h2>
                                        </div>
                                        <div className="pl-5">
                                            {
                                                !form ? 
                                                <h3 className="pl-5">{profile?.is_spiritual_biased ? 'Yes' : 'No'}</h3>:
                                                <div className="form-control w-full max-w-xs">
                                                    <Radio 
                                                        control={control}
                                                        data={is_spiritual_biased} />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex ">
                                        <div className="font-base text-primary">
                                            {/* <MdOutlineCake className='text-xl' /> */}
                                            <h2 className="">Age Preference</h2>
                                        </div>
                                        <div className="pl-5">
                                            {
                                                !form ? 
                                                <h3 className="pl-5">{profile?.age_preference && `${profile?.age_preference?.head}-${profile?.age_preference?.tail}`}</h3>:
                                                <div className="form-control w-full max-w-xs">
                                                    <Radio 
                                                        control={control}
                                                        data={age_preference} />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex ">
                                        <div className="font-base text-primary">
                                            {/* <MdOutlineCake className='text-xl' /> */}
                                            <h2 className="">Session Type Preference</h2>
                                        </div>
                                        <div className="pl-5">
                                            {
                                                !form ? 
                                                <h3 className="pl-5 capitalize">{profile?.session_type}</h3>:
                                                <div className="form-control w-full max-w-xs">
                                                    <Radio 
                                                        control={control}
                                                        data={session_type} />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex ">
                                        <div className="font-base text-primary">
                                            {/* <MdOutlineCake className='text-xl' /> */}
                                            <h2 className="">Race Preference</h2>
                                        </div>
                                        <div className="pl-5">
                                            {
                                                !form ? 
                                                <h3 className="pl-5 capitalize">{profile?.race_preference}</h3>:
                                                <div className="form-control w-full max-w-xs">
                                                    <Radio 
                                                        control={control}
                                                        rules={{
                                                            required: 'Gender is required.'
                                                        }} 
                                                        data={race_preference} />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex ">
                                        <div className="font-base text-primary">
                                            {/* <MdOutlineCake className='text-xl' /> */}
                                            <h2 className="">Areas of Concern</h2>
                                        </div>
                                        <div className="pl-5">
                                            {
                                                !form ? 
                                                <div className="">
                                                    {
                                                        profile?.specific_concerns?.map((itm, idx) => {
                                                            return (
                                                                <h3 key={`specific_${idx}`} className="pl-5">
                                                                    {itm} 
                                                                </h3>)
                                                        })
                                                    }
                                                </div>:
                                                <div className="form-control w-full max-w-xs">
                                                    <Checkbox 
                                                        control={control}
                                                        data={specific_concerns} />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex ">
                                        <div className="font-base text-primary">
                                            {/* <MdOutlineCake className='text-xl' /> */}
                                            <h2 className="">Religious Preference</h2>
                                        </div>
                                        <div className="pl-5">
                                            {
                                                !form ? 
                                                <h3 className="pl-5">{profile?.is_religion_biased ? 'Yes' : 'No'}</h3>:
                                                <div className="form-control w-full max-w-xs">
                                                    <Radio 
                                                        control={control}
                                                        data={is_religion_biased} />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex ">
                                        <div className="font-base text-primary">
                                            {/* <MdOutlineCake className='text-xl' /> */}
                                            <h2 className="">Counseling Areas</h2>
                                        </div>
                                        <div className="pl-5">
                                            {
                                                !form ? 
                                                <h3 className="pl-5">{profile?.counseling_areas}</h3>:
                                                <div className="form-control w-full max-w-xs">
                                                    <Checkbox 
                                                        control={control}
                                                        rules={{
                                                            required: 'Gender is required.'
                                                        }} 
                                                        data={counseling_areas} />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={`flex justify-center gap-5 mt-10 ${form ? 'block' : 'hidden'}`}>
                                    <Button 
                                        title={'Resend Matches'}
                                        fontSize="text-3xl"
                                        btnOutline >
                                            {
                                                isLoading ? <BiLoaderAlt className="animate-spin text-2xl mr-2" /> : ''
                                            }
                                    </Button>
                                    <Button
                                        title={'Cancel'}
                                        btnSecondary
                                        fontSize={'text-3xl'}
                                        btnOutline
                                        type="button"
                                        btnLg />
                                </div>
                            </form>
                        </div>
    )
}

export default MatchSurvey;