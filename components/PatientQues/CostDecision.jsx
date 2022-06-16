import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';

const data = {
    title: 'How important is cost in your decision to begin therapy?',
    name: 'cost_decision',
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


const SessionFee = ({ step, setStep, profile }) => {


    const { register, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: { max_payable_fee: profile?.max_payable_fee }})
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { max_payable_fee } = data;
        await updatePatient({ id: profile?.id, max_payable_fee, registration_status: 'entered-max_payable_fee' });
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
        <>
            <form id="max_payable_fee-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="form-control w-full max-w-xs">
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
                    form="max_payable_fee-form" 
                    className={`${isLoading ? 'loading' : ''} px-8 text-2xl ${!watch().max_payable_fee ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </>
    )
}


export default SessionFee;