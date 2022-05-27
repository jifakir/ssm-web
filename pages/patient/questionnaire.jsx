import React from 'react';

// importing components
import Orientation from '../../components/PatientQues/Orientation';
import Email from '../../components/PatientQues/Email';
import Name from '../../components/PatientQues/Name';
import State from '../../components/PatientQues/State';
import Submitted from '../../components/PatientQues/Submitted';
import Thankyou from '../../components/PatientQues/Thankyou';

import { useFetchTherapistQuery } from '../../store/api/ssmApi';

const Questionnair = () => {

    const [ step, setStep ] = React.useState(0);
    const [progress, setProgress] = React.useState(0);

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
            cp: <State  step={step} setStep={setStep}  />,
        },
        {
            sr: 6,
            cp: <Thankyou  step={step} setStep={setStep}  />,
        },
        // {
        //     sr: 5,
        //     cp: <Education  step={step} setStep={setStep}  />
        // },
        // {
        //     sr: 6,
        //     cp: <Personality  step={step} setStep={setStep}  />
        // },
        // {
        //     sr: 7,
        //     cp: <Religion  step={step} setStep={setStep}  />
        // },
        // {
        //     sr: 8,
        //     cp: <RelSess  step={step} setStep={setStep}  />
        // },
        // {
        //     sr: 9,
        //     cp: <SpritPerson  step={step} setStep={setStep}  />
        // },
        // {
        //     sr: 10,
        //     cp: <Language  step={step} setStep={setStep}  />
        // },
        // {
        //     sr: 11,
        //     cp: <OtherLang  step={step} setStep={setStep}  />
        // },
        // {
        //     sr: 12,
        //     cp: <Insurance  step={step} setStep={setStep}  />
        // },
        // {
        //     sr: 13,
        //     cp: <Availability  step={step} setStep={setStep}  />
        // },
        {
            sr: 14,
            cp: <Submitted />
        },
    ];

    const { data, isLoading, isError } = useFetchTherapistQuery();

    React.useEffect(() => {
        console.log(data);
        setStep(1);
    },[data]);

    React.useEffect(() => {
        
        switch(step){
            case 2 :
                setProgress(5);
                break;
            case 3 :
                setProgress(25);
                break;
            case 4 :
                setProgress(50);
                break;
            case 5 :
                setProgress(100);
                break;
            default:
                setProgress(0);
        };

    },[step]);


    return (
        <div className="px-10 pt-5">
        <div className={`${step === 6 ? 'hidden' : 'block'}`}>
            <h1 className="text-7xl">Welcome</h1>
            <p className="text-2xl mt-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. 
            </p>
        </div>
        {/* Slide section */}
        <div className="mt-10">
            <progress className={`progress w-full bg-neutral1 progress-secondary ${step === 1 || step === 6 ? 'hidden' : 'block'}`} value={`${progress}`} max="100"></progress>
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

export default Questionnair;