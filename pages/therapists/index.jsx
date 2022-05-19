import React from 'react';
import { useForm } from 'react-hook-form';
import { useFetchTherapistQuery } from '../../store/api/ssmApi';




// importing components;

import Orientation from '../../components/TherapyQues/Orientation';
import Religion from '../../components/TherapyQues/Religion';
import Language from '../../components/TherapyQues/Language';
import Availability from '../../components/TherapyQues/Availability';
import Education from '../../components/TherapyQues/Education';
import Email from '../../components/TherapyQues/Email';
import Insurance from '../../components/TherapyQues/Insurance';
import Name from '../../components/TherapyQues/Name';
import OtherLang from '../../components/TherapyQues/OtherLang';
import Personality from '../../components/TherapyQues/Personality';
import RelSess from '../../components/TherapyQues/RelSess';
import SpritPerson from '../../components/TherapyQues/SpritPerson';
import Submitted from '../../components/TherapyQues/Submitted';




const Questionnaire = () => {

    const [step, setStep] = React.useState(null);
    const [ progress, setProgress ] = React.useState(0);

    const {register, trigger, formState: { errors }, watch, handleSubmit} = useForm({mode: 'all'});



    const components = [
        {
            sr: 1,
            cp: <button onClick={() => setStep(2)} className="btn bg-primary border-none px-8 mt-10 text-white">Get Started</button>
        },
        {
            sr: 2,
            cp: <Name  step={step} setStep={setStep}  required />,
        },
        {
            sr: 3,
            cp: <Email  step={step} setStep={setStep}  />,
        },
        {
            sr: 4,
            cp: <Orientation  step={step} setStep={setStep}  />,
        },
        {
            sr: 5,
            cp: <Education  step={step} setStep={setStep}  />
        },
        {
            sr: 6,
            cp: <Personality  step={step} setStep={setStep}  />
        },
        {
            sr: 7,
            cp: <Religion  step={step} setStep={setStep}  />
        },
        {
            sr: 8,
            cp: <RelSess  step={step} setStep={setStep}  />
        },
        {
            sr: 9,
            cp: <SpritPerson  step={step} setStep={setStep}  />
        },
        {
            sr: 10,
            cp: <Language  step={step} setStep={setStep}  />
        },
        {
            sr: 11,
            cp: <OtherLang  step={step} setStep={setStep}  />
        },
        {
            sr: 12,
            cp: <Insurance  step={step} setStep={setStep}  />
        },
        {
            sr: 13,
            cp: <Availability  step={step} setStep={setStep}  />
        },
        {
            sr: 14,
            cp: <Submitted />
        },
    ];

    const { data, isLoading, isError } = useFetchTherapistQuery();

    React.useEffect(() => {
        console.log(data);
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
                <h1 className="text-7xl">Welcome</h1>
                <p className="text-2xl mt-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. 
                </p>
            </div>
            {/* Slide section */}
            <div className="mt-10">
                <progress className={`progress w-full bg-neutral1 progress-secondary ${step === 14 ? 'hidden' : 'block'}`} value={`${progress}`} max="100"></progress>
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