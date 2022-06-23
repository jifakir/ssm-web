import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';

const data = {
    name: 'will_like_in_person',
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
const WillLikInperson = ({ step, setStep, profile }) => {

    const { 
        control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {is_religion_biased: profile?.is_religion_biased}});
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { will_like_in_person } = data;
        console.log("Religion Biased: ", will_like_in_person);
        if(!will_like_in_person) return;
        await updatePatient({id: profile?.id, will_like_in_person, registration_status: 'entered-is_religious' });
        setStep(step + 1);
    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
    <>
        <form id="is-spiritual-form" onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
                <h1 className="text-lg my-2 text-left">Will you someday want to transition to in-person sessions?</h1>
                <div className="form-control w-full max-w-xs">
                    <Radio control={control} data={data} />
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
                form="is-spiritual-form" 
                className={`${isLoading ? 'loading' : ''} px-8 text-2xl ${!watch().will_like_in_person ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
        </div>
    </>
    )
}

export default WillLikInperson;