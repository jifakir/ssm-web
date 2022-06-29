import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';


const InpersonFuture = ({ step, setStep, profile }) => {

    const { 
        control, 
        handleSubmit, 
        watch, 
        formState: { errors} } = useForm({
            defaultValues: {
                inperson_future: profile?.inperson_future || ''
            } });
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
        title: 'Do you plan on providing in-person sessions in the future?',
        name: 'inperson_future',
        options: [
            {
                label: 'Yes',
                value: true
            },
            {
                label: 'No',
                value: false
            },
        ]
    };

    console.log(profile?.inperson_future);

    return (
        <form onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
                <Radio control={control} rules={{ required: 'Inperson Future is required.' }} data={data} />
            </div>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button title={'Back'}
                btnQnr
                btnSecondary
                 />
                <Button 
                    title={'Next'}
                    btnQnr
                    disabled={watch('inperson_future') == null} />
            </div>
        </form>
    )
}

export default InpersonFuture;