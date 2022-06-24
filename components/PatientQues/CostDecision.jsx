import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';

const data = {
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


const CostDecision = ({ step, setStep, profile }) => {


    const { control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: { 
        cost_decision: profile?.cost_decision 
    }})
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
                    <h1 className="text-lg my-2 text-left">How important is cost in your decision to begin therapy?</h1>
                    <div className="">
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


export default CostDecision;