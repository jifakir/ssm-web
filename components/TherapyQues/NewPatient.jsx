import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';
import { useEffect } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

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

const futureData = {
    name: 'accept_in_future',
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

    const { 
        register, control, 
        handleSubmit, watch, 
        formState: { errors} } = useForm({
            defaultValues: { 
                accept_new_patients: profile?.accept_new_patients,
                // accept_in_future: profile?.accept_in_future
            }});

    const [updateTherapist, { isSuccess, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { accept_new_patients } = data;
        if(accept_new_patients == null)return;
        await updateTherapist({
            id: profile?.id, 
            accept_new_patients, 
            registration_status: 'entered-accept_new_patients' 
        });
    };

    const handleBack = () => {

        setStep(step - 1);

    };

    useEffect(() => {
        if(isSuccess){
            setStep(step + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isSuccess]);
    
    return (
        <>
            <form id="new-patient-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <h1 className="text-lg my-2 text-left">Are you currently accepting new patients?</h1>
                    <div className="form-control w-full max-w-xs">
                        <Radio 
                            control={control} 
                            rules={{required: 'New patient is required.'}} 
                            data={data} />
                    </div>
                </div>
                {/* <div className={`w-full mt-5 ${watch('accept_new_patients') === false ? 'block' : 'hidden'}`}>
                    <h1 className="text-lg my-2 text-left">Will you accpet new patients in future?</h1>
                    <div className="form-control w-full max-w-xs">
                        <Radio 
                            control={control}  
                            data={futureData} />
                    </div>
                </div> */}
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
                    disabled={watch('accept_new_patients')==null} >
                    {
                        isLoading ? <BiLoaderAlt className="animate-spin text-2xl mr-2" /> : ''
                    }
                </Button>
            </div>
        </>
    )
}

export default NewPatient;