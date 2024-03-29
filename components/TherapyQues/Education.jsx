import React from 'react';
import { HiPlus } from 'react-icons/hi';
import { MdOutlineClose } from 'react-icons/md';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Input from '../UI/TextInput';
import Button from '../UI/Button';
import { BiLoaderAlt } from 'react-icons/bi';
import { useEffect } from 'react';


// Component

const Education = ({step, setStep, profile}) => {

    const [qualifyNum, setQualifyNum] = React.useState(1);

    const {  control, handleSubmit, watch, } = useForm({defaultValues: {education: profile?.education || [{major: '', degree: '', school_name: ''}]}});
    const {  fields, append, remove } = useFieldArray({
        control,
        name: "education"
      });
    
    const [updateTherapist, { isSuccess, isLoading, isError, error }] = useUpdateTherapistMutation();

    const isFilledUp = watch('education').every((itm, idx) => itm.major && itm.degree && itm.school_name)
    const handleNext = async (data) => {
        if(!data) return;
        await updateTherapist({ id: profile?.id, ...data, registration_status: 'entered-education' });
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleAppend = () => {
        if(fields.length >= 4) return;
        append({degree: '', major: '', school_name: ''})
    };
    
    useEffect(() => {
        if(isSuccess){
            setStep(step + 1);
        }
    },[isSuccess]);
    
    return (
    <>
        <form id="education-form" onSubmit={handleSubmit(handleNext)} className="">

            <div className="flex flex-col md:flex-row md:items-center my-5">
                <h1 className="text-lg mr-5 text-left">Please add your education</h1>
                <div onClick={handleAppend} className="btn btn-primary btn-outline btn-sm text-sm mt-5 md:mt-0">
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
        </form>
        <div className={`flex gap-5 py-5 mt-9`}>
            <Button 
                title={'Back'} 
                onClick={handleBack}
                btnQnr 
                btnSecondary/>
            <Button 
                title={'Next'} 
                form="education-form" 
                btnQnr
                disabled={!isFilledUp} >
                    {
                        isLoading ? <BiLoaderAlt className="animate-spin text-2xl mr-2" /> : ''
                    }
            </Button>
        </div>
    </>
    )
}

export default Education;