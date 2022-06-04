import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';

const data = {
        
    name: 'is_spiritual',
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

const SpiritPerson = ({ step, setStep, profile }) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {is_spiritual: profile?.is_spiritual}});
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { is_spiritual } = data;
        if(!is_spiritual) return;
        await updateTherapist({id: profile?.id, is_spiritual, registration_status: 'entered-spirit-persion' });
        setStep(step + 1);
    };

    const handleBack = () => {

        setStep(step - 1);

    };



    return (
        <>
            <form id="spirit-person-form" onSubmit={handleSubmit(handleNext)} className="">
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
                    form="spirit-person-form" 
                    className={`${isLoading ? 'loading' : ''} px-8 text-2xl ${!watch().is_spiritual ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </>
    )
}

export default SpiritPerson;