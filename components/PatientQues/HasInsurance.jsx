import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';

const data = {
    name: 'has_insurance',
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

    const { control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {is_religion_biased: profile?.is_religion_biased}});
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { has_insurance } = data;
        console.log("Religion Biased: ", has_insurance);
        if(!has_insurance) return;
        await updatePatient({id: profile?.id, has_insurance, registration_status: 'entered-religion_biased' });

        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
    <>
        <form id="rel-has_insurance-form" onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
                <h1 className="text-lg my-2 text-left">Will you be using health insurance for your therapy sessions?</h1>
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
                btnSecondary />
            <Button 
                title={'Next'} 
                form="rel-has_insurance-form" 
                btnQnr
                disabled={!watch('has_insurance')} />
        </div>
    </>
    )
}

export default RelSess;