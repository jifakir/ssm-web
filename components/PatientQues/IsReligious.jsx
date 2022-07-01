import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';

const data = {
    name: 'is_religion_biased',
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

const sessData = {
    name: 'is_religious',
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
const RelSess = ({ step, setStep, profile }) => {

    const { control, handleSubmit, watch, formState: { errors} } = useForm({
        defaultValues: {
            is_religious: profile?.is_religious,
            is_religion_biased: profile?.is_religion_biased
        }});
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { is_religious, is_religion_biased } = data;
        if(is_religious == null) return;
        await updatePatient({id: profile?.id, is_religious, is_religion_biased, registration_status: 'entered-is_religious' });

        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
    <>
        <form id="is-religious-form" onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
                <div className="">
                    <h1 className="text-lg my-2 text-left">Do you consider yourself a religious person?</h1>
                    <div className="form-control w-full max-w-xs">
                        <Radio 
                            control={control}
                            data={sessData} />
                    </div>
                </div>
                <div className={`${watch('is_religious') ? 'mt-5 block' : 'hidden'}`}>
                    <h1 className="text-lg my-2 text-left">Do you want your provider to incorporate religion into sessions?</h1>
                    <div className="form-control w-full max-w-xs">
                        <Radio 
                            control={control}
                            data={data} />
                    </div>
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
                form="is-religious-form" 
                btnQnr
                disabled={watch('is_religious') ? watch('is_religion_biased') == null : watch('is_religious') == null} />
        </div>
    </>
    )
}

export default RelSess;