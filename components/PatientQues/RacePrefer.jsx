import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';
import Checkbox from '../UI/Checkbox';


const raceData = {
    
    name: 'race_preference',
    required: true,
    options: [
        {
            label: 'Black/African descent',
            value: 'black'
        },
        {
            label: 'Asian',
            value: 'asian'
        },
        {
            label: 'Hispanic',
            value: 'hispanic'
        },
        {
            label: 'White',
            value: 'white'
        },
        {
            label: 'Other',
            value: 'other'
        },
    ]
};
const data = {
    name: 'has_race_preference',
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

const PreferOtherLang = ({ step, setStep, profile }) => {

    const { control, handleSubmit, watch, formState: { errors} } = useForm({
        defaultValues: {
            id: profile?.id,
            has_race_preference: profile?.has_race_preference,
            race_preference: profile?.race_preference
        }});
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { has_race_preference, race_preference } = data;
        if(has_race_preference == null) return;
        await updatePatient({
            id: profile?.id, 
            has_race_preference, 
            race_preference: race_preference || '', 
            registration_status: 'entered-has_race_preference' });

        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    return (
        <>
            <form id="race-prefer-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="w-full">
                    
                    <div>   
                        <h1 className="text-lg my-2 text-left">Do you have a race preference for your provider?</h1>
                        <div className="form-control w-full">
                            <Radio 
                                control={control}
                                rules={{
                                    required: 'Race Preference is required'
                                }} 
                                data={data} />
                        </div>
                    </div> 
                    <div className={`form-control mt-10 w-full ${watch('has_race_preference') ? 'block' : 'hidden'}`}>
                        <h1 className='text-lg my-2 text-left'>What is your race preference?</h1>
                        <Radio 
                            control={control}
                            rules={{
                                required: 'Race preference is required.'
                            }}
                            data={raceData}
                             />
                    </div>
                </div>
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr
                    btnSecondary
                     />
                <Button 
                    title={'Next'} 
                    form="race-prefer-form" 
                    btnQnr
                    disabled={watch('has_race_preference') ? watch('race_preference') == null : watch('has_race_preference') == null} />
            </div>
        </>
    )
}

export default PreferOtherLang;