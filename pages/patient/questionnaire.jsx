import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Email from '../../components/PatientQues/Email';
import Name from '../../components/PatientQues/Name';
import Phone from '../../components/PatientQues/Phone';
import Gender from '../../components/PatientQues/Gender';
import Address from '../../components/PatientQues/Address';
import Personality from '../../components/PatientQues/Personality';
import TriedCounseling from '../../components/PatientQues/TriedCounseling';
// import Language from '../../components/PatientQues/Language';
// import BirthDate from '../../components/PatientQues/BirthDate';
import Religion from '../../components/PatientQues/Religion';
import RelSess from '../../components/PatientQues/RelSess';
import IsSpiritual from '../../components/PatientQues/IsSpiritual';
import PreferSpirituality from '../../components/PatientQues/PreferSpirituality';
import PreferOtherLang from '../../components/PatientQues/PreferOtherLang';
import Orientation from '../../components/PatientQues/Orientation';
import Race from '../../components/PatientQues/Race';
import RacePrefer from '../../components/PatientQues/RacePrefer';
import Button from '../../components/UI/Button';
// import Experience from '../../components/PatientQues/Experience';
// import Availability from '../../components/PatientQues/Availability';
import Titles from '../../components/PatientQues/Titles';
import AcceptInsurance from '../../components/PatientQues/AcceptInsurance';
import Insurance from '../../components/PatientQues/Insurance';
import SessionFee from '../../components/PatientQues/SessionFee';
// import VirtualInperson from '../../components/PatientQues/VirtualInperson';
import AcceptSessionFee from '../../components/PatientQues/AcceptSessionFee';
import CounselingExp from '../../components/PatientQues/CounselingExp';
// import Specialization from '../../components/PatientQues/Specialization';
import { useFetchPatientQuery } from '../../store/api/ssmApi';
import { ImSpinner9 } from 'react-icons/im';
import { useRouter } from 'next/router';


const Questionnaire = () => {

    const [ step, setStep ] = React.useState(0);
    const {isLoggedIn } = useSelector(state => state.auth);
    const {data, isSuccess, isLoading} = useFetchPatientQuery();

    const router = useRouter();

    const components = [
        {
            component: <Button title={'GET STARTED'} btnQnr btnLg onClick={() => setStep(step + 1)} className="my-10" />,
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
            component: <Gender profile={data} step={step} setStep={setStep} />,
            status: "entered-gender",
        },
        // {
        //     component: <Phone profile={data} step={step} setStep={setStep} />,
        //     status: "entered-phone",
        // },
        {
            component: <Orientation profile={data} step={step} setStep={setStep} />,
            status: "entered-orientation",
        },
        {
            component: <Address profile={data} step={step} setStep={setStep} />,
            status: "entered-address",
        },
        {
            component: <Religion profile={data} step={step} setStep={setStep} />,
            status: "entered-religion",
        },
        {
            component: <Personality profile={data} step={step} setStep={setStep} />,
            status: "entered-personality",
        },
        // {
        //     component: <Education profile={data} step={step} setStep={setStep} />,
        //     status: "entered-education",
        // },
        {
            component: <RelSess profile={data} step={step} setStep={setStep} />,
            status: "entered-relsess",
        },
        {
            component: <IsSpiritual profile={data} step={step} setStep={setStep} />,
            status: "entered-spirituality",
        },
        {
            component: <PreferSpirituality profile={data} step={step} setStep={setStep} />,
            status: "entered-spiritsess",
        },
        {
            component: <PreferOtherLang profile={data} step={step} setStep={setStep} />,
            status: "entered-otherlang",
        },
        // {
        //     component: <Language profile={data} step={step} setStep={setStep} />,
        //     status: "entered-lang",
        // },
        {
            component: <TriedCounseling profile={data} step={step} setStep={setStep} />,
            status: "entered-lang",
        },
        {
            component: <CounselingExp profile={data} step={step} setStep={setStep} />,
            status: "entered-lang",
        },
        // {
        //     component: <BirthDate profile={data} step={step} setStep={setStep} />,
        //     status: "entered-dateofbirth",
        // },
        {
            component: <Race profile={data} step={step} setStep={setStep} />,
            status: "entered-race",
        },
        {
            component: <RacePrefer profile={data} step={step} setStep={setStep} />,
            status: "entered-race",
        },
        // {
        //     component: <NewPatient profile={data} step={step} setStep={setStep} />,
        //     status: "entered-patient",
        // },
        // {
        //     component: <Experience profile={data} step={step} setStep={setStep} />,
        //     status: "entered-experience",
        // },
        {
            component: <Titles profile={data} step={step} setStep={setStep} />,
            status: "entered-titles",
        },
        {
            component: <AcceptInsurance profile={data} step={step} setStep={setStep} />,
            status: "entered-acceptinsurance",
        },
        {
            component: <Insurance profile={data} step={step} setStep={setStep} />,
            status: "entered-insurance",
        },
        {
            component: <SessionFee profile={data} step={step} setStep={setStep} />,
            status: "entered-sessionfee",
        },
        // {
        //     component: <VirtualInperson profile={data} step={step} setStep={setStep} />,
        //     status: "entered-virtualperson",
        // },
        {
            component: <AcceptSessionFee profile={data} step={step} setStep={setStep} />,
            status: "entered-sessionfee",
        },
        // {
        //     component: <InpersonSessionFuture profile={data} step={step} setStep={setStep} />,
        //     status: "entered-inpersonsession",
        // },
        // {
        //     component: <Specialization profile={data} step={step} setStep={setStep} />,
        //     status: "entered-specialization",
        // },
        // {
        //     component: <Availability profile={data} step={step} setStep={setStep} />,
        //     status: "entered-availability",
        // },
    ];


    useEffect(() => {
        if(!isLoggedIn){
            router.push('/');
        }
        if(isSuccess){
            components.map((com, idx) => {
                console.log(com.status);
                console.log(data.registration_status);
                if(com.status === data.registration_status){
                    console.log('Triggered SetStep')
                    setStep(idx + 1);
                }
            })
        }
    },[isSuccess, isLoggedIn]);


    const percent = Math.round((step/components.length)*100);

    return (
    <div className={`px-[5%] pt-[100px] min-h-[816px] ${step === 0 ? 'bg-gradient-to-b from-[#FFFFFF] via-[#6F348D]/20 to-[#6F348D]/90': ''}`}>
        <div >
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
                {/* {
                    isLoading ? <div className="flex justify-center items-center h-28"><ImSpinner9 className='text-2xl text-secondary animate-spin' /> </div> : components.map((comp, idx) => {

                        return (
                            <div className={step === idx ? 'block' : 'hidden'} key={idx}>
                                {comp.component}
                            </div>
                        )
                    })
                } */}
            </div>
        </div>
    </div>
    )
}

export default Questionnaire;