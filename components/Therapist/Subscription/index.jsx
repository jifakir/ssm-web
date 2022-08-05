import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { GrCertificate } from 'react-icons/gr';
import { FaEdit, FaGraduationCap, FaHeadSideVirus, FaSpinner } from 'react-icons/fa';
import { MdAccessTime, MdOutlineUpdate, MdEdit, MdOutlineCake, MdOutlineLocationOn, MdClose } from 'react-icons/md';
import { BsBookmarks, BsGenderTrans, BsTelephone } from 'react-icons/bs';
import { useFetchTherapistQuery } from '../../../store/api/ssmApi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Input from '../../UI/TextInput';
import { useForm } from 'react-hook-form';
import Select from '../../UI/Select';
import Checkbox from '../../UI/Checkbox';
import Radio from '../../UI/Radio';
import Button from '../../UI/Button';
import { useEffect, useMemo } from 'react';
import { RiVisaLine } from 'react-icons/ri';
import { SiVisa } from 'react-icons/si';
import { useUpdateTherapistMutation } from '../../../store/api/ssmApi';
import RadioInput from '../../UI/Radio';
import InputText from '../../UI/InputText';
import PaymentForm from '../PaymentForm';
import PaymentMethod from './PaymentMethod';
import SubscriptionItem from './Subscription';
import Status from './Status';
import Confirmed from './Confirmed';
import Cancel from './Cancel';
import Warning from './Warning';
import Feedback from './Feedback';
import WelcomeBack from './WelcomeBack';

const Subsciption = ({profile}) => {

    const [form, setForm] = useState(false);
    const {control, handleSubmit} = useForm({
        defaultValues: {
            date_of_birth: profile?.date_of_birth,
            phone: profile?.phone,
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
            setForm(false);
        }
    },[isSuccess]);
    
    return (
        <div className="mt-5 md:mt-0 relative md:px-4 py-2.5 md:py-5">
            <div className="absolute hidden md:block top-1 md:top-2 right-2 md:right-0 text-2xl text-secondary cursor-pointer">
                {
                    form ? 
                    <MdClose onClick={() => setForm(false)} className="text-red-500" /> : 
                    <div onClick={() => setForm(true)} className="">
                        <MdEdit className="hidden md:block" />
                        <span className="md:hidden text-sm font-medium underline underline-offset-4">Edit</span>
                    </div>
                }
            </div>
            <div className="">
                {
                    form ?
                    <form onSubmit={handleSubmit(detailsSubmitHandler)} className="">
                        
                    </form>:
                    <div className="md:grid lg:grid-cols-2 gap-5">
                        <div className="flex justify-start col-span-2">
                            <div className="flex font-semibold items-center justify-center text-primary">
                                <BsBookmarks className='text-xl hidden md:block' />
                                <h2 className="md:pl-2 hidden md:block">Subscription</h2>
                            </div>
                        </div>
                        {/* ++++++++ Annual Subscription ++++++++ */}
                        <SubscriptionItem />
                        {/* Payment method */}
                        <PaymentMethod />
                        {/* Status */}
                        <Status />
                    </div>
                }
            </div>
            {/* <Confirmed />
            <Cancel />
            <Warning />
            <Feedback />
            <WelcomeBack /> */}
        </div>
    )
}

export default Subsciption;