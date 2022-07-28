import React from 'react';
import { useState } from 'react';
import RadioInput from '../UI/Radio';
import { MdClose, MdEdit } from 'react-icons/md';
import { FaHeadSideVirus } from 'react-icons/fa';
import { personality } from './data';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Button from '../UI/Button';



const MyersBriggs = ({profile}) => {

    const [form, setForm] = useState(false);
    
    const { register, control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {...profile?.personality_type}});
    const [updateTherapist, { isSuccess, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { mind, energy, nature, tactics, identity} = data;
        if(!mind || !energy || !nature || !tactics || !identity) return;
        await updateTherapist({id: profile?.id, personality_type: {...data}, registration_status: 'entered-personality' });
    };

    const { mind, energy, nature, tactics, identity} = profile?.personality_type;

    useEffect(()=> {
        if(isSuccess){
            setForm(false);
        }
    },[isSuccess]);

    return (
        <div className="relative py-5 border-b-2 border-black">
            <div className="absolute top-2 right-0 text-2xl text-secondary cursor-pointer">
                {
                    form ? 
                    <MdClose onClick={() => setForm(false)} className="text-red-500" /> : 
                    <div className="">
                        <MdEdit onClick={() => setForm(true)} className="hidden md:block" />
                        <span className="md:hidden text-sm font-medium underline underline-offset-4">Edit</span>
                    </div>
                }
            </div>
            {
                form ?
                <form id="personality-form" onSubmit={handleSubmit(handleNext)} className="">
                    <h1 className="text-left text-lg my-5">Share your Myers-Brigg Personality Type aspects</h1>
                    <div className="flex text-sm gap-5">
                        {
                            personality.map((itm, idx) => (
                                <div key={`personality_item_${idx}`} className="">
                                    <RadioInput data={itm} control={control} rules={{required: 'Personality is required.'}} />
                                </div>
                            ))
                        }
                    </div>
                    <div className="mt-5">
                        <Button title={'Submit'} btnQnr />
                    </div>
                </form>:
                <div className="flex justify-between items-center">
                    <div className="flex items-center text-primary">
                        <FaHeadSideVirus className='2xl' />
                        <h2 className="pl-2 font-semibold">Myers-Briggs Factors</h2>
                    </div>
                    <div className="flex-1 text-2xl sm:text-4xl font-bold">
                        <h1 className="tracking-[10px] text-center md:tracking-[20px] uppercase">
                            {
                                profile?.personality_type ?
                                (
                                    mind.split('')[0] +
                                    energy.split('')[0] +
                                    nature.split('')[0] +
                                    tactics.split('')[0] + "-"+
                                    identity.split('')[0]
                                ):
                                ''
                            }
                        </h1>
                    </div>
                </div>
            }
        </div>
    )
}

export default MyersBriggs;