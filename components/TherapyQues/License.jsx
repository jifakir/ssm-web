import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';
import Select from '../UI/Select';
import Input from '../UI/TextInput';
import { useRef } from 'react';
import { MdAdd } from 'react-icons/md';

const data = {
    name: 'license_title',
    pHolder: 'Add Professional License',
};



const Experience = ({ step, setStep, profile }) => {

    const inputRef = useRef();
    // const { head, tail } = profile?.years_of_experience;
    const { register, handleSubmit, control, watch } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { license_title } = data;
        if(!license_title) return;
        const splitted_year = license_title?.value.split('-');
        await updateTherapist({id: profile?.id, license_title: {head:splitted_year[0], tail:splitted_year[1]}, registration_status: 'entered-years_of_experience' });
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    const uploadHandler = (e) => {

        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const url = reader.result;
            setImgUrl(url);
        }
        reader.onerror = (error) => {
            console.log(error);
        }

    };

    
    return (
        <>
            <form id="experience-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    <h1 className="my-2 text-left">Professional Licensure/Insurance</h1>
                    <div className="form-control w-full max-w-xs text-left">
                        <Input 
                            control={control}
                            name={'license_title'}
                            rules={{
                                required: 'License is required'
                            }}
                             />
                    </div>
                    <h1 className="my-2 text-left mt-5">Upload License ID</h1>
                    <div className="flex my-2">
                        <input ref={inputRef} {...register('license')} onChange={uploadHandler} type="file" className="hidden" />
                        <Button
                            onClick={() => inputRef.current.click()}
                            title={'UPLOAD'} btnQnr>
                            <MdAdd />
                        </Button>
                    </div>
                    <p className="text-left text-xs">
                        .JPG,.PNG,.PDF formats only
                    </p>
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
                    disabled={!watch('license_title')}
                     />
            </div>
        </>
    )
}

export default Experience;