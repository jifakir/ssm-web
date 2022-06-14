import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Input from '../UI/TextInput';

const data = {
    title: 'Date of birth',
    name: 'date_of_birth',
};


const DateOfBirth = ({ step, setStep, profile }) => {

    const { register, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {date_of_birth: profile?.date_of_birth}});
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { date_of_birth } = data;
        if(!date_of_birth) return;
        await updateTherapist({ id: profile?.id, date_of_birth, registration_status: 'entered-date_of_birth' });
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    
    return (
        <>
            <form id="birthdate-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <div className="form-control w-full max-w-xs">
                        <Input 
                            type={'date'} 
                            register={register} 
                            errors={errors} 
                            data={data}
                            className="cursor-pointer" />
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
                    form="birthdate-form"
                    btnQnr
                    disabled={!watch('date_of_birth')} />
            </div>
        </>
    )
}

export default DateOfBirth;