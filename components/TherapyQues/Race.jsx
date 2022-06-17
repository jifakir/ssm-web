import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';


const data = {
    title: 'What is your nationality/race?',
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
            label: 'white',
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

    const { register, control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: { race: profile?.race }});
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { race } = data;
        if(!race) return;
        await updateTherapist({ id: profile?.id, race, registration_status: 'entered-race' });
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    
    return (
        <>
            <form id="race-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="form-control w-full max-w-xs">
                <div className="form-control w-full max-w-xs">
                    <Radio control={control} rules={{required: 'Race is required.'}} data={data} />
                </div>
                </div>
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr
                    btnSecondary />
                <Button 
                    title={'Next'} 
                    form="race-form"
                    btnQnr
                    disabled={!watch('race')} />
            </div>
        </>
    )
}

export default Race;