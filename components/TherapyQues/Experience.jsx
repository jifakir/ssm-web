import React from 'react';
import { set, useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';
import Select from '../UI/Select';
import { useEffect } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

const data = {
    name: 'years_of_experience',
    options: [
        {
            label: '0-5 years',
            value: '1-5'
        },
        {
            label: '6-10 years',
            value: '6-10'
        },
        {
            label: '11-15 years',
            value: '11-15'
        },
        {
            label: '16-20 years',
            value: '16-20'
        },
        {
            label: '21-25 years',
            value: '21-25'
        },
    ]
};



const Experience = ({ step, setStep, profile }) => {

    const { register, handleSubmit, control, watch, formState: { errors} } = useForm({
        defaultValues: {
            years_of_experience:  profile ? `${profile?.years_of_experience?.head}-${profile?.years_of_experience?.tail}` : ''
        }
    });
    const [updateTherapist, { isSuccess, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { years_of_experience } = data;
        if(years_of_experience==null) return;
        const splitted_year = years_of_experience?.split('-');
        await updateTherapist({id: profile?.id, years_of_experience: {head:splitted_year[0], tail:splitted_year[1]}, registration_status: 'entered-years_of_experience' });
        
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
            <form id="experience-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <h1 className="text-lg my-2 text-left">How many years of experience do you have?</h1>
                    <div className="form-control w-full md:max-w-xs text-left">
                        <Select control={control} data={data} />
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
                    form="experience-form" 
                    btnQnr
                    disabled={!watch('years_of_experience')}
                     >
                    {
                        isLoading ? <BiLoaderAlt className="animate-spin text-2xl mr-2" /> : ''
                    }
                </Button>
            </div>
        </>
    )
}

export default Experience;