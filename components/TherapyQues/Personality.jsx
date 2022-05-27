import React from 'react';
import RadioInput from '../../components/UI/Radio';
import Button from '../UI/Button';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';


const Personality = ({ step, setStep }) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { mind, energy, nature, tactics, identity} = data;
        if(!mind || !energy || !nature || !tactics || !identity) return;
        await updateTherapist({ personality: {...data}, registration_status: 'entered-personality' });

        // if(!isSucces){
        //     return
        // }

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const data = [
        {
            title: 'Mind (select one)',
            name: 'mind',
            options: [
                {
                    label: 'Introvert',
                    value: 'introvert'
                },
                {
                    label: 'Extrovert',
                    value: 'extrovert'
                },
            ]
        },
        {
            title: 'Energy (select one)',
            name: 'energy',
            options: [
                {
                    label: 'Observant',
                    value: 'observant'
                },
                {
                    label: 'Thinking',
                    value: 'thinking'
                },
            ]
        },
        {
            title: 'Nature (select one)',
            name: 'nature',
            options: [
                {
                    label: 'Feeling',
                    value: 'feeling'
                },
                {
                    label: 'Thinking',
                    value: 'thinking'
                },
            ]
        },
        {
            title: 'Tactics (select one)',
            name: 'tactics',
            options: [
                {
                    label: 'Judging',
                    value: 'judgin'
                },
                {
                    label: 'Prospecting',
                    value: 'prospecting'
                },
            ]
        },
        {
            title: 'Identity (select one)',
            name: 'identity',
            options: [
                {
                    label: 'Assertive',
                    value: 'assertive'
                },
                {
                    label: 'Turbulent',
                    value: 'turbulent'
                },
            ]
        },
    ];


    return (
        <form onSubmit={handleSubmit(handleNext)} className="">
            <h1 className="text-left text-lg my-5">Share your Myers-Brigg Personality Type aspects</h1>
            <div className="flex text-sm gap-5">
                {
                    data.map((itm, idx) => <RadioInput key={`personality_item_${idx}`} data={itm} register={register} errors={errors} />)
                }
            </div>
            <div className={`flex gap-5 py-5`}>
                <Button title={'Back'} onClick={handleBack} />
                <Button title={'Next'} onClick={handleNext} className={`${!watch().personality ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </form>
    )
}

export default Personality;