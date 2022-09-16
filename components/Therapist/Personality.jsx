import React from 'react';
import { useState } from 'react';
import RadioInput from '../UI/Radio';
import { MdClose, MdEdit } from 'react-icons/md';
import { FaHeadSideVirus } from 'react-icons/fa';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Button from '../UI/Button';
import { personality } from '../data';

const MyersBriggs = ({profile}) => {

    const [form, setForm] = useState(false);
    
    const { register, control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {...profile?.personality_type}});
    const [updateTherapist, { isSuccess, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { mind, energy, nature, tactics, identity} = data;
        if(!mind || !energy || !nature || !tactics || !identity) return;
        await updateTherapist({id: profile?.id, personality_type: {...data}, registration_status: 'entered-personality' });
    };

    const { personality_type } = profile;

    useEffect(()=> {
        if(isSuccess){
            setForm(false);
        }
    },[isSuccess]);

    return (
        <div className="relative px-4 py-2.5 md:py-5 border-[1.5px] md:border-0 rounded-md md:rounded-none md:border-b-2 border-primary md:border-black">
            <div className="absolute top-0 md:top-2 right-2 md:right-0 text-2xl text-secondary cursor-pointer">
                {
                    form ? 
                    <MdClose onClick={() => setForm(false)} className="text-red-500" /> : 
                    <div onClick={() => setForm(true)} className="">
                        <MdEdit className="hidden md:block" />
                        <span className="md:hidden text-sm underline underline-offset-4">Edit</span>
                    </div>
                }
            </div>
            {
                form ?
                <form id="personality-form" onSubmit={handleSubmit(handleNext)} className="">
                    <h1 className="text-left text-lg my-5">Myers-Briggs Factors</h1>
                    <div className="flex flex-col md:flex-row text-sm gap-5">
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
                <div className="md:flex justify-between items-center">
                    <div className="flex items-center text-primary">
                        <FaHeadSideVirus className='2xl hidden md:block' />
                        <h2 className="md:pl-2 font-semibold text-sm md:text-base">Myers-Briggs Factors</h2>
                    </div>
                    <div className="flex-1 text-center text-2xl sm:text-4xl font-bold mt-2">
                        <h1 className="tracking-[10px] md:tracking-[20px] uppercase">
                            {
                                profile?.personality_type ?
                                (
                                    personality_type.mind.split('')[0] +
                                    personality_type.energy.split('')[0] +
                                    personality_type.nature.split('')[0] +
                                    personality_type.tactics.split('')[0] + "-"+
                                    personality_type.identity.split('')[0]
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