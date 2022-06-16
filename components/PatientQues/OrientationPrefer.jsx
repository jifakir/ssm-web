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

    const { register, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {has_sexual_preference: profile?.has_sexual_preference}});
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
        <form id="rel-sess-form" onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
                <h1 className="text-lg my-2 text-left">Are you interested in a provider that specializes in LGBTQ+ issues?</h1>
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
                form="rel-sess-form" 
                className={`${isLoading ? 'loading' : ''} px-8 text-2xl ${!watch().has_sexual_preference ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
        </div>
    </>
    )
}

export default PreferOrientation;