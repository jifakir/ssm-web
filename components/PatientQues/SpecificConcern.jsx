import React from 'react';
import Checkbox from '../../components/UI/Checkbox';
import { useForm } from 'react-hook-form';

import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Select from '../UI/Select';
import Button from '../UI/Button';
import { specific_concerns } from '../data';

const Language = ({ step, setStep, profile }) => {
    
    const { register, control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: { languages: profile?.languages }});
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {
        const { languages } = data;
        if(!languages) return;
        await updateTherapist({id: profile?.id, ...data, registration_status: 'entered-language' });
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

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
                    disabled={!watch('languages')} />
            </div>
        </>
    )
}

export default Language;