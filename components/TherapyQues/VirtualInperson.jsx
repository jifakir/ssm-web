import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';
import { BiLoaderAlt } from 'react-icons/bi';

const data = {
    title: 'Do you currently provide virtual or in-person sessions?',
    name: 'session_type',
    options: [
        {
            label: 'Virtual only',
            value: 'virtual'
        },
        {
            label: 'In-Person only',
            value: 'in-person'
        },
        {
            label: 'Both',
            value: 'both'
        },
    ]
};

const personData = {
    title: 'Do you plan on providing in-person sessions in the future?',
    name: 'will_provide_in_person',
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


const virtualData = {
    title: 'Do you plan on providing virtual sessions in the future?',
    name: 'will_provide_virtual',
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


const VirtualInperson = ({ step, setStep, profile }) => {

    const { control, handleSubmit, watch, formState: { errors} } = useForm({defaultValues: { 
        session_type: profile?.session_type,
        will_provide_in_person: profile?.will_provide_in_person,
        will_provide_virtual: profile?.will_provide_virtual
     }});
    const [updateTherapist, { isSuccess, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { will_provide_in_person, will_provide_virtual, session_type } = data;
        let query = {session_type};
        if(session_type==='virtual') query = {...query,will_provide_in_person}
        if(session_type==='in_person') query = {...query,will_provide_virtual}
        await updateTherapist({ id: profile?.id, ...query, registration_status: 'entered-will_provide_in_person' });
    };

    const handleBack = () => {

        setStep(step - 1);

    };

    useEffect(() => {
        if(isSuccess){
            setStep(step+1);
        }
    },[isSuccess]);

    return (
        <>
            <form id="virtual-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="">
                    <div className="w-full">
                            <Radio control={control} 
                            rules={{required: 'Virtual Inperson is requred.'}} 
                            data={data} />
                    </div>
                    <div className={`mt-10 ${watch('session_type') === 'virtual' ? 'block' : 'hidden'}`}>
                            <Radio control={control} 
                            data={personData} />
                    </div>
                    <div className={`mt-10 ${watch('session_type') === 'in_person' ? 'block' : 'hidden'}`}>
                            <Radio control={control} 
                            data={virtualData} />
                    </div>
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
                    form="virtual-form" 
                    btnQnr 
                    disabled={
                        watch('session_type') === 'virtual' ? 
                        watch('will_provide_in_person') == null :
                        watch('session_type') === 'in_person'? 
                        watch('will_provide_virtual') == null:
                        watch('session_type') == null} >
                    {
                        isLoading ? <BiLoaderAlt className="animate-spin text-2xl mr-2" /> : ''
                    }
                </Button>
            </div>
        </>
    )
}

export default VirtualInperson;