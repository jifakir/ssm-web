import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';
import Select from '../UI/Select';
import TextInput from '../UI/TextInput';


const data = {
    name: 'is_in_us',
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





// Component
const IsInUs = ({ step, setStep, profile }) => {

    const { control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: {
        is_in_us: profile?.is_in_us,
    }});
    const [updatePatient, { isSucces, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {

        const { is_in_us, user_address } = data;
        if(is_in_us == null) return;
        await updatePatient({id: profile?.id, is_in_us, user_address, registration_status: 'entered-is_religious' });
        setStep(step + 1);
    };

    const handleBack = () => {

        setStep(step - 1);

    };


    return (
    <>
        <form id="is-is_in_us-form" onSubmit={handleSubmit(handleNext)} className="">
            <div className="w-full">
                <h1 className="text-lg my-2 text-left">Do you live in the United States?</h1>
                <div className="form-control w-full max-w-xs">
                    <Radio control={control} data={data} />
                </div>
            </div>
            <div className={`w-full mt-5 ${watch('is_in_us') ? 'block' : 'hidden'}`}>
                <h1 className="text-lg my-5 text-left">Provide your address?</h1>
                <div className="form-control w-full space-y-2">
                    <div className="form-control w-full max-w-xs">
                        <TextInput
                            control={control}
                            name={'user_address.line1'}
                            rules={{
                                required: 'Line 1 is required'
                            }}
                            pHolder={'Street Address Line 1'}
                             />
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
                form="is-is_in_us-form" 
                btnQnr
                disabled={watch('is_in_us')==null} />
        </div>
    </>
    )
}

export default IsInUs;