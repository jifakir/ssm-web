import React from 'react';
import Checkbox from '../../components/UI/Checkbox';
import { useForm } from 'react-hook-form';

import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Select from '../UI/Select';
import Button from '../UI/Button';


const data = {
        title: 'Do you have specific concerns to discuss with your therapist? (select all that apply)',
        name: 'specific_concerns',
        required: true,
        options: [
            {
                label: 'Changes in my behavior',
                value: 'Changes in my behaviour  '
            },
            {
                label: 'Life events  ',
                value: 'Life events'
            },
            {
                label: 'Potential or diagnosed disorder  ',
                value: 'Potential or diagnosed disorder  '
            },
            {
                label: 'Relationship issues  ',
                value: 'Relationship issues  '
            },
            {
                label: 'Life goals  ',
                value: 'Life goals  '
            },
            {
                label: 'Prefer not to say  ',
                value: 'Prefer not to say  '
            },
        ]
    };

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
                
                <Checkbox data={data} register={register} errors={errors} />
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