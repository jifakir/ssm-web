import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
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

    const { register, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: { race: profile?.race }});
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
                <div className="form-control w-full max-w-xs">
                    <Radio register={register} errors={errors} data={data} />
                </div>
                </div>
            </form>
            <div className={`flex gap-5 py-5`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    className="btn-outline border-neutral px-8 text-2xl" />
                <Button 
                    title={'Next'} 
                    form="race-form" 
                    className={`${isLoading ? 'loading' : ''} px-8 text-2xl ${!watch().race ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </>
    )
}

export default Race;