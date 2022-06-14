import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';
const data = {
    name: 'offer_spirituality',
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

const SpiritSession = ({ step, setStep, profile }) => {

    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors} } = useForm({
            defaultValues: {offer_spirituality: profile?.offer_spirituality} });
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { offer_spirituality } = data;
        await updateTherapist({ id: profile?.id, offer_spirituality, registration_status: 'entered-spirit-session' });
        
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    
    return (
        <>
            <form id="spirit-session-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="form-control">
                <h1 className="text-lg my-2 text-left"></h1>
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
                    className={`${isLoading ? 'loading' : ''} px-8 text-2xl ${!watch().offer_spirituality ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </>
    )
}

export default SpiritSession;