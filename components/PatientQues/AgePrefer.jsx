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

    const age = `${profile?.age?.head}-${profile?.age?.tail}`
    const { control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {age: profile?.age ? age : ''}});
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { has_age_preference } = data;
        console.log("Religion Biased: ", has_age_preference);
        if(!has_age_preference) return;
        await updatePatient({id: profile?.id, has_age_preference, registration_status: 'entered-has_age_preference' });
        setStep(step + 1);
    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
    <>
        <form id="has_age_preference-form" onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full md:flex gap-10">
                <div className="">
                    <h1 className="text-lg my-2 text-left">Will you someday want to transition to in-person sessions?</h1>
                    <div className="form-control w-full max-w-xs">
                        <Radio 
                            control={control}
                            rules={{
                                required: 'Age preferece is required.'
                            }} 
                            data={preferData} />
                    </div>
                </div>
                <div className={`${watch('has_age_preference') ? 'block' : 'hidden'}`}>
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
                disabled={!watch('has_age_preference')}/>
        </div>
    </>
    )
}

export default AgePrefer;