import React from 'react';
import Checkbox from '../../components/UI/Checkbox';
import { useForm } from 'react-hook-form';

import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Select from '../UI/Select';
import Button from '../UI/Button';


const data = {
        title: 'Title(s) ?',
        name: 'title',
        required: true,
        options: [
            {
                label: 'Ph.D.',
                value: 'phd'
            },
            {
                label: 'Psy.D.',
                value: 'psyd'
            },
            {
                label: 'M.A.',
                value: 'ma'
            },
            {
                label: 'M.S.',
                value: 'ms'
            },
            {
                label: 'M.S.W.',
                value: 'msw'
            },
            {
                label: 'M.D.',
                value: 'md'
            },
            {
                label: 'Other',
                value: 'other'
            },
        ]
    };

const Titles = ({ step, setStep }) => {
    
    const { register, control, handleSubmit, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        await updateTherapist({ ...data, registration_status: 'entered-language' });

        // if(!isSucces){
        //     return
        // }

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };

    return (
        <form onSubmit={handleSubmit(handleNext)} className="text-left text-sm">
            <Checkbox data={data} register={register} errors={errors} />
            <div className={`flex gap-5 py-5`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    className="btn-outline border-neutral px-8 text-2xl" />
                <Button 
                    title={'Next'} 
                    onClick={handleNext} 
                    className={`px-8 text-2xl ${!watch().title ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </form>
    )
}

export default Titles;