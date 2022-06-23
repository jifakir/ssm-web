import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';



const preferData = {
    name: 'has_age_preference',
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
}

const data = {
    name: 'age_preference',
    options: [
        {
            label: '26-30 years',
            value: '26-30'
        },
        {
            label: '31-35 years',
            value: '31-35'
        },
        {
            label: '36-40 years',
            value: '36-40'
        },
        {
            label: '41-45 years',
            value: '41-45'
        },
        {
            label: '46-50 years',
            value: '46-50'
        },
        {
            label: '51-55 years',
            value: '51-55'
        },
        {
            label: '56+years',
            value: '56+'
        },
    ]
};


// Component
const AgePrefer = ({ step, setStep, profile }) => {

    const { 
        control, handleSubmit, watch, 
        formState: { errors} } = useForm({
            defaultValues: {
            has_age_preference: profile?.has_age_preference,
            age_preference: profile ? `${profile?.age_preference?.head}-${profile?.age_preference?.tail}` : ''
        }
    });

    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { has_age_preference, age_preference } = data;
        if(has_age_preference == null) return;
        const splitAge = age_preference.split('-');
        await updatePatient({id: profile?.id, has_age_preference, age_preference: {head: splitAge[0], tail: splitAge[1]}, registration_status: 'entered-has_age_preference' });
        setStep(step + 1);
    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
    <>
        <form id="has_age_preference-form" onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
                <div className="">
                    <h1 className="text-lg my-2 text-left">Do you have any age preference for your provider?</h1>
                    <div className="form-control w-full max-w-xs">
                        <Radio 
                            control={control}
                            rules={{
                                required: 'Age preferece is required.'
                            }} 
                            data={preferData} />
                    </div>
                </div>
                <div className={`${watch('has_age_preference') ? 'block' : 'hidden'} mt-10`}>
                    <h1 className="text-lg my-2 text-left">What is your age preference?</h1>
                    <div className="form-control w-full max-w-xs">
                        <Radio 
                            control={control}
                            rules={{
                                required: 'Age preferece is required.'
                            }} 
                            data={data} />
                    </div>
                </div>
            </div>
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
                form="has_age_preference-form" 
                btnQnr
                disabled={watch('has_age_preference') ? watch('age_preference') == null : watch('has_age_preference') == null}/>
        </div>
    </>
    )
}

export default AgePrefer;