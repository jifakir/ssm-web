import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';

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
            value: 'true'
        },
        {
            label: 'No',
            value: 'false'
        },
    ]
};

const SpiritPerson = ({ step, setStep, profile }) => {

    const { register, control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {is_spiritual: profile?.is_spiritual}});
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { is_spiritual } = data;
        if(!is_spiritual) return;
        await updateTherapist({id: profile?.id, is_spiritual, registration_status: 'entered-spirit-persion' });
        setStep(step + 1);
    };

    const handleBack = () => {

        setStep(step - 1);

    };

    console.log(watch().is_spiritual);

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
                        watch('is_spiritual') === 'true' &&
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
                    disabled={!watch('is_spiritual') || !watch('offer_spirituality')} />
            </div>
        </>
    )
}

export default SpiritPerson;