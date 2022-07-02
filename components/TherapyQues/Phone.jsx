import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import TextInput from '../../components/UI/TextInput';
import { BiLoaderAlt } from 'react-icons/bi';

const Phone = ({ step, setStep, profile }) => {

    const { control, handleSubmit, watch, formState: { errors} } = useForm({
        defaultValues: {
            phone: profile?.phone
        }
    });
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { phone } = data;

        await updateTherapist({id: profile?.id, phone, registration_status: 'entered-phone' });
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    return (
        <>
            <form id='phone-form' onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <div className="form-control w-full max-w-xs">
                        <TextInput 
                            control={control} 
                            errors={errors}
                            name="phone"
                            pHolder={'000-000-0000'}
                            title={'Phone Number'}
                            rules={{
                                required: true,
                                pattern: /\d/i
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