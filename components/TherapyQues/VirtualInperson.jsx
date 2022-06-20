import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';

const data = {
    title: 'Do you currently provide virtual or in-person sessions?',
    name: 'will_provide_in_person',
    options: [
        {
            label: 'Virtual only',
            value: 'virtual_only'
        },
        {
            label: 'In-Person only',
            value: 'in_person_only'
        },
        {
            label: 'Both',
            value: 'both'
        },
    ]
};


const VirtualInperson = ({ step, setStep, profile }) => {

    const { control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: { will_provide_in_person: profile?.will_provide_in_person }});
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { will_provide_in_person } = data;
        await updateTherapist({ will_provide_in_person, registration_status: 'entered-will_provide_in_person' });
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    
    return (
        <>
            <form id="virtual-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                        <Radio control={control} rules={{required: 'Virtual Inperson is requred.'}} data={data} />
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
                    form="virtual-form" 
                    btnQnr 
                    disabled={!watch('will_provide_in_person')} />
            </div>
        </>
    )
}

export default VirtualInperson;