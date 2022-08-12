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
import SpiritPerson from '../../components/TherapyQues/SpritPerson';
import Orientation from '../../components/TherapyQues/Orientation';
import Race from '../../components/TherapyQues/Race';
import NewPatient from '../../components/TherapyQues/NewPatient';
import Button from '../../components/UI/Button';
import Experience from '../../components/TherapyQues/Experience';
import Availability from '../../components/TherapyQues/Availability';
import Titles from '../../components/TherapyQues/Titles';
import AcceptInsurance from '../../components/TherapyQues/AcceptInsurance';
import License from '../../components/TherapyQues/License';
import VirtualInperson from '../../components/TherapyQues/VirtualInperson';
import AcceptSessionFee from '../../components/TherapyQues/AcceptSessionFee';
import States from '../../components/TherapyQues/States';
import Specialization from '../../components/TherapyQues/Specialization';
import { useFetchTherapistQuery } from '../../store/api/ssmApi';
import { ImSpinner9 } from 'react-icons/im';
import { useRouter } from 'next/router';
import Link from 'next/link';


const Questionnaire = () => {

    const [ step, setStep ] = React.useState(0);
    const [progress, setProgress] = React.useState(0);

    const { auth:{ isLoggedIn }, subscription } = useSelector(state => state);
    const {data, refetch, isSuccess, isError} = useFetchTherapistQuery();

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
        {
            component: <Phone profile={data} step={step} setStep={setStep} />,
            status: "entered-phone",
        },
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
            component: <SpiritPerson profile={data} step={step} setStep={setStep} />,
            status: "entered-spirituality",
        },
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
        {
            component: <States profile={data} step={step} setStep={setStep} />,
            status: "entered-insurance",
        },
        {
            component: <Specialization profile={data} step={step} setStep={setStep} />,
            status: "entered-specialization",
        },
        
        {
            component: <AcceptSessionFee profile={data} step={step} setStep={setStep} />,
            status: "entered-sessionfee",
        },
        {
            component: <Availability profile={data} step={step} setStep={setStep} />,
            status: "entered-availability",
        },
    ];


    useEffect(()=>{
        refetch();
    },[]);
    
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
    },[isSuccess, isLoggedIn, router]);
    
    // if(!subscription || !isLoggedIn){
    //     return router.push('/therapist');
    // }

    const percent = Math.round((step/(components.length - 1))*100);

    return (
    <div className={`px-[5%] pt-14 sm:pt-[100px] sm:min-h-[816px]px-[5%] md:pt-[100px] md:min-h-[816px] ${step === 0 ? 'bg-gradient-to-b from-[#FFFFFF] via-[#6F348D]/20 to-[#6F348D]/90': ''}`}>
        <div className={`mt-16 ${step === 0 ? 'block' : 'block'}`}>
            <h1 className="text-center md:text-left text-[32px]  md:text-[54px] font-sterio text-[#331447]">Welcome</h1>
            <p className="mt-8 text-sm text-center md:text-left">
                Thank you for joining our directory! We have created a detailed questionnaire to help us match you with potential patients. You will need to provide your Myers-Briggs Personality Test factors, so please be sure you have completed that test.
                If you have not completed the Personality Test, please do so &nbsp; 
                <Link href={'http://16personalities.com'}>
                    <a target={'_blank'} className="text-secondary underline">
                        here
                    </a>
                </Link>.
                It shouldn&apos;t take longer than 20 minutes!
            </p>
        </div>
        {/* Slide section */}
        <div className="pb-14 mt-8 md:mt-6">
            <div className={`w-full rounded-full h-7 border-2 border-secondary overflow-hidden ${percent === 0 ? 'hidden' : 'hidden md:block'}`}>
                <div className="relative transition-all duration-500 ease-out bg-secondary h-full" style={{width: `${percent}%`}}>
                    <span className={`absolute z-10 ${percent > 95 ? 'pr-2 right-0' : 'pl-2 left-full'}`}>{`${percent}%`}</span>
                </div>
            </div>
            <div className={`w-full h-[11px] flex justify-between items-center ${percent === 0 ? 'hidden' : 'block md:hidden'}`}>
                <div className="w-20 h-full bg-[#E5E5E5]">
                    <div className={`w-full h-full bg-secondary`}></div>
                </div>
                <div className="w-20 h-full bg-[#E5E5E5]">
                    <div className={`${percent > 25 ? 'w-full' : 'w-0'} h-full bg-secondary transition-all duration-300 ease-out`}></div>
                </div>
                <div className="w-20 h-full bg-[#E5E5E5]">
                    <div className={`${percent > 50 ? 'w-full' : 'w-0'} h-full bg-secondary  transition-all duration-300 ease-out`}></div>
                </div>
                <div className="w-20 h-full bg-[#E5E5E5]">
                    <div className={`${percent > 75 ? 'w-full' : 'w-0'} h-full bg-secondary transition-all duration-300 ease-out`}></div>
                </div>
            </div>
            {/* Form Inner */}
            <div className="text-center mt-8 xl:mt-10">
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