import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import TextInput from '../../components/UI/TextInput';


const Address = ({ step, setStep, profile }) => {

    const { register, watch, handleSubmit, formState: { errors} } = useForm({defaultValues: {user_address: profile?.user_address}});
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();
    const [submitted, setSubmitted] = useState(false);
    const handleNext = async (data) => {

        const { user_address: {line1, line2, city, state, zip_code} } = data;
        console.log("User Address: ",data);
        if(!state) return;
        await updateTherapist({ 
                id:profile?.id, 
                user_address: {
                    line1: line1 ? line1 : '',
                    line2: line2 ? line2 : '',
                    city: city ? city : '',
                    state: state ? state : '',
                    zip_code: zip_code ? zip_code : ''
                }, 
                registration_status: 'entered-address' });
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };



    return (
        <>
            <form id='address-form' onSubmit={handleSubmit(handleNext)} className="">
                <div className="space-y-1">
                    <div className="form-control w-full max-w-xs">
                        <TextInput register={register} errors={errors} data={{type: 'text', pHolder: 'Street Address Line 1', name: 'user_address.line1', title: 'Address'}} />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <TextInput register={register} errors={errors} data={{type: 'text', pHolder: 'Street Address Line 2', name: 'user_address.line2' }} />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <TextInput register={register} errors={errors} data={{type: 'text', pHolder: 'City', name: 'user_address.city', }} />
                    </div>
                    <div className="form-control w-full max-w-xs relative">
                        <TextInput register={register} errors={errors} data={{type: 'text', pHolder: 'State', name: 'user_address.state', }} className="float-left w-28" />
                        <TextInput register={register} errors={errors} data={{type: 'text', pHolder: 'Zip Code', name: 'user_address.zip_code', }} className="w-48 absolute top-0 right-0" />
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
                    form="address-form" 
                    btnQnr />
            </div>
        </>
    )
}

export default Address;