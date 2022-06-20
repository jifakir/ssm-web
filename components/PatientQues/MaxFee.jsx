import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';

const data = {
    title: 'What is the most you are willing to pay per therapy session?  ',
    name: 'cost_decision',
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
            label: '150$',
            value: '150'
        },
        {
            label: '$200',
            value: '200'
        },
        {
            label: '$250%',
            value: '250+'
        },
    ]
};


const SessionFee = ({ step, setStep, profile }) => {


    const { control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: { max_payable_fee: profile?.max_payable_fee }})
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { cost_decision } = data;
        await updatePatient({ id: profile?.id, cost_decision, registration_status: 'entered-max_payable_fee' });
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
        <>
            <form id="max_payable_fee-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="form-control w-full">
                    <div className="form-control w-full">
                        <Radio control={control} data={data} />
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
                    form="max_payable_fee-form"
                    btnQnr
                    disabled={!watch('cost_decision')}
                     />
            </div>
        </>
    )
}


export default SessionFee;