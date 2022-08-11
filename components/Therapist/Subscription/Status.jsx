import React from 'react';
import { useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import { RiVisaLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useCancelSubscriptionMutation, useFetchSubscriptionStatusQuery } from '../../../store/api/ssmApi';
import Button from '../../UI/Button';
import Cancel from './Cancel';
import Feedback from './Feedback';
import Warning from './Warning';


const Status = ({form, setForm}) => {

    const [cancel, setCancel] = useState(false);
    const [warning,setWarning] = useState(false);
    const [feedback, setFeedback] = useState(false);

    const { userDetails } = useSelector(state => state.auth);

    const { data } = useFetchSubscriptionStatusQuery();

    const handleCancel = () => {
        setCancel(false);
        setWarning(true);
    };
    
    const handleWarning = () => {
        setWarning(false);
        setFeedback(true);
    };

    console.log(data);

    return (
        <div className="">
            {
                cancel &&
                <Cancel 
                    noHandler={()=>setCancel(false)}
                    yesHandler={handleCancel} />
            }

            {
                warning && 
                <Warning
                    noHandler={()=> setWarning(false)}
                    yesHandler={handleWarning}/>
            }

            {
                feedback &&
                <Feedback setForm={setForm} />
            }

            <div className={`relative mt-5 md:mt-0 border-[1.5px] px-2 py-2 md:border-0 rounded-md md:rounded-none border-primary ${(cancel || warning || feedback) ? 'hidden' : 'block'}`}>
                <div className="absolute md:hidden -top-2 md:top-2 right-2 md:right-0 text-2xl text-secondary cursor-pointer">
                    {
                        form ? 
                        <MdClose onClick={() => setForm('')} className="text-red-500 hidden md:block" /> : 
                        <div onClick={() => setForm('status')} className="">
                            <MdEdit className="hidden md:block" />
                            <span className="md:hidden text-sm font-medium underline underline-offset-4">Edit</span>
                        </div>
                    }
                </div>
                <div className="md:flex items-center">
                    <div className="">
                        <h2 className="font-semibold text-sm md:text-base text-primary md:text-black">Status <span className="hidden md:inline-block">:</span></h2>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <h2 className="text-sm font-semibold md:font-medium md:pl-2">Your plan is {data?.status} </h2>
                    </div>
                </div>
                <div className="mt-4">
                    {
                        data?.status === 'active' ?
                        <Button
                            onClick={() => {
                                setCancel(true);
                                setForm('status')
                            }}
                            title={'Cancel'}
                            className="w-full"
                            btnOutline 
                            btnSecondary />:
                        <Button
                            title={'Subscribe'}
                            className="w-full"
                            btnOutline />
                    }
                </div>
            </div>
        </div>
    )
}

export default Status;