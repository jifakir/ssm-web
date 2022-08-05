import React from 'react';
import { useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import { RiVisaLine } from 'react-icons/ri';
import Button from '../../UI/Button';


const Status = () => {

    const [form, setForm] = useState();
    
    return (
        <div className="relative mt-5 md:mt-0 border-[1.5px] px-2 py-2 md:border-0 rounded-md md:rounded-none border-primary">
            <div className="absolute md:hidden -top-2 md:top-2 right-2 md:right-0 text-2xl text-secondary cursor-pointer">
                {
                    form ? 
                    <MdClose onClick={() => setForm(false)} className="text-red-500" /> : 
                    <div onClick={() => setForm(true)} className="">
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
                    <h2 className="text-sm font-semibold md:font-medium md:pl-2">Your plan is inactive</h2>
                </div>
            </div>
            <div className="mt-4 md:hidden">
                <Button
                    title={'Activate'}
                    className="w-full"
                    btnOutline />
            </div>
        </div>
    )
}

export default Status;