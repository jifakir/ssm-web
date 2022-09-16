import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';


const data = {
    name: 'race',
    options: [
        {
            label: 'Black/African descent',
            value: 'black'
        },
        {
            label: 'Asian',
            value: 'asian'
        },
        {
            label: 'Hispanic',
            value: 'hispanic'
        },
        {
            label: 'White',
            value: 'white'
        },
        {
            label: 'Other',
            value: 'other'
        },
        {
            label: 'Prefer not to say',
            value: 'not_preferred'
        },
    ]
};

const Race = ({ step, setStep, profile }) => {

    const { control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: { race: profile?.race }});
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { race } = data;
        if(!race) return;
        await updatePatient({ id: profile?.id, race, registration_status: 'entered-race' });
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    
    return (
        <>
            <form id="race-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="form-control w-full max-w-xs">
                    <h1 className="text-lg my-2 text-left">What is your nationality/race?</h1>
                    <Radio 
                    control={control} 
                    rules={{
                        required: 'Race is required.'
                    }}
                    data={data} />
                </div>
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr
                    btnSecondary/>
                <Button 
                    title={'Next'} 
                    form="race-form" 
                    btnQnr 
                    disabled={!watch('race')}/>
            </div>
        </>
    )
}

export default Race;