import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Select from '../../components/UI/Select';
import Checkbox from '../UI/Checkbox';
import { useEffect } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { therapy_specializations } from '../data';

const Specialization = ({ step, setStep, profile }) => {

    const { register, handleSubmit, control, watch, formState: { errors} } = useForm({
        defaultValues: {therapy_specializations: profile?.therapy_specializations}
    });
    const [updateTherapist, { isSuccess, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { therapy_specializations } = data;
        if(therapy_specializations == null) return;
        await updateTherapist({ id: profile?.id, therapy_specializations: therapy_specializations.filter(sp=> sp), registration_status: 'entered-specialization' });
    };

    const handleBack = () => {

        setStep(step - 1);

    };

    useEffect(() => {
        if(isSuccess){
            setStep(step + 1);
        }
    },[isSuccess]);
    
    return (
        <>
            <form id="specialization-form" onSubmit={handleSubmit(handleNext)} className="">
                <h1 className="text-lg text-left my-2">Do you specialize in any type of therapy? (Select all that apply)</h1>
                <div className="w-full text-left">
                    <Checkbox control={control} register={register} errors={errors} data={therapy_specializations} />
                </div>
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr
                    btnSecondary/>
                <Button 
                    title={'Next'} 
                    form="specialization-form" 
                    btnQnr
                    disabled={watch('therapy_specializations') == null || watch('therapy_specializations').length === 0 } >
                    {
                        isLoading ? <BiLoaderAlt className="animate-spin text-2xl mr-2" /> : ''
                    }
                </Button>
            </div>
        </>
    )
}

export default Specialization;