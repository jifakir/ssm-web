import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';

const data = {
    name: 'session_type',
    options: [
        {
            label: 'Virtual only',
            value: 'virtual'
        },
        {
            label: 'In-person only',
            value: 'in-person'
        },
        {
            label: 'No preference',
            value: 'no_preference'
        },
    ]
};

const willData = {
    name: 'will_like_in_person',
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




const InpersonFuture = ({ step, setStep, profile }) => {

    const { control, handleSubmit, watch, formState: { errors} } = useForm();
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { session_type, will_like_in_person } = data;

        await updatePatient({
            id: profile?.id, 
            session_type, 
            will_like_in_person, 
            registration_status: 'entered-session_type' });

        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    
    return (
        <>
            <form id="session_type_form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="form-control w-full">
                    <div className="">
                        <h1 className="text-lg my-2 text-left">Do you prefer virtual or in-person sessions?</h1>
                        <Radio control={control} data={data} />
                    </div>
                    <div className={`mt-5 ${watch('session_type') === 'virtual' ? 'block' : 'hidden'}`}>
                        <h1 className="text-lg my-2 text-left">Will you someday want to transition to in-person sessions?</h1>
                        <Radio control={control} data={willData} />
                    </div>
                </div>
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    onClick={handleBack}
                    title={'Back'}
                    btnQnr
                    btnSecondary
                />
                <Button title={'Next'}
                    btnQnr
                    form="session_type_form"
                    disabled={watch('session_type') == null} />
            </div>
        </>
    )
}

export default InpersonFuture;