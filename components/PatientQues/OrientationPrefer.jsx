import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';

const data = {
    name: 'has_sexual_preference',
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




// Component
const PreferOrientation = ({ step, setStep, profile }) => {

    const { control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {has_sexual_preference: profile?.has_sexual_preference}});
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { has_sexual_preference } = data;
        console.log("Religion Biased: ", has_sexual_preference);
        if(!has_sexual_preference) return;
        await updatePatient({id: profile?.id, has_sexual_preference, registration_status: 'entered-religion_biased' });

        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
    <>
        <form id="has_sexual_preference-form" onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
                <h1 className="text-lg my-2 text-left">Are you interested in a provider that specializes in LGBTQ+ issues?</h1>
                <div className="form-control w-full max-w-xs">
                    <Radio 
                        control={control}
                        rules={{
                            required: "Orientation Preference is required."
                        }} 
                        data={data} />
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
                form="has_sexual_preference-form" 
                btnQnr
                disabled={!watch('has_sexual_preference')} />
        </div>
    </>
    )
}

export default PreferOrientation;