import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';

const data = {
    name: 'has_tried_counseling',
    options: [
        {
            label: 'Yes',
            value: true
        },
        {
            label: 'No',
            value: false
        },
    ]
};

const consildata = {
    name: 'counseling_experience',
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
        control, 
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
                <div className="w-full md:flex gap-10">
                    <div className="">
                        <h1 className="text-lg my-2 text-left">Have you ever tried counseling in the past?</h1>
                        <div className="form-control w-full max-w-xs">
                            <Radio 
                                control={control} 
                                data={data} />
                        </div>
                    </div>
                    <div className={watch('has_tried_counseling') ? 'block' : 'hidden'}>
                        <h1 className="text-lg my-2 text-left">How would you rate your overall experience with counseling?</h1>
                        <div className="form-control w-full max-w-xs">
                            <Radio 
                                control={control} 
                                data={consildata} />
                        </div>
                    </div>
                </div>
            </form>
            <div className={`flex gap-5 py-5`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr
                    btnSecondary />

                <Button 
                    title={'Next'} 
                    form="spirit-session-form" 
                    btnQnr
                    disabled={!watch('has_tried_counseling')} />
            </div>
        </>
    )
}

export default PreferSpirituality;