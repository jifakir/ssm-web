import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiVisaLine } from 'react-icons/ri';
import Button from '../../UI/Button';
import RadioInput from '../../UI/Radio';
import PaymentForm from '../PaymentForm';



const UpdatePayment = () => {

    const [add, setAdd] = useState(false);
    const { control } = useForm();

    const visaCard1 = (
        <div className="flex items-center">
            <Image src={'/img/visa.svg'} alt="Visa Logo" width={41} height={32} />
            <span className='pl-2'>ending 1234</span>
        </div>
    );

    const visaCard2 = (
        <div className="flex items-center">
            <Image src={'/img/visa.svg'} alt="Visa Logo" width={41} height={32} />
            <span className='pl-2'>ending 5678</span>
        </div>
    );
    
    return (
        <div className="">
            {
                add ?
                <PaymentForm onCancel={() => setAdd(false)} />
                :
                <form className="mt-5  border-[1.5px] px-2 py-2 md:border-0 rounded-md md:rounded-none border-primary">
                    <h1 className="text-sm lg:text-xl font-medium text-primary">Update Payment Method</h1>
                    <div className="text-sm mt-4">
                        <h2 className="my-1 text-sm md:text-base">Select the default payment method</h2>
                        <svg width="0" height="0">
                            <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                                <stop stopColor="#222357" offset="0%" />
                                <stop stopColor="#254AA5" offset="100%" />
                            </linearGradient>
                        </svg>
                        <RadioInput
                            control={control}
                            data={{
                                name: 'card',
                                options: [
                                    {
                                        label: visaCard1,
                                        value: 'card1'
                                    },
                                    {
                                        label: visaCard2,
                                        value: 'card2'
                                    },
                                ]
                            }} />
                    </div>
                    <p onClick={() => setAdd(true)} className="mt-1 text-xs text-secondary-focus cursor-pointer underline underline-offset-2">+ Add</p>
                    <p className="py-2 text-xs text-black/50 mt-8">Changes may takke a few days to be applied</p>
                    <Button 
                        title={'Save'}
                        className={'w-full'}
                        fontSize="text-2xl"
                        disabled={true}
                        />
                </form>
            }
        </div>
    )
}

export default UpdatePayment;