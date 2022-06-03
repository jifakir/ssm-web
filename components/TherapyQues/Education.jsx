import React from 'react';
import { HiPlus } from 'react-icons/hi';
import { MdOutlineClose } from 'react-icons/md';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Input from '../UI/TextInput';
import Button from '../UI/Button';


// Component

const Education = ({step, setStep, profile}) => {

    const [qualifyNum, setQualifyNum] = React.useState(1);

    const { register, control, trigger, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {education: profile?.education || [{major: '', degree: '', school_name: ''}]}});
    const {  fields, append, remove, swap } = useFieldArray({
        control,
        name: "education"
      });
    
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const isFilledUp = watch('education').every((itm, idx) => itm.major && itm.degree && itm.school_name)
    const handleNext = async (data) => {
        if(!data) return;
        await updateTherapist({ id: profile?.id, ...data, registration_status: 'entered-education' });

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };

    return (
    <>
        <form id="education-form" onSubmit={handleSubmit(handleNext)} className="">

            <div className="flex items-center my-5">

                <h1 className="text-lg mr-5">Please add your education</h1>
                <div onClick={() => append({degree: '', major: '', school_name: ''})} className="btn btn-primary btn-outline btn-sm text-sm">
                    <HiPlus className='mr-1' />
                    Education
                </div>
            </div>
            <div className="flex gap-5">

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
                                <Input data={{name: `education.${idx}.degree`, pHolder: 'Major', required: true}} register={register} errors={errors} />
                                <Input data={{name: `education.${idx}.major`, pHolder: 'Major/Minor/Degree Focus', required: true}} register={register} errors={errors} />
                                <Input data={{name: `education.${idx}.school_name`, pHolder: 'School Name',  required: true}} register={register} errors={errors} />
                            </div>
                        )
                    })
                }

            </div>
        </form>
        <div className={`flex gap-5 py-5`}>
            <Button 
                title={'Back'} 
                onClick={handleBack}
                className="btn-outline border-neutral px-8 text-2xl" />
            <Button 
                title={'Next'} 
                form="education-form" 
                className={`${isLoading ? 'loading' : ''} px-8 text-2xl ${ !isFilledUp ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
        </div>
    </>
    )
}

export default Education;