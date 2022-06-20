import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';
const data = {
    title: 'Do you prefer virtual or in-person sessions?',
    name: 'inperson_future',
    options: [
        {
            label: 'Virtual only',
            value: 'virtual'
        },
        {
            label: 'In-person only',
            value: 'in-person'
        },
        {
            label: 'No preference',
            value: 'no_preference'
        },
    ]
};

const willData = {
    title: 'Will you someday want to transition to in-person sessions?',
    name: 'will_like_in_person',
    options: [
        {
            label: 'Virtual only',
            value: 'virtual'
        },
        {
            label: 'In-person only',
            value: 'in-person'
        },
        {
            label: 'No preference',
            value: 'no_preference'
        },
    ]
};

const InpersonFuture = ({ step, setStep }) => {

    const { control, handleSubmit, watch, formState: { errors} } = useForm();
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

    
    return (
        <form id="inperson_future-form" onSubmit={handleSubmit(handleNext)} className="">
            <div className="form-control w-full">
                <div className="">
                    <Radio control={control} data={data} />
                </div>
                <div className={`${watch('inperson_future') ? 'block' : 'hidden'}`}>
                    <Radio control={control} data={willData} />
                </div>
            </div>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button title={'Back'}
                    btnQnr
                    btnSecondary
                 />
                <Button title={'Next'}
                    btnQnr
                    form={"inperson_future-form"}
                    disabled={!watch('inperson_future')} />
            </div>
        </form>
    )
}

export default InpersonFuture;