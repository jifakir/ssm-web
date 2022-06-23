import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';

const data = {
    name: 'is_in_us',
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
const IsInUs = ({ step, setStep, profile }) => {

    const { control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {is_religion_biased: profile?.is_religion_biased}});
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { is_in_us } = data;
        console.log("Religion Biased: ", is_in_us);
        if(is_in_us == null) return;
        await updatePatient({id: profile?.id, is_in_us, registration_status: 'entered-is_religious' });
        setStep(step + 1);
    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
    <>
        <form id="is-is_in_us-form" onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
                <h1 className="text-lg my-2 text-left">Do you live in the United States?</h1>
                <div className="form-control w-full max-w-xs">
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
                form="is-is_in_us-form" 
                btnQnr
                disabled={watch('is_in_us')==null} />
        </div>
    </>
    )
}

export default IsInUs;