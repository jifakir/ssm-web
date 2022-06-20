import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';

const consildata = {
    name: 'has_tried_counseling',
    options: [
        {
            label: 'Not Important',
            value: 'not_important'
        },
        {
            label: 'Somewhat Important',
            value: 'somewhat_important'
        },
        {
            label: 'Important',
            value: 'important'
        },
        {
            label: 'Very Important',
            value: 'very_important'
        },
        {
            label: 'Extremely Important',
            value: 'extremely_important'
        },
    ]
};

const PreferSpirituality = ({ step, setStep, profile }) => {

    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors} } = useForm({
            defaultValues: {has_tried_counseling: profile?.has_tried_counseling} });
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { has_tried_counseling } = data;
        await updatePatient({ id: profile?.id, has_tried_counseling, registration_status: 'entered-spirit-session' });
        
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    
    return (
        <>
            <form id="spirit-session-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="form-control">
                <h1 className="text-lg my-2 text-left">Do you want your provider to incorporate spirituality into sessions?</h1>
                <div className="form-control w-full max-w-xs">
                    <Radio register={register} errors={errors} data={data} />
                </div>
                </div>
            </form>
            <div className={`flex gap-5 py-5`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    className="btn-outline border-neutral px-8 text-2xl" />

                <Button 
                    title={'Next'} 
                    form="spirit-session-form" 
                    className={`${isLoading ? 'loading' : ''} px-8 text-2xl ${!watch().has_tried_counseling ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </>
    )
}

export default PreferSpirituality;