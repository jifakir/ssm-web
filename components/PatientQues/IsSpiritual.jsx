import React from 'react';
import { useEffect } from 'react';
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
            is_spiritual_biased: profile?.is_spiritual_biased}});
    const [updatePatient, { isSuccess, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { is_spiritual, is_spiritual_biased } = data;
        let form = { is_spiritual };
        if(is_spiritual) form = data;
        await updatePatient({
            id: profile?.id, 
            ...form,
            registration_status: 'entered-is_spiritual' });
        
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
        <form id="is-spiritual-forms" onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
                <div>
                    <h1 className="text-lg my-2 text-left">Do you consider yourself a spiritual person?</h1>
                    <div className="form-control w-full max-w-xs">
                        <Radio 
                            control={control} 
                            data={data} />
                    </div>
                </div>
                <div className={`${watch('is_spiritual') ? 'mt-5 block' : 'hidden'}`}>
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
                disabled={watch('is_spiritual') ? watch('is_spiritual_biased') == null : watch('is_spiritual') == null} />
        </div>
    </>
    )
}

export default RelSess;