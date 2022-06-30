import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';

const data = {
    name: 'is_spiritual',
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

const sessdata = {
    name: 'is_spiritual_biased',
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
            is_spiritual: profile?.is_spiritual,
            is_religion_biased: profile?.is_religion_biased}});
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { is_spiritual, is_spiritual_biased } = data;
        if(is_spiritual == null) return;
        await updatePatient({id: profile?.id, is_spiritual, is_spiritual_biased, registration_status: 'entered-is_religious' });
        setStep(step + 1);
    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
    <>
        <form id="is-spiritual-forms" onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full md:flex gap-10">
                <div>
                    <h1 className="text-lg my-2 text-left">Do you consider yourself a spiritual person?</h1>
                    <div className="form-control w-full max-w-xs">
                        <Radio 
                            control={control} 
                            data={data} />
                    </div>
                </div>
                <div className={`${watch('is_spiritual') ? 'block' : 'hidden'}`}>
                    <h1 className="text-lg my-2 text-left">Do you want your provider to incorporate spirituality into sessions?</h1>
                    <div className="form-control w-full max-w-xs">
                        <Radio 
                            control={control} 
                            data={sessdata} />
                    </div>
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
                form="is-spiritual-forms" 
                btnQnr
                disabled={watch('is_spiritual') ? watch('is_religion_biased') == null : watch('is_spiritual') == null} />
        </div>
    </>
    )
}

export default RelSess;