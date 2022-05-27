import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';


const VirtualInperson = ({ step, setStep }) => {

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
        title: 'Do you currently provide virtual or in-person sessions?',
        name: 'vertual_inperson',
        options: [
            {
                label: 'Virtual only',
                value: 'virtual_only'
            },
            {
                label: 'In-Person only',
                value: 'in_person_only'
            },
            {
                label: 'Both',
                value: 'both'
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
                <Button title={'Back'} />
                <Button title={'Next'} className="btn-base text-black" />
            </div>
        </form>
    )
}

export default VirtualInperson;