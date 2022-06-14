import React, { Profiler } from 'react';
import RadioInput from '../../components/UI/Radio';
import Button from '../UI/Button';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';



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



const Personality = ({ step, setStep, profile }) => {



    const { register, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {...profile?.personality_type}});
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { mind, energy, nature, tactics, identity} = data;
        if(!mind || !energy || !nature || !tactics || !identity) return;
        await updateTherapist({id: profile?.id, personality_type: {...data}, registration_status: 'entered-personality' });

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const {mind, energy, nature, tactics, identity} = watch();

    return (
        <>
            <form id="personality-form" onSubmit={handleSubmit(handleNext)} className="">
                <h1 className="text-left text-lg my-5">Share your Myers-Brigg Personality Type aspects</h1>
                <div className="flex text-sm gap-5">
                    {
                        data.map((itm, idx) => (
                            <div key={`personality_item_${idx}`} className="">
                                <RadioInput data={itm} register={register} errors={errors} />
                            </div>
                        ))
                    }
                </div>
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr
                    btnSecondary />
                <Button 
                    title={'Next'} 
                    form="personality-form"
                    btnQnr
                    disabled={!mind || !energy || !nature || !tactics || !identity}/>
            </div>
        </>
    )
}

export default Personality;