import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import TextInput from '../../components/UI/TextInput';


const Address = ({ step, setStep, profile }) => {

    const { handleSubmit, control } = useForm({defaultValues: {user_address: profile?.user_address}});
    const [updateTherapist, { isSuccess, isLoading, isError, error }] = useUpdateTherapistMutation();
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
            <form id='address-form' onSubmit={handleSubmit(handleNext)} className="">
                <div className="space-y-1">
                <div className="form-control w-full max-w-xs">
                        <TextInput
                            control={control}
                            name={'user_address.line1'}
                            rules={{
                                required: 'Line 1 is required'
                            }}
                            pHolder={'Street Address Line 1'}
                            title={'Address'} />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <TextInput 
                            control={control}
                            name={'user_address.line2'}
                            pHolder={'Street Address Line 2'} />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <TextInput 
                            control={control}
                            name={'user_address.city'}
                            rules={{
                                required: 'City is required'
                            }}
                            pHolder={'City'} />
                    </div>
                    <div className="form-control w-full max-w-xs relative">
                        <TextInput 
                            control={control}
                            name={'user_address.state'}
                            rules={{
                                required: 'State is required'
                            }}
                            pHolder={'State'}  
                            className="float-left w-28" />
                        <TextInput 
                            control={control}
                            name={'user_address.zip_code'}
                            rules={{
                                required: 'Zip Code is required'
                            }}
                            pHolder={'Zip Code'}  
                            className="w-48 absolute top-0 right-0" />
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