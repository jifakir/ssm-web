import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import TextInput from '../../components/UI/TextInput';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';

const Thankyou = ({ step, setStep, profile }) => {

    const [modal, setModal] = useState(false);
    const { control, handleSubmit, watch, formState: { errors} } = useForm();
    const [updatePatient, {data, isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { email_address } = data;
        if(!email_address) return;
        // await updatePatient({id: profile?.id, email_address, registration_status: 'entered-email' });
        setModal(true);
    };

    const handleBack = () => {

        setStep(step - 1);
        
    };


    return (
        <>
            <form id='thankyou-form' onSubmit={handleSubmit(handleNext)} className="">
                {
                    modal ?
                    <div className="absolute top-0 left-0 z-[500] w-full min-h-screen h-screen flex justify-center items-center">
                        <div className="relative w-1/2 h-52 bg-primary text-whtie text-center flex justify-center items-center">
                            <span onClick={() => setModal(false)} className="absolute top-1 right-2 text-2xl cursor-pointer hover:text-red-600">
                                <MdClose />
                            </span>
                            <h1 className="text-2xl font-semibold text-white px-20">
                            Congratulations on starting your mental wellness journey!
                            </h1>
                        </div>
                    </div>:
                    <div className="w-full">
                        <div className="form-control w-full max-w-xs">
                            <TextInput 
                                control={control}
                                name={'email_address'}
                                title={'Email'}
                                pHolder={'Email'}
                                rules={{
                                    required: 'Email is required.',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Enter a valid email address'
                                    }
                                }} />
                        </div>
                    </div>
                }
                
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Submit'} 
                    form="thankyou-form"  
                    btnQnr
                    disabled={!watch().email_address} />
            </div>
        </>
    )
}

export default Thankyou;