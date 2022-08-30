import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import InputText from '../UI/InputText';
import Radio from '../UI/Radio';
import { BiLoaderAlt } from 'react-icons/bi';
import InputRange from '../UI/InputRange';


const data = {
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
            session_fee: typeof profile?.session_fee === 'string' ? profile.session_fee.split('-') : [100, 500]
        }});
    
    const [updateTherapist, { isSuccess, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { accept_session_fee, session_fee } = data;
        if(accept_session_fee && !session_fee) return;
        await updateTherapist({
            id: profile?.id, 
            accept_session_fee, 
            session_fee: accept_session_fee ? session_fee.join('-') : 1, 
            registration_status: 'entered-accept_session_fee' 
        });
    };

    const handleBack = () => {

        setStep(step - 1);

    };

    React.useEffect(() => {
        if(isSuccess){
            setStep(step + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isSuccess]);

    return (
        <>
            <form id="accept-session-fee" onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <div className="form-control w-full">
                    <h1 className="text-lg my-2 text-left">Do you offer a sliding scale?</h1>
                        <Radio control={control} rules={{required: 'Accept Session Fee is required.'}} data={data} />
                    </div>
                    <div className={`${watch('accept_session_fee') ? 'block' : 'hidden'} mt-10`}>
                        <h1 className="my-2 text-left">Sliding scale</h1>
                        <div className="form-control w-full max-w-xs text-left">
                            {/* <Select control={control} data={Feedata} /> */}
                            {/* <InputText
                                control={control}
                                pHolder={'Enter your fees'}
                                name={'session_fee'} /> */}
                            <InputRange control={control} name={'session_fee'} />
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
                    disabled={watch('accept_session_fee') == null || (watch('accept_session_fee') && !watch('session_fee'))} >
                    {
                        isLoading ? <BiLoaderAlt className="animate-spin text-2xl mr-2" /> : ''
                    }
                </Button>
            </div>
        </>
    )
}

export default AcceptSessionFee;