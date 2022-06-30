import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';
import Select from '../UI/Select';

const data = {
    title: 'Do you accept session Fee?',
    name: 'accept_session_fee',
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

const Feedata = {
    name: 'session_fee',
    options: [
        {
            label: '$65',
            value: '65'
        },
        {
            label: '$100',
            value: '100'
        },
        {
            label: '$150',
            value: '150'
        },
        {
            label: '$200',
            value: '200'
        },
        {
            label: '$250',
            value: '250+'
        },
    ]
};

const AcceptSessionFee = ({ step, setStep, profile }) => {

    const { control, handleSubmit, watch, formState: { errors} } = useForm({
        defaultValues: {
            accept_session_fee: profile?.accept_session_fee,
            session_fee: profile?.session_fee
        }});
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { accept_session_fee, session_fee } = data;
        if(accept_session_fee == null) return;
        await updateTherapist({
            id: profile?.id, 
            accept_session_fee, 
            session_fee, 
            registration_status: 'entered-accept_session_fee' 
        });
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    console.log("Session Fee: ", profile?.session_fee);
    
    return (
        <>
            <form id="accept-session-fee" onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <div className="form-control w-full">
                        <Radio control={control} rules={{required: 'Accept Session Fee is required.'}} data={data} />
                    </div>
                    <div className={`${watch('accept_session_fee') ? 'block' : 'hidden'} mt-10`}>
                        <h1 className="my-2 text-left">How much do you charge per session?</h1>
                        <div className="form-control w-full max-w-xs text-left">
                            <Select control={control} data={Feedata} />
                        </div>
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
                    form="accept-session-fee" 
                    btnQnr
                    disabled={watch('accept_session_fee') == null} />
            </div>
        </>
    )
}

export default AcceptSessionFee;