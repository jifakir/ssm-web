import React from 'react';
import Email from '../../components/TherapyQues/Email';
import Name from '../../components/TherapyQues/Name';
import Phone from '../../components/TherapyQues/Phone';
import Gender from '../../components/TherapyQues/Gender';
import Address from '../../components/TherapyQues/Address';
import Personality from '../../components/TherapyQues/Personality';
import Education from '../../components/TherapyQues/Education';
import Language from '../../components/TherapyQues/Language';
import BirthDate from '../../components/TherapyQues/BirthDate';
import Religion from '../../components/TherapyQues/Religion';
import RelSess from '../../components/TherapyQues/RelSess';
import SpiritPerson from '../../components/TherapyQues/SpritPerson';
import SpiritSess from '../../components/TherapyQues/SpiritSess';
import OtherLang from '../../components/TherapyQues/OtherLang';
import Orientation from '../../components/TherapyQues/Orientation';
import Race from '../../components/TherapyQues/Race';
import NewPatient from '../../components/TherapyQues/NewPatient';
import Button from '../../components/UI/Button';
import Experience from '../../components/TherapyQues/Experience';
import Availability from '../../components/TherapyQues/Availability';
import Titles from '../../components/TherapyQues/Titles';
import AcceptInsurance from '../../components/TherapyQues/AcceptInsurance';
import Insurance from '../../components/TherapyQues/Insurance';
import SessionFee from '../../components/TherapyQues/SessionFee';
import VirtualInperson from '../../components/TherapyQues/VirtualInperson';
import AcceptSessionFee from '../../components/TherapyQues/AcceptSessionFee';
import InpersonSessionFuture from '../../components/TherapyQues/InpersonFuture';
import Specialization from '../../components/TherapyQues/Specialization';



const Questionnaire = () => {

    const [ step, setStep ] = React.useState(0);
    const [progress, setProgress] = React.useState(0);

    const components = [
        {
            component: <Button title={'get started'} onClick={() => setStep(step + 1)} className="my-10" />,
            status: "entered-name",
        },
        {
            component: <Name step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <Email step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <Gender step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <Phone step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <Orientation step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <Address step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <Religion step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <Personality step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <Education step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <RelSess step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <SpiritPerson step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <SpiritSess step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <OtherLang step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <Language step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <BirthDate step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <Race step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <NewPatient step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <Experience step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <Titles step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <Availability step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <AcceptInsurance step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <Insurance step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <SessionFee step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <VirtualInperson step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <AcceptSessionFee step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <InpersonSessionFuture step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <Specialization step={step} setStep={setStep} />,
            status: "entered-name",
        },
    ];


    return (
    <div className={`px-10 pt-5 ${step === 0 ? 'h-[600px] bg-gradient-to-b from-[#FFFFFF] via-[#6F348D]/20 to-[#6F348D]/90': ''}`}>
        <div className={`mt-10 ${step === 0 ? 'block' : 'block'}`}>
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