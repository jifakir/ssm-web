import React from 'react';
import { useEffect } from 'react';
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
            label: 'Not Good',
            value: 'not_good'
        },
        {
            label: 'Somewhat Good',
            value: 'somewhat_good'
        },
        {
            label: 'Good',
            value: 'important'
        },
        {
            label: 'Very Good',
            value: 'very_good'
        },
        {
            label: 'Extremely Good',
            value: 'extremely_good'
        },
    ]
};

const PreferSpirituality = ({ step, setStep, profile }) => {

    const { 
        control, 
        handleSubmit, 
        watch, 
        formState: { errors} } = useForm({
            defaultValues: {
                has_tried_counseling: profile?.has_tried_counseling,
                counseling_experience: profile?.counseling_experience
            } });
    const [updatePatient, { isSuccess, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { has_tried_counseling, counseling_experience } = data;
        let form = {has_tried_counseling};
        if(has_tried_counseling) form = data;
        await updatePatient({ id: profile?.id, ...form, registration_status: 'entered-spirit-session' });

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    useEffect(() => {
        if(isSuccess){
            setStep(step + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isSuccess]);
    
    return (
        <>
            <form id="counselling-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <div className="">
                        <h1 className="text-lg my-2 text-left">Have you ever tried counseling in the past?</h1>
                        <div className="form-control w-full max-w-xs">
                            <Radio 
                                control={control} 
                                data={data} />
                        </div>
                    </div>
                    <div className={watch('has_tried_counseling') ? 'block mt-10' : 'hidden'}>
                        <h1 className="text-lg my-2 text-left">How would you rate your overall experience with counseling?</h1>
                        <div className="form-control w-full max-w-xs">
                            <Radio 
                                control={control} 
                                data={consildata} />
                        </div>
                    </div>
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
                    form="counselling-form"
                    btnQnr
                    disabled={watch('has_tried_counseling') ? watch('counseling_experience') == null : watch('has_tried_counseling') == null} />
            </div>
        </>
    )
}

export default PreferSpirituality;