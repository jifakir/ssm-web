import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';

const data = {
    name: 'is_spiritual',
    options: [
        {
            label: 'Yes, if the patient prefers',
            value: true
        },
        {
            label: 'No',
            value: false
        },
    ]
};




// Component
const RelSess = ({ step, setStep, profile }) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {is_religion_biased: profile?.is_religion_biased}});
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { is_spiritual } = data;
        console.log("Religion Biased: ", is_spiritual);
        if(!is_spiritual) return;
        await updatePatient({id: profile?.id, is_spiritual, registration_status: 'entered-is_religious' });
        setStep(step + 1);
    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
    <>
        <form id="is-spiritual-form" onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
                <h1 className="text-lg my-2 text-left">Do you consider yourself a spiritual person?</h1>
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
                form="is-spiritual-form" 
                className={`${isLoading ? 'loading' : ''} px-8 text-2xl ${!watch().is_spiritual ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
        </div>
    </>
    )
}

export default RelSess;