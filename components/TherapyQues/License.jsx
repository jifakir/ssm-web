import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation, useUploadLicenseMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';
import Select from '../UI/Select';
import Input from '../UI/TextInput';
import { useRef } from 'react';
import { MdAdd } from 'react-icons/md';
import { useState } from 'react';
import { useEffect } from 'react';




const Experience = ({ step, setStep, profile }) => {

    const inputRef = useRef();
    const [image, setImage] = useState(profile?.license);
    const [message, setMessage] = useState();
    const { register, handleSubmit, control, watch } = useForm({defaultValues: {
        license_type: profile?.license_type,

    }});
    const [updateTherapist, { isSuccess, isLoading, isError, error }] = useUpdateTherapistMutation();
    const [uploadLicense, { data:licenseData, isLoading:licenseLoading, isSuccess:licenseSuccess }] = useUploadLicenseMutation();
    const handleNext = async (data) => {

        const { license_type } = data;
        if(!license_type || !image) return;
        await updateTherapist({id: profile?.id, license_type, registration_status: 'entered-license'});
    };

    const handleBack = () => {

        setStep(step - 1);

    };

    const uploadHandler = (e) => {
        const file = e.target.files[0];
        
        const formData = new FormData();
        formData.append("license",file);
        setImage(file);
        uploadLicense({id:profile?.id,formData});
        
    };

    useEffect(() => {
        if(isSuccess){
            setStep(step + 1);
        }
        if(licenseSuccess){
            setImage(licenseData.license);
            setMessage('License uploaded successfully!')
        }
    },[isSuccess,licenseSuccess]);

    console.log("Message: ", message);

    return (
        <>
            <form id="license-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <h1 className="my-5 text-left">Professional Licensure/Insurance</h1>
                    <div className="form-control w-full max-w-xs text-left">
                        <Input 
                            control={control}
                            name={'license_type'}
                            pHolder={'Add Professional License'}
                            rules={{
                                required: 'License is required'
                            }}
                             />
                    </div>
                    <h1 className="my-2 text-left mt-5">Upload License ID</h1>
                    <div className="flex my-2">
                        <input ref={inputRef} accept="image/jpg, image/png, application/pdf" onChange={uploadHandler} type="file" className="hidden" />
                        <Button
                            type="button"
                            onClick={() => inputRef.current.click()}
                            title={'UPLOAD'} btnQnr>
                            <MdAdd />
                        </Button>
                    </div>
                    <div className="">
                        {
                            !image ? 
                            <p className="text-left text-xs">
                                {
                                    message ? message : '.JPG,.PNG,.PDF formats only'
                                }
                            </p>:
                            <p className="text-left text-xs text-primary">
                                { licenseLoading ? 'Uploading....' : message ? message : '.JPG,.PNG,.PDF formats only'}
                            </p>
                        }
                    </div>
                </div>
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr
                    btnSecondary
                    className="btn-outline border-neutral px-8 text-2xl" />
                <Button 
                    title={'Next'} 
                    form="license-form" 
                    btnQnr
                    disabled={!watch('license_type')}
                     />
            </div>
        </>
    )
}

export default Experience;