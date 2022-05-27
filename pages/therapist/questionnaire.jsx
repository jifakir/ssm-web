import React from 'react';
import Email from '../../components/TherapyQues/Email';
import Name from '../../components/TherapyQues/Name';
import Phone from '../../components/TherapyQues/Phone';
import Gender from '../../components/TherapyQues/Gender';
import InpersonFuture from '../../components/TherapyQues/InpersonFuture';
import Address from '../../components/TherapyQues/Address';
import Personality from '../../components/TherapyQues/Personality';
import Education from '../../components/TherapyQues/Education';
import Language from '../../components/TherapyQues/Language';
import BirthDate from '../../components/TherapyQues/BirthDate';
import DateOfBirth from '../../components/TherapyQues/BirthDate';
import Religion from '../../components/TherapyQues/Religion';
import RelSess from '../../components/TherapyQues/RelSess';
import SpiritPerson from '../../components/TherapyQues/SpritPerson';
import SpiritSess from '../../components/TherapyQues/SpiritSess';
import OtherLang from '../../components/TherapyQues/OtherLang';
import Race from '../../components/TherapyQues/Race';
import NewPatient from '../../components/TherapyQues/NewPatient';
import Button from '../../components/UI/Button';



const Questionnaire = () => {

    const [ step, setStep ] = React.useState(0);
    const [progress, setProgress] = React.useState(50);

    const components = [
        {
            component: <Button title={'get started'} onClick={() => setStep(step + 1)} className="my-10" />,
            status: "entered-name",
            sr: 1
        },
        {
            component: <Name step={step} setStep={setStep} />,
            status: "entered-name",
            sr: 2
        },
        {
            component: <Email step={step} setStep={setStep} />,
            status: "entered-name",
            sr: 1
        },
        {
            component: <Gender step={step} setStep={setStep} />,
            status: "entered-name",
            sr: 1
        },
        {
            component: <Education step={step} setStep={setStep} />,
            status: "entered-name",
            sr: 1
        },
        {
            component: <Personality step={step} setStep={setStep} />,
            status: "entered-name",
            sr: 1
        },
        {
            component: <Religion step={step} setStep={setStep} />,
            status: "entered-name",
            sr: 1
        },
        {
            component: <RelSess step={step} setStep={setStep} />,
            status: "entered-name",
            sr: 1
        },
        {
            component: <SpiritPerson step={step} setStep={setStep} />,
            status: "entered-name",
            sr: 1
        },
        {
            component: <SpiritSess step={step} setStep={setStep} />,
            status: "entered-name",
            sr: 1
        },
        {
            component: <OtherLang step={step} setStep={setStep} />,
            status: "entered-name",
            sr: 1
        },
        {
            component: <Language step={step} setStep={setStep} />,
            status: "entered-name",
            sr: 1
        },
        {
            component: <DateOfBirth step={step} setStep={setStep} />,
            status: "entered-name",
            sr: 1
        },
        {
            component: <Race step={step} setStep={setStep} />,
            status: "entered-name",
            sr: 1
        },
        {
            component: <Address step={step} setStep={setStep} />,
            status: "entered-name",
            sr: 1
        },
        {
            component: <NewPatient step={step} setStep={setStep} />,
            status: "entered-name",
            sr: 1
        },
    ];
 

    return (
    <div className="px-10 pt-5">
        <div className={`mt-10 ${step === 0 ? 'hidden' : 'block'}`}>
            <h1 className="text-[54px] font-sterio">Welcome</h1>
            <p className="mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. 
            </p>
        </div>
        {/* Slide section */}
        <div className="">
            <progress className={`progress my-5 h-4 w-full bg-neutral1 progress-secondary ${step <1 ? 'hidden' : 'block'}`} value={(step/components.length)*100} max="100"></progress>
            {/* Form Inner */}
            <div className="text-center">
                {
                    components.map((comp, idx) => {

                        return (
                            <div className={step === idx ? 'block' : 'hidden'} key={idx}>
                                {comp.component}
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