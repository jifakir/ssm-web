import React, { useRef, useState, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import Input from '../UI/TextInput';
import { HiPlus } from 'react-icons/hi';
import { MdOutlineClose, MdAdd, MdEdit } from 'react-icons/md';
import { FaGraduationCap, FaRegAddressCard } from 'react-icons/fa';
import Button from '../UI/Button';
import Checkbox from '../UI/Checkbox';
import { titles } from '../data';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation, useUploadLicenseMutation } from '../../store/api/ssmApi';

const Qualification = ({profile}) => {

    const inputRef = useRef();
    const [image, setImage] = useState(profile?.license);
    const [message, setMessage] = useState();
    const [form, setForm] = useState(false);

    const {  
        control, handleSubmit, 
        watch, formState:{errors} } = useForm({
            defaultValues: {
                education: profile?.education || [{major: '', degree: '', school_name: ''}],
                titles: profile?.titles,
                license_type: profile?.license_type,
            }});
    const {  fields, append, remove } = useFieldArray({
        control,
        name: "education"
      });
    
    const [updateTherapist, { isSuccess, isLoading, isError, error }] = useUpdateTherapistMutation();
    const [uploadLicense, { data:licenseData, isLoading:licenseLoading, isSuccess:licenseSuccess }] = useUploadLicenseMutation();
    const isFilledUp = watch('education').every((itm, idx) => itm.major && itm.degree && itm.school_name)
    
    const handleNext = async (data) => {
        if(!data) return;
        await updateTherapist({ 
            id: profile?.id, 
            ...data,
            titles: data.titles.filter(t=>t),
            registration_status: 'completed' });
    };

    const uploadHandler = (e) => {

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("license",file);
        setImage(file);
        uploadLicense({id:profile?.id,formData});
        
    };


    const handleAppend = () => {
        if(fields.length >= 3) return;
        append({degree: '', major: '', school_name: ''})
    };
    console.log(watch());

    useEffect(() => {
        if(isSuccess){
            setForm(false);
        }
        if(licenseSuccess){
            setImage(licenseData.license);
            setMessage('License uploaded successfully!')
        }
    },[isSuccess,licenseSuccess]);

    return (
    <div className='mt-5 md:mt-0 relative px-4 py-2.5 md:py-5 border-[1.5px] md:border-0 rounded-md md:rounded-none md:border-b-2 border-primary md:border-black'>
        <h2 className="font-medium text-primary">Professional Information</h2>
        <div className="absolute top-0 md:top-2 right-2 md:right-0 text-2xl text-secondary cursor-pointer">
            {
                form ? 
                <MdOutlineClose onClick={() => setForm(false)} /> : 
                <div onClick={() => setForm(true)} className="">
                    <MdEdit className="hidden md:block" />
                    <span className="md:hidden text-sm font-medium underline underline-offset-4">Edit</span>
                </div>
            }
        </div>
        {form ?
        <form onSubmit={handleSubmit(handleNext)} className="">
            <div className="flex items-center my-5">
                <h1 className="text-lg mr-5">Please add your education</h1>
                <div onClick={handleAppend} className="btn btn-primary btn-outline btn-sm text-sm">
                    <HiPlus className='mr-1' />
                    Education
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
                {
                    fields.map((itm, idx) => {
                        return (
                            <div key={`education1_${itm.id}`} className="space-y-3" >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-left">Education {idx + 1}</h2>
                                    <div className={`text-lg hover:text-error cursor-pointer ${idx === 0 ? 'hidden' : 'block'}`} onClick={() => remove(idx)}>
                                        <MdOutlineClose />
                                    </div>
                                </div>
                                <Input
                                    control={control}
                                    name={`education.${idx}.degree`}
                                    pHolder={'Degree'}
                                    rules={{
                                        required: "Degreee is required."
                                    }} 
                                     />
                                <Input 
                                    control={control}
                                    name={`education.${idx}.major`}
                                    pHolder={'Major'}
                                    rules={{
                                        required: "Major is required."
                                    }}  />
                                <Input 
                                    control={control}
                                    name={`education.${idx}.school_name`}
                                    pHolder={'School'}
                                    rules={{
                                        required: "School is required."
                                    }}  />
                            </div>
                        )
                    })
                }

            </div>
            <div className="w-full mt-5">
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
                            title={'UPLOAD'} btnOutline btnSecondary
                            className={'w-full md:w-auto'} >
                            <MdAdd className='hidden md:block' />
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
                <div className="mt-5">
                    <Checkbox 
                        data={titles} 
                        control={control}
                        errors={errors}
                         />
                </div>
                <div className="mt-5">
                    <Button title={'Submit'} btnQnr />
                </div>
        </form>:
        <div className="mt-5 text-sm md:text-base">
            <div className="flex justify-start items-start md:items-center">
                <div className="flex font-semibold justify-center text-primary">
                    <FaGraduationCap className='text-xl hidden md:block' />
                    <h2 className="md:pl-2">Education</h2>
                </div>
                <div className=" pl-5">
                        {profile?.education?.map((edu, idx) => (
                            <h4 key={idx} className="">
                                {edu.degree + ', ' + edu.major + ', ' + edu.school_name}
                            </h4>
                        ))}
                </div>
            </div>
            <div className="flex justify-start py-5">
                <div className="flex items-center font-semibold justify-center text-primary">
                    <div className="text-xl">
                        <FaRegAddressCard className='hidden md:block' />
                    </div>
                    <h2 className="md:pl-3">License</h2>
                </div>
                <div className="pl-5 flex-1">
                            <h4 className="">
                                {
                                    profile?.license_type
                                }
                            </h4>
                </div>
            </div>
            <div className="flex items-center justify-start py-2">
                <div className="flex font-semibold justify-center text-primary">
                    <div className="text-2xl hidden md:block">
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><desc></desc><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="15" cy="15" r="3"></circle><path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5"></path><path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73"></path><line x1="6" y1="9" x2="18" y2="9"></line><line x1="6" y1="12" x2="9" y2="12"></line><line x1="6" y1="15" x2="8" y2="15"></line></svg>
                    </div>
                <h2 className="md:pl-2">Title(s)</h2>
                </div>
                <div className="pl-5 flex-1">
                        <h4 className="">
                            {profile?.titles?.map(v => {
                                return v.toUpperCase() + ' '
                            })} 
                        </h4>
                </div>
            </div>
        </div>
        }
    </div>
    )
}

export default Qualification;