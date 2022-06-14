import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';

const data = {
    name: 'is_religion_biased',
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
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { is_religion_biased } = data;
        console.log("Religion Biased: ", is_religion_biased);
        if(!is_religion_biased) return;
        await updateTherapist({id: profile?.id, is_religion_biased, registration_status: 'entered-religion_biased' });

        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
    <>
        <form id="rel-sess-form" onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
                <h1 className="text-lg my-2 text-left">Do you offer religion in your sessions?</h1>
                <div className="form-control w-full max-w-xs">
                    <Radio register={register} errors={errors} data={data} />
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
                form="rel-sess-form"
                btnQnr
                disabled={!watch('is_religion_biased')} />
        </div>
    </>
    )
}

export default RelSess;