import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';

const data = {
    title: 'What is the most you are willing to pay per therapy session?',
    name: 'max_payable_fee',
    options: [
        {
            label: '$65',
            value: '65'
        },
        {
            label: '$100',
            value: '100'
        },
        {
            label: '$150',
            value: '150'
        },
        {
            label: '$200',
            value: '200'
        },
        {
            label: '$250+',
            value: '250+'
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