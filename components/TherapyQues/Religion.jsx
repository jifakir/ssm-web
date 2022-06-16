import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';

const data = {
    name: 'religion',
    options: [
        {
            label: 'Christianity',
            value: 'christianity'
        },
        {
            label: 'Judaism',
            value: 'judaism'
        },
        {
            label: 'Islam',
            value: 'islam'
        },
        {
            label: 'Hinduism',
            value: 'hinduism'
        },
        {
            label: 'Buddhism',
            value: 'buddhism'
        },
        {
            label: 'Atheism',
            value: 'atheism'
        },
        {
            label: 'None',
            value: 'none'
        },
        {
            label: 'Other',
            value: 'other'
        },
    ]
};


const Religion = ({ step, setStep, profile }) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: { religion: profile?.religion }});
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { religion } = data;
        if(!religion) return;
        await updateTherapist({id: profile?.id, religion, registration_status: 'entered-religion' });
        setStep(step + 1);
    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
        <>
            <form id='religion-form' onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <h1 className="text-lg my-2 text-left">What is your religion?</h1>
                    <div className="form-control w-full max-w-xs">
                        <Radio register={register} errors={errors} data={data} />
                    </div>
                </div>
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr />
                <Button 
                    title={'Next'} 
                    form="religion-form"
                    btnQnr
                    disabled={!watch('religion')} />
            </div>
        </>
    )
}

export default Religion;