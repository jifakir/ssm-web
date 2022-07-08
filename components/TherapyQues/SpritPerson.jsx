import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';
import { useEffect } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';


const offerData = {
    name: 'offer_spirituality',
    options: [
        {
            label: 'Yes, if the patient prefers',
            value: true
        },
        {
            label: 'No',
            value: false
        },
    ]
};

const data = {
        
    name: 'is_spiritual',
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

const SpiritPerson = ({ step, setStep, profile }) => {

    const { register, 
        control, 
        handleSubmit, watch, 
        formState: { errors} } = useForm({defaultValues: {
            is_spiritual: profile?.is_spiritual,
            offer_spirituality: profile?.offer_spirituality
        }});
    const [updateTherapist, { isSuccess, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {
        await updateTherapist({id: profile?.id, ...data, registration_status: 'entered-spirit-persion' });
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
            <form id="spirit-person-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <div className="">
                        <h1 className="text-lg my-2 text-left">Do you consider yourself a spiritual person?</h1>
                        <div className="form-control w-full max-w-xs">
                            <Radio control={control} rules={{required: 'Spirit person is required.'}} data={data} />
                        </div>
                    </div>
                    {
                        watch('is_spiritual') &&
                        (
                        <div className={` mt-5`}>
                            <h1 className="text-lg my-2 text-left">Do you offer spirituality in your sessions?</h1>
                            <div className="form-control w-full max-w-xs">
                                <Radio control={control} rules={{required: 'This field is required'}} data={offerData} />
                            </div>
                        </div>
                        )
                    }
                    
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
                    form="spirit-person-form" 
                    btnQnr 
                    disabled={watch('is_spiritual') ? watch('offer_spirituality') == null : watch('is_spiritual') == null} >
                    {
                        isLoading ? <BiLoaderAlt className="animate-spin text-2xl mr-2" /> : ''
                    }
                </Button>
            </div>
        </>
    )
}

export default SpiritPerson;