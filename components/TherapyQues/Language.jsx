import React from 'react';
import Checkbox from '../../components/UI/Checkbox';
import { useForm } from 'react-hook-form';

import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Select from '../UI/Select';
import Button from '../UI/Button';


const data = {
        title: 'What other language(s) do you speak?',
        name: 'languages',
        required: true,
        options: [
            {
                label: 'Spanish',
                value: 'spanish'
            },
            {
                label: 'French',
                value: 'french'
            },
            {
                label: 'Kreyol',
                value: 'kreyol'
            },
            {
                label: 'Yoruba',
                value: 'yoruba'
            },
            {
                label: 'Igbo',
                value: 'igbo'
            },
            {
                label: 'Other',
                value: 'other'
            },
        ]
    };

const Language = ({ step, setStep }) => {
    
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

    console.log("Language", watch());

    return (
        <form onSubmit={handleSubmit(handleNext)} className="text-left text-sm">
            <Checkbox data={data} register={register} errors={errors} />
            <div className={`flex gap-5 py-5`}>
                <Button title={'Back'} onClick={handleBack} />
                <Button title={'Next'} onClick={handleNext} className={`${!watch().languages ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </form>
    )
}

export default Language;