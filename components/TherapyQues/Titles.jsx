import React from 'react';
import Checkbox from '../../components/UI/Checkbox';
import { useForm } from 'react-hook-form';

import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Select from '../UI/Select';
import Button from '../UI/Button';


const data = {
        title: 'Title(s) ?',
        name: 'titles',
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

const Titles = ({ step, setStep, profile }) => {
    
    const { register, control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {titles: profile?.titles}});
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const {titles, other} = data;
        await updateTherapist({
            id: profile?.id, 
            titles: titles.filter(title => title), 
            registration_status: 'entered-titles' });
        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };
    console.log(watch());
    return (
        <>
            <form id="titles-form" onSubmit={handleSubmit(handleNext)} className="text-left text-sm">
                <Checkbox data={data} control={control} register={register} errors={errors} />
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr
                    btnSecondary
                     />
                <Button 
                    title={'Next'} 
                    form="titles-form"
                    btnQnr 
                    disabled={!watch('titles')} />
            </div>
        </>
    )
}

export default Titles;