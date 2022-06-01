import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Select from '../UI/Select';


const State = ({step, setStep}) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [registerTherapist, { isSuccess, isLoading, isError, error }] = useRegisterTherapistMutation();

    const handleNext = async (data) => {

        const { full_name } = data;

        await registerTherapist({ full_name, registration_status: 'entered-fullname' });

        if(!isSuccess){
            return
        }

        setStep(step + 1);

    };

    const handleBack = () => {
        if(step === 1) return;
        setStep(step - 1);
    };

    // console.log(error);

    const data = {
        title: 'What state are you in?',
        name: 'State',
        required: true,
        options: [
            {
                label: 'Alabama',
                value: 'alabama',
            },
            {
                label: 'Alaska',
                value: 'alaska',
            },
            {
                label: 'Arizona',
                value: 'arizona',
            },
            {
                label: 'Arkansas',
                value: 'arkansas',
            },
            {
                label: 'California',
                value: 'california',
            },
            {
                label: 'Colorado',
                value: 'colorado',
            },
            {
                label: 'Connecticut',
                value: 'connecticut',
            },
            {
                label: 'Delaware',
                value: 'delaware',
            },
            {
                label: 'Florida',
                value: 'florida',
            },
            {
                label: 'Georgia',
                value: 'georgia',
            },
            {
                label: 'Hawaii',
                value: 'hawaii',
            },
            {
                label: 'Idaho',
                value: 'idaho',
            },
        ]
    }
    return (
        <form onSubmit={handleSubmit(handleNext)}>
            <Select register={register} errors={errors} data={data} />
            <div className={`flex gap-5 py-5`}>
                <button onClick={handleBack} className={`btn btn-outline btn-primary`}>
                    Back
                </button>
                <button type='submit' onClick={handleNext} className={`btn text-white ${!watch().state ? 'bg-gray-400' : 'btn-primary'}`} >
                    Next
                </button>
            </div>
        </form>
    )
}

export default State;