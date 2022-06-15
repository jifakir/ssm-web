import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import License from '../../components/TherapyQues/License';
import VirtualInperson from '../../components/TherapyQues/VirtualInperson';
import AcceptSessionFee from '../../components/TherapyQues/AcceptSessionFee';
import InpersonSessionFuture from '../../components/TherapyQues/InpersonFuture';
import Specialization from '../../components/TherapyQues/Specialization';
import { useFetchTherapistQuery } from '../../store/api/ssmApi';
import { ImSpinner9 } from 'react-icons/im';
import { useRouter } from 'next/router';


const Questionnaire = () => {

    const [ step, setStep ] = React.useState(0);
    const [progress, setProgress] = React.useState(0);

    const {isLoggedIn } = useSelector(state => state.auth);
    const {data, isSuccess, isLoading} = useFetchTherapistQuery();

    const router = useRouter();
    const components = [
        {
            component: <Button btnQnr btnLg title={'GET STARTED'} onClick={() => setStep(step + 1)} />,
            status: "",
        },
        {
            component: <Name data={data} step={step} setStep={setStep} />,
            status: "entered-name",
        },
        {
            component: <Email profile={data} step={step} setStep={setStep} />,
            status: "entered-email",
        },
        // {
        //     component: <Phone profile={data} step={step} setStep={setStep} />,
        //     status: "entered-phone",
        // },
        {
            component: <Address profile={data} step={step} setStep={setStep} />,
            status: "entered-address",
        },
        {
            component: <Gender profile={data} step={step} setStep={setStep} />,
            status: "entered-gender",
        },
        {
            component: <BirthDate profile={data} step={step} setStep={setStep} />,
            status: "entered-dateofbirth",
        },
        {
            component: <Race profile={data} step={step} setStep={setStep} />,
            status: "entered-race",
        },
        
        {
            component: <Orientation profile={data} step={step} setStep={setStep} />,
            status: "entered-orientation",
        },
        {
            component: <Education profile={data} step={step} setStep={setStep} />,
            status: "entered-education",
        },
        {
            component: <Experience profile={data} step={step} setStep={setStep} />,
            status: "entered-experience",
        },
        {
            component: <License profile={data} step={step} setStep={setStep} />,
            status: "entered-experience",
        },
        {
            component: <Titles profile={data} step={step} setStep={setStep} />,
            status: "entered-titles",
        },
        {
            component: <Personality profile={data} step={step} setStep={setStep} />,
            status: "entered-personality",
        },
        {
            component: <Religion profile={data} step={step} setStep={setStep} />,
            status: "entered-religion",
        },
        
        {
            component: <RelSess profile={data} step={step} setStep={setStep} />,
            status: "entered-relsess",
        },
        {
            component: <SpiritPerson profile={data} step={step} setStep={setStep} />,
            status: "entered-spirituality",
        },
        // {
        //     component: <SpiritSess profile={data} step={step} setStep={setStep} />,
        //     status: "entered-spiritsess",
        // },
        // {
        //     component: <OtherLang profile={data} step={step} setStep={setStep} />,
        //     status: "entered-otherlang",
        // },
        {
            component: <Language profile={data} step={step} setStep={setStep} />,
            status: "entered-lang",
        },
        
        {
            component: <NewPatient profile={data} step={step} setStep={setStep} />,
            status: "entered-patient",
        },
        {
            component: <AcceptInsurance profile={data} step={step} setStep={setStep} />,
            status: "entered-acceptinsurance",
        },
        {
            component: <VirtualInperson profile={data} step={step} setStep={setStep} />,
            status: "entered-virtualperson",
        },
        // {
        //     component: <Insurance profile={data} step={step} setStep={setStep} />,
        //     status: "entered-insurance",
        // },
        {
            component: <InpersonSessionFuture profile={data} step={step} setStep={setStep} />,
            status: "entered-inpersonsession",
        },
        {
            component: <Specialization profile={data} step={step} setStep={setStep} />,
            status: "entered-specialization",
        },
        // {
        //     component: <SessionFee profile={data} step={step} setStep={setStep} />,
        //     status: "entered-sessionfee",
        // },
        
        // {
        //     component: <AcceptSessionFee profile={data} step={step} setStep={setStep} />,
        //     status: "entered-sessionfee",
        // },
        {
            component: <Availability profile={data} step={step} setStep={setStep} />,
            status: "entered-availability",
        },
    ];


    useEffect(() => {
        if(!isLoggedIn){
            router.push('/');
        }
        // if(isSuccess){
        //     components.map((com, idx) => {
        //         console.log(com.status);
        //         console.log(data.registration_status);
        //         if(com.status === data.registration_status){
        //             console.log('Triggered SetStep')
        //             setStep(idx + 1);
        //         }
        //     })
        // }
    },[isSuccess, isLoggedIn]);

    const percent = Math.round((step/components.length)*100);

    return (
    <div className={`px-[5%] pt-[100px] min-h-[816px] ${step === 0 ? 'bg-gradient-to-b from-[#FFFFFF] via-[#6F348D]/20 to-[#6F348D]/90': ''}`}>
        <div className={`mt-10 ${step === 0 ? 'block' : 'block'}`}>
            <h1 className="text-[54px] font-sterio text-[#331447]">Welcome</h1>
            <p className="mt-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. 
            </p>
        </div>
        {/* Slide section */}
        <div className="pb-14 mt-6">
            <div className={`w-full rounded-full h-7 border-2 border-secondary overflow-hidden ${percent === 0 ? 'hidden' : 'block'}`}>
                <div className="relative transition-all duration-500 ease-out bg-secondary h-full" style={{width: `${percent}%`}}>
                    <span className={`absolute z-10 ${percent > 95 ? 'pr-2 right-0' : 'pl-2 left-full'}`}>{`${percent}%`}</span>
                </div>
            </div>
            {/* Form Inner */}
            <div className="text-center mt-10">
                {
                    isLoading ? <div className="flex justify-center items-center h-28"><ImSpinner9 className='text-2xl text-secondary animate-spin' /> </div> : components.map((comp, idx) => {

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