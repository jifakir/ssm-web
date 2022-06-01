import React from 'react';
import { HiPlus } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Input from '../UI/TextInput';
import Button from '../UI/Button';

const data = [
    { 
        name: 'education1.degree',
        type: 'text', 
        pHolder: 'Degree',
    },
    { 
        name: 'education1.major',
        type: 'text', 
        pHolder: 'Major/Minor/Degree Focus',
    },
    { 
        name: 'education1.school_name',
        type: 'text', 
        pHolder: 'School Name',
    },
];


const data2 = [
    { 
        name: 'education2.degree',
        type: 'text', 
        pHolder: 'Degree',
    },
    { 
        name: 'education2.major',
        type: 'text', 
        pHolder: 'Major/Minor/Degree Focus',
    },
    { 
        name: 'education2.school_name',
        type: 'text', 
        pHolder: 'School Name',
    },
];

const data3 = [
    { 
        name: 'education3.degree',
        type: 'text', 
        pHolder: 'Degree',
    },
    { 
        name: 'education3.major',
        type: 'text', 
        pHolder: 'Major/Minor/Degree Focus',
    },
    { 
        name: 'education3.school_name',
        type: 'text', 
        pHolder: 'School Name',
    },
];

const data4 = [
    { 
        name: 'education4.degree',
        type: 'text', 
        pHolder: 'Degree',
    },
    { 
        name: 'education4.major',
        type: 'text', 
        pHolder: 'Major/Minor/Degree Focus',
    },
    { 
        name: 'education4.school_name',
        type: 'text', 
        pHolder: 'School Name',
    },
];

const data5 = [
    { 
        name: 'education5.degree',
        type: 'text', 
        pHolder: 'Degree',
    },
    { 
        name: 'education5.major',
        type: 'text', 
        pHolder: 'Major/Minor/Degree Focus',
    },
    { 
        name: 'education5.school_name',
        type: 'text', 
        pHolder: 'School Name',
    },
];



// Component

const Education = ({step, setStep}) => {

    const [qualifyNum, setQualifyNum] = React.useState(1);

    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();




    const ec1 = watch().education1 && Object.values(watch().education1).every(itm => itm);
    const ec2 = watch().education2 && Object.values(watch().education2).every(itm => itm);
    const ec3 = watch().education3 && Object.values(watch().education3).every(itm => itm);
    const ec4 = watch().education4 && Object.values(watch().education4).every(itm => itm);
    const ec5 = watch().education5 && Object.values(watch().education5).every(itm => itm);

    const isFilledUp = qualifyNum === 1 ? ec1:
                qualifyNum === 2 ? ec1 && ec2:
                qualifyNum === 3 ? ec1 && ec2 && ec3 && ec4:
                qualifyNum === 4 ? ec1 && ec2 && ec3 && ec4:
                qualifyNum === 5 ? ec1 && ec2 && ec3 && ec4 && ec5: false;


    const handleNext = async (data) => {

        if(!isFilledUp) return;
        
        await updateTherapist({ ...data, registration_status: 'entered-education' });

        // if(!isSucces){
        //     return
        // }

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };

    



    return (
        <form onSubmit={handleSubmit(handleNext)} className="">

            <div className="flex items-center my-5">

                <h1 className="text-lg mr-5">Please add your education</h1>
                <button onClick={() => setQualifyNum(qualifyNum + 1)} className="btn btn-primary btn-outline btn-sm text-sm">
                    <HiPlus className='mr-1' />
                    Education
                </button>

            </div>
            <div className="flex gap-5">

                <div className="space-y-3" >
                    <h2 className="text-left">Education 1</h2>
                    {
                        data.map((itm, idx) => <Input key={`education1_${idx}`} data={itm} register={register} errors={errors} />)
                    }
                </div>

                <div className={`space-y-3 ${qualifyNum >= 2 ? 'block' : 'hidden'}`} >
                    <h2 className="text-left">Education 2</h2>
                    {
                        data2.map((itm, idx) => <Input key={`education1_${idx}`} data={itm} register={register} errors={errors} />)
                    }
                </div>
                <div className={`space-y-3 ${qualifyNum >= 3 ? 'block' : 'hidden'}`} >
                    <h2 className="text-left">Education 3</h2>
                    {
                        data3.map((itm, idx) => <Input key={`education1_${idx}`} data={itm} register={register} errors={errors} />)
                    }
                </div>
                <div className={`space-y-3 ${qualifyNum >= 4 ? 'block' : 'hidden'}`} >
                    <h2 className="text-left">Education 4</h2>
                    {
                        data4.map((itm, idx) => <Input key={`education1_${idx}`} data={itm} register={register} errors={errors} />)
                    }
                </div>
                <div className={`space-y-3 ${qualifyNum >= 5 ? 'block' : 'hidden'}`} >
                    <h2 className="text-left">Education 5</h2>
                    {
                        data5.map((itm, idx) => <Input key={`education1_${idx}`} data={itm} register={register} errors={errors} />)
                    }
                </div>

            </div>
            <div className={`flex gap-5 py-5`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    className="btn-outline border-neutral px-8 text-2xl" />
                <Button 
                    title={'Next'} 
                    type="submit" 
                    className={`px-8 text-2xl ${ !isFilledUp ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </form>
    )
}

export default Education;