import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';

const data = {
    name: 'accept_new_patients',
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


const NewPatient = ({ step, setStep, profile }) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: { accept_new_patients: profile?.accept_new_patients }});
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { accept_new_patients } = data;
        if(!accept_new_patients)return;
        await updateTherapist({id: profile?.id, accept_new_patients, registration_status: 'email' });
        setStep(step + 1);
    
    };

    const handleBack = () => {

        setStep(step - 1);

    };

    
    
    return (
        <>
            <form id="new-patient-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <h1 className="text-lg my-2 text-left">Are you currently accepting new patients?</h1>
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
                    btnSecondary
                    className="btn-outline border-neutral px-8 text-2xl" />
                <Button 
                    title={'Next'} 
                    form="new-patient-form"
                    btnQnr
                    disabled={!watch('accept_new_patients')} />
            </div>
        </>
    )
}

export default NewPatient;