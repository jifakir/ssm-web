import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';
import { useEffect } from 'react';

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
            value: 'none'
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

    const { control, handleSubmit, watch, formState: { errors} } = useForm({
        defaultValues: {
            session_type: profile?.session_type,
            will_like_in_person: profile?.will_like_in_person,
            will_like_virtual: profile?.will_like_virtual
        }
    });
    const [updatePatient, { isSuccess, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {
        const { session_type } = data;
        let form = {session_type};
        if(session_type === 'virtual') form = data;
        await updatePatient({
            id: profile?.id, 
            ...form,
            registration_status: 'entered-session_type' });
    };

    const handleBack = () => {

        setStep(step - 1);

    };

    useEffect(() => {
        if(isSuccess){
            setStep(step + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isSuccess])
    
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
                    {/* <div className={`mt-5 ${watch('session_type') === 'in_person' ? 'block' : 'hidden'}`}>
                        <h1 className="text-lg my-2 text-left">Will you someday want to transition to virtual sessions?</h1>
                        <Radio control={control} data={willData} />
                    </div> */}
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