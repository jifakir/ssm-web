import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';


const SlideScale = ({ step, setStep }) => {

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
        title: 'Do you offer a sliding scale?',
        name: 'slide_scale',
        options: [
            {
                label: 'Yes',
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
                <Button title={'Back'} />
                <Button title={'Next'} className="btn-base text-black" />
            </div>
        </form>
    )
}

export default SlideScale;