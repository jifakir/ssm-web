import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';

const data = {
    name: 'age',
    options: [
        {
            label: '18-25 years',
            value: '18-25'
        },
        {
            label: '26-30 years',
            value: '26-30'
        },
        {
            label: '31-35 years',
            value: '31-35'
        },
        {
            label: '36-40 years',
            value: '36-40'
        },
        {
            label: '41-45 years',
            value: '41-45'
        },
        {
            label: '46-50 years',
            value: '46-50'
        },
        {
            label: '51-55 years',
            value: '51-55'
        },
        {
            label: '56+years',
            value: '56+'
        },
    ]
};




// Component
const Age = ({ step, setStep, profile }) => {

    const age = `${profile?.age?.head}-${profile?.age?.tail}`
    const { control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {age: profile ? age : ''}});
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { age } = data;
        console.log("Religion Biased: ", age);
        if(!age) return;

        await updatePatient({id: profile?.id, age, registration_status: 'entered-age' });
        setStep(step + 1);
    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
    <>
        <form id="is-spiritual-form" onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
                <h1 className="text-lg my-2 text-left">How old are you?</h1>
                <div className="form-control w-full max-w-xs">
                    <Radio 
                        control={control}
                        rules={{
                            required: 'Age is required'
                        }}
                        data={data} />
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
                form="is-spiritual-form" 
                btnQnr
                disabled={!watch('age')} />
        </div>
    </>
    )
}

export default Age;