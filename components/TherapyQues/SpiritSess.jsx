import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';


const SpiritSession = ({ step, setStep }) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { email } = data;

        await updateTherapist({ email, registration_status: 'email' });

        // if(!isSucces){
        //     return
        // }

        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    const data = {
        title: 'Do you offer spirituality in your sessions?',
        name: 'spirit_session',
        options: [
            {
                label: 'Yes, if the patient prefers',
                value: 'yes'
            },
            {
                label: 'No',
                value: 'no'
            },
        ]
    };
    return (
        <form onSubmit={handleSubmit(handleNext)} className="">
            <div className="form-control w-full max-w-xs">
            <div className="form-control w-full max-w-xs">
                <Radio register={register} errors={errors} data={data} />
            </div>
            </div>
            <div className={`flex gap-5 py-5`}>
                <Button title={'Back'} onClick={handleBack} />
                <Button title={'Next'} onClick={handleNext} className={`${!watch().spirit_session ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </form>
    )
}

export default SpiritSession;