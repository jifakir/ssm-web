import React from 'react';
import { useForm } from 'react-hook-form';
import Select from '../UI/MultiSelect';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';

const States = ({step, setStep, profile}) => {
    
    const { 
        register, 
        handleSubmit, 
        control, 
        watch, 
        formState: { errors} } = useForm({defaultValues: {licensed_states: profile?.licensed_states || []}});
    
        const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {
        const { licensed_states  } = data;
        console.log(licensed_states);
        await updateTherapist({id: profile?.id, licensed_states, registration_status: 'entered-insurance' });
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };


    const insA_D = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

    
    
    return (
        <>
            <form id="stateform" onSubmit={handleSubmit(handleNext)} className="text-sm text-left">
                <h1 className="text-lg my-2">Please select all states where you are licensed to provide counseling</h1>
                <div className="space-y-5">
                    {
                        <div className="w-1/2">
                            <Select 
                                control={control} 
                                data={{
                                    name: 'licensed_states', 
                                    options: insA_D.map(v=> ({label: v, value: v.trim()}))}
                                    } />
                        </div>
                    }
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
                    form="stateform" 
                    btnQnr 
                    disabled={watch('licensed_states') == null}
                    />
            </div>
        </>
    )
}

export default States;