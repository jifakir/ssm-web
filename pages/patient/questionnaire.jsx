import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Email from '../../components/PatientQues/Email';
import Name from '../../components/PatientQues/Name';
import Phone from '../../components/PatientQues/Phone';
import Gender from '../../components/PatientQues/Gender';
import Address from '../../components/PatientQues/Address';
import Personality from '../../components/PatientQues/Personality';
import TriedCounseling from '../../components/PatientQues/TriedCounseling';
import MaxFee from '../../components/PatientQues/MaxFee';
// import BirthDate from '../../components/PatientQues/BirthDate';
import Religion from '../../components/PatientQues/Religion';
import IsSpiritual from '../../components/PatientQues/IsSpiritual';
import PreferSpirituality from '../../components/PatientQues/PreferSpirituality';
import PreferOtherLang from '../../components/PatientQues/PreferOtherLang';
import Orientation from '../../components/PatientQues/Orientation';
import Race from '../../components/PatientQues/Race';
import RacePrefer from '../../components/PatientQues/RacePrefer';
import PreferGender from '../../components/PatientQues/PreferGender';
import IsReligious from '../../components/PatientQues/IsReligious';
import Age from '../../components/PatientQues/Age';
import Button from '../../components/UI/Button';
import SpeakOtherLang from '../../components/PatientQues/SpeakOtherLang';
import CostDecision from '../../components/PatientQues/CostDecision';
import Titles from '../../components/PatientQues/Titles';
import Language from '../../components/PatientQues/Language';
import AcceptInsurance from '../../components/PatientQues/AcceptInsurance';
import Insurance from '../../components/PatientQues/Insurance';
import SessionFee from '../../components/PatientQues/SessionFee';
import IsInUs from '../../components/PatientQues/IsInUs';
import AcceptSessionFee from '../../components/PatientQues/AcceptSessionFee';
import CounselingExp from '../../components/PatientQues/CounselingExp';
// import Specialization from '../../components/PatientQues/Specialization';
import { useFetchPatientQuery } from '../../store/api/ssmApi';
import { ImSpinner9 } from 'react-icons/im';
import { useRouter } from 'next/router';
import AgePrefer from '../../components/PatientQues/AgePrefer';
import PreferOrientation from '../../components/PatientQues/OrientationPrefer';
import InpersonFuture from '../../components/PatientQues/InpersonFuture';
import HasInsurance from '../../components/PatientQues/HasInsurance';
import Link from 'next/link';
import Thankyou from '../../components/PatientQues/Thankyou';


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
            component: <PreferGender profile={data} step={step} setStep={setStep} />,
            status: "entered-orientation",
        },
        {
            component: <Personality profile={data} step={step} setStep={setStep} />,
            status: "entered-personality",
        },
        {
            component: <Age profile={data} step={step} setStep={setStep} />,
            status: "entered-age",
        },
        {
            component: <AgePrefer profile={data} step={step} setStep={setStep} />,
            status: "entered-age-preference",
        },
        {
            component: <Race profile={data} step={step} setStep={setStep} />,
            status: "entered-race",
        },
        {
            component: <RacePrefer profile={data} step={step} setStep={setStep} />,
            status: "entered-race-preference",
        },
        {
            component: <Orientation profile={data} step={step} setStep={setStep} />,
            status: "entered-orientation",
        },
        {
            component: <PreferOrientation profile={data} step={step} setStep={setStep} />,
            status: "entered-prefer-orientation",
        },
        {
            component: <Religion profile={data} step={step} setStep={setStep} />,
            status: "entered-religion",
        },
        {
            component: <IsReligious profile={data} step={step} setStep={setStep} />,
            status: "entered-spirituality",
        },
        {
            component: <IsSpiritual profile={data} step={step} setStep={setStep} />,
            status: "entered-spirituality",
        },
        {
            component: <TriedCounseling profile={data} step={step} setStep={setStep} />,
            status: "entered-spirituality",
        },
        {
            component: <SpeakOtherLang profile={data} step={step} setStep={setStep} />,
            status: "entered-lang",
        },
        {
            component: <CostDecision profile={data} step={step} setStep={setStep} />,
            status: "entered-address",
        },
        {
            component: <MaxFee profile={data} step={step} setStep={setStep} />,
            status: "entered-education",
        },
        {
            component: <HasInsurance profile={data} step={step} setStep={setStep} />,
            status: "entered-HasInsurance",
        },

        {
            component: <InpersonFuture profile={data} step={step} setStep={setStep} />,
            status: "entered-virtualperson",
        },
        {
            component: <IsInUs profile={data} step={step} setStep={setStep} />,
            status: "entered-virtualperson",
        },
        {
            component: <Thankyou profile={data} step={step} setStep={setStep} />,
            status: "entered-thankyou",
        },
        
        // {
        //     component: <PreferOtherLang profile={data} step={step} setStep={setStep} />,
        //     status: "entered-otherlang",
        // },
        
        // {
        //     component: <TriedCounseling profile={data} step={step} setStep={setStep} />,
        //     status: "entered-lang",
        // },
        // {
        //     component: <CounselingExp profile={data} step={step} setStep={setStep} />,
        //     status: "entered-lang",
        // },
        // {
        //     component: <BirthDate profile={data} step={step} setStep={setStep} />,
        //     status: "entered-dateofbirth",
        // },
        
        
        // {
        //     component: <NewPatient profile={data} step={step} setStep={setStep} />,
        //     status: "entered-patient",
        // },
        // {
        //     component: <Experience profile={data} step={step} setStep={setStep} />,
        //     status: "entered-experience",
        // },
        // {
        //     component: <Titles profile={data} step={step} setStep={setStep} />,
        //     status: "entered-titles",
        // },
        // {
        //     component: <AcceptInsurance profile={data} step={step} setStep={setStep} />,
        //     status: "entered-acceptinsurance",
        // },
        // {
        //     component: <Insurance profile={data} step={step} setStep={setStep} />,
        //     status: "entered-insurance",
        // },
        // {
        //     component: <SessionFee profile={data} step={step} setStep={setStep} />,
        //     status: "entered-sessionfee",
        // },
        

        // {
        //     component: <AcceptSessionFee profile={data} step={step} setStep={setStep} />,
        //     status: "entered-sessionfee",
        // },

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
    console.log("Length",components.length);
    console.log("Step",step);
    return (
    <div className={`px-[5%] pt-[100px] min-h-[816px] ${step === 0 ? 'bg-gradient-to-b from-[#FFFFFF] via-[#6F348D]/20 to-[#6F348D]/90': ''}`}>
        <div >
            <h1 className="text-[54px] font-sterio text-[#331447]">{
                step === (components.length - 1) ?
                'Thank you!':
                'Welcome'
                }
            </h1>
            {
                step === (components.length - 1) ?
                <p className="mt-8">
                    Thank you for completing our match survey! Please share your email address with us, and we will send over your top matches.
                </p>:
                <p className="mt-8">
                Congratulations on starting your 
                journey! We have created a detailed questionnaire 
                to help us match you with a therapist in our directory. 
                You will need to provide your Myers-Briggs Personality Test f
                actors, so please be sure you have completed that test. If you h
                ave not completed the Personality Test, please do so 
                <Link href={'http://16personalities.com'}>
                    <a className='text-secondary font-medium'>&nbsp;here</a>
                </Link> . It shouldn&apos;t take longer than 20 minutes!
            </p>
            }
        </div>
        {/* Slide section */}
        <div className="pb-14 mt-10">
            <div className={`w-full rounded-full h-7 border-2 border-secondary overflow-hidden ${(percent === 0) || (step === (components.length - 1)) ? 'hidden' : 'block'}`}>
                <div className="relative transition-all duration-500 ease-out bg-secondary h-full" style={{width: `${percent}%`}}>
                    <span className={`absolute z-10 ${percent > 95 ? 'pr-2 right-0' : 'pl-2 left-full'}`}>{`${percent}%`}</span>
                </div>
            </div>
            {/* Form Inner */}
            <div className="text-center mt-16">
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