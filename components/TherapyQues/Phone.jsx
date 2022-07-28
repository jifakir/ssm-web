import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import TextInput from '../../components/UI/TextInput';
import { BiLoaderAlt } from 'react-icons/bi';
import PhonNumber from '../UI/Number';
import { useEffect } from 'react';

const Phone = ({ step, setStep, profile }) => {

    const { control, handleSubmit, watch, formState: { errors} } = useForm({
        defaultValues: {
            phone: profile?.phone
        }
    });
    const [updateTherapist, { isSuccess, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { phone } = data;
        await updateTherapist({id: profile?.id, phone, registration_status: 'entered-phone' });
    
    };

    const handleBack = () => {
        setStep(step - 1);
    };


    useEffect(()=>{
        if(isSuccess){
            setStep(step + 1);
        }
    },[isSuccess]);

    return (
        <>
            <form id='phone-form' onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <div className="form-control w-full md:max-w-xs">
                    <h1 className="my-2 text-left">Phone Number</h1>
                        <PhonNumber 
                            control={control}
                            name="phone"
                            rules={{
                                required: "Number is required",
                                pattern: {
                                    value: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/i,
                                    message: "Please, input a valid number."
                                }
                            }}
                             />
                    </div>
                </div>
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Back'}
                    btnQnr
                    btnSecondary
                    onClick={handleBack} />
                <Button 
                    title={'Next'}
                    btnQnr
                    form="phone-form"
                    disabled={!watch('phone')} >
                        {
                            isLoading ? <BiLoaderAlt className="animate-spin text-2xl mr-2" /> : ''
                        }
                </Button>
            </div>
        </>
    )
}


export default Phone;