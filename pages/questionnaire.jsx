import React from 'react';
import { useForm } from 'react-hook-form';





// importing components;

import Orientation from '../components/Ques/Orientation';
import Religion from '../components/Ques/Religion';
import Language from '../components/Ques/Language';
import Availability from '../components/Ques/Availability';
import Education from '../components/Ques/Education';
import Email from '../components/Ques/Email';
import Insurance from '../components/Ques/Insurance';
import Name from '../components/Ques/Name';
import OtherLang from '../components/Ques/OtherLang';
import Personality from '../components/Ques/Personality';
import RelSess from '../components/Ques/RelSess';
import SpritPerson from '../components/Ques/SpritPerson';
import Submitted from '../components/Ques/Submitted';




const Questionnaire = () => {

    const [step, setStep] = React.useState(null);
    const [ progress, setProgress ] = React.useState(0);

    const {register, trigger, formState: { errors }, watch, handleSubmit} = useForm({mode: 'all'});



    const components = [
        {
            sr: 1,
            cp: <button onClick={() => setStep(2)} className="btn bg-primary border-none px-8 my-5 md:my-0 md:mt-10 text-white">Get Started</button>
        },
        {
            sr: 2,
            cp: <Name register={register} watch={watch} trigger={trigger} step={step} setStep={setStep} errors={errors} required />,
        },
        {
            sr: 3,
            cp: <Email register={register} watch={watch} trigger={trigger} step={step} setStep={setStep} errors={errors} />,
        },
        {
            sr: 4,
            cp: <Orientation register={register} watch={watch} trigger={trigger} step={step} setStep={setStep} errors={errors} />,
        },
        {
            sr: 5,
            cp: <Education register={register} watch={watch} trigger={trigger} step={step} setStep={setStep} errors={errors} />
        },
        {
            sr: 6,
            cp: <Personality register={register} watch={watch} trigger={trigger} step={step} setStep={setStep} errors={errors} />
        },
        {
            sr: 7,
            cp: <Religion register={register} watch={watch} trigger={trigger} step={step} setStep={setStep} errors={errors} />
        },
        {
            sr: 8,
            cp: <RelSess register={register} watch={watch} trigger={trigger} step={step} setStep={setStep} errors={errors} />
        },
        {
            sr: 9,
            cp: <SpritPerson register={register} watch={watch} trigger={trigger} step={step} setStep={setStep} errors={errors} />
        },
        {
            sr: 10,
            cp: <Language register={register} watch={watch} trigger={trigger} step={step} setStep={setStep} errors={errors} />
        },
        {
            sr: 11,
            cp: <OtherLang register={register} watch={watch} trigger={trigger} step={step} setStep={setStep} errors={errors} />
        },
        {
            sr: 12,
            cp: <Insurance register={register} watch={watch} trigger={trigger} step={step} setStep={setStep} errors={errors} />
        },
        {
            sr: 13,
            cp: <Availability register={register} watch={watch} trigger={trigger} step={step} setStep={setStep} errors={errors} />
        },
        {
            sr: 14,
            cp: <Submitted />
        },
    ];


    React.useEffect(() => {
        setStep(1);
    },[]);

    React.useEffect(() => {

        switch(step){
            case 2 :
                setProgress(5);
                break;
            case 3 :
                setProgress(10);
                break;
            case 4 :
                setProgress(20);
                break;
            case 5 :
                setProgress(25);
                break;
            case 6 :
                setProgress(30);
                break;
            case 7 :
                setProgress(40);
                break;
            case 8 :
                setProgress(50);
                break;
            case 9 :
                setProgress(55);
                break;
            case 10 :
                setProgress(65);
                break;
            case 11 :
                setProgress(80);
                break;
            case 12 :
                setProgress(90);
                break;
            case 13 :
                setProgress(100);
                break;
            default:
                setProgress(0);
        };

    },[step]);

    return (
        <div className="px-10 pt-5">
            <div className="">
                <h1 className="text-5xl font-bold md:text-7xl">Welcome</h1>
                <p className="text-lg text-center md:text-left md:text-2xl mt-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. 
                </p>
            </div>
            {/* Slide section */}
            <div className="mt-10">
                <progress className={`progress w-full bg-neutral1 progress-secondary mb-5 ${step === 14 || step === 1 ? 'hidden' : 'block'}`} value={`${progress}`} max="100"></progress>
                {/* Form Inner */}
                <div className="text-center">
                    {
                        components.map((comp, idx) => {

                            return (
                                <div className={step === comp.sr ? 'block' : 'hidden'} key={idx}>
                                    {comp.cp}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Questionnaire;