import React from 'react';
import Checkbox from '../../components/UI/Checkbox';
import { useForm } from 'react-hook-form';

import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import { specific_concerns } from '../data';
import { useEffect } from 'react';

const Language = ({ step, setStep, profile }) => {
    
    const { register, control, handleSubmit, watch, formState: { errors} } = useForm({
        defaultValues: { specific_concerns: profile?.specific_concerns }
    });
    const [updatePatient, { isSuccess, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {
        const { specific_concerns } = data;
        await updatePatient({id: profile?.id, specific_concerns: specific_concerns.filter(cn => cn), registration_status: 'entered-language' });
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    useEffect(() => {
        if(isSuccess){

        }
    },[isSuccess]);

    return (
        <>
            <form id="specific_concerns-form" onSubmit={handleSubmit(handleNext)} className="text-left text-sm">
                <h1 className="text-left my-2 text-lg">Do you have specific concerns to discuss with your therapist? (select all that apply)</h1>
                <Checkbox data={specific_concerns} control={control} register={register} errors={errors} />
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr
                    btnSecondary />
                <Button 
                    title={'Next'} 
                    form="specific_concerns-form" 
                    btnQnr
                    disabled={!watch('specific_concerns')} />
            </div>
        </>
    )
}

export default Language;