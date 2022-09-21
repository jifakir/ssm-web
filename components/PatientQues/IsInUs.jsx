import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePatientMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../UI/Radio';
import Select from '../UI/Select';
import TextInput from '../UI/TextInput';
import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

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

    const { control, handleSubmit, watch, formState: { errors} } = useForm({
        defaultValues: {
        is_in_us: profile?.is_in_us,
        location: '',
        user_address: profile?.user_address
    }});
    const [updatePatient, { isSuccess, isLoading, isError, error }] = useUpdatePatientMutation();

    const handleNext = async (data) => {
        console.log(data);
        const { location, is_in_us, user_address: {line1, country, line2, city, state, zip_code} } = data;
        let form = {is_in_us};
        if(is_in_us){
            form = {
                is_in_us, 
                user_address: {
                    line1: line1 ? line1 : '',
                    line2: line2 ? line2 : '',
                    city: city ? city : '',
                    state: state ? state : '',
                    zip_code: zip_code ? zip_code : '', 
                    country: country ? country : 'us', 
                    }
            }
        }

        await updatePatient({
            id: profile?.id, 
            ...form,
            registration_status: 'entered-is_in_us' });
    };

    const handleBack = () => {

        setStep(step - 1);

    };

    useEffect(() => {
        if(isSuccess){
            setStep( step + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isSuccess]);

    const countryList = countries.getNames('en');
    const options = Object.keys(countryList).map(key => ({ label: countryList[key], value: key }));
    
    return (
    <>
        <form id='address-form' onSubmit={handleSubmit(handleNext)}>
            <div className="w-full">
                <h1 className="text-lg my-2 text-left">Do you live in the United States?</h1>
                <div className="form-control w-full max-w-xs">
                    <Radio control={control} data={data} />
                </div>
            </div>
            <div className={`w-full mt-5 ${watch('is_in_us') === false ? 'block' : 'hidden'}`}>
                <h1 className="my-5 text-left text-xs text-error">
                    Unfortunately, we are not currently matching outside of the United States. 
                    <br/>We’re sorry for the incocnvenience, and we hope to connect you soon.
                </h1>
                <h1 className="text-lg my-5 text-left">Please let us know where you are located so we know where to go next</h1>
                <div className="form-control w-full max-w-xs text-left">
                    <Select control={control} 
                    data={{ name: 'user_address.country', options }} />
                </div>
            </div>
            <div className={`w-full mt-5 ${watch('is_in_us') ? 'block' : 'hidden'}`}>
                <h1 className="text-lg my-5 text-left">Please share your current address with us for matching purposes</h1>
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
                form="address-form"
                title={'Next'}
                btnQnr
                disabled={watch('is_in_us')==null} />
        </div>
    </>
    )
}

export default IsInUs;