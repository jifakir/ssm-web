import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Input from '../UI/TextInput';
import { BiLoaderAlt } from 'react-icons/bi';



const DateOfBirth = ({ step, setStep, profile }) => {

    const { control, handleSubmit, watch } = useForm({defaultValues: {date_of_birth: profile?.date_of_birth}});
    const [updatePatient, { isSuccess, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { date_of_birth } = data;
        if(!date_of_birth) return;
        await updatePatient({ id: profile?.id, date_of_birth, registration_status: 'entered-date_of_birth' });
    };

    const handleBack = () => {

        setStep(step - 1);

    };

    useEffect(() => {
        if(isSuccess){
            setStep(step + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isSuccess]);
    
    return (
        <>
            <form id="birthdate-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <div className="form-control w-full md:max-w-xs">
                        <Input 
                            type={'date'} 
                            control={control}
                            rules={{
                                required: "Date of birth is required!"
                            }}
                            name={'date_of_birth'}
                            title={"Date of birth"}
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
                    disabled={!watch('date_of_birth')} >
                        {
                            isLoading ? <BiLoaderAlt className="animate-spin text-2xl mr-2" /> : ''
                        }
                </Button>
            </div>
        </>
    )
}

export default DateOfBirth;