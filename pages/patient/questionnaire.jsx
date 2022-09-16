import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Email from '../../components/PatientQues/Email';
import Name from '../../components/PatientQues/Name';
import Phone from '../../components/PatientQues/Phone';
import AgePrefer from '../../components/PatientQues/AgePrefer';
import Gender from '../../components/PatientQues/Gender';
import Personality from '../../components/PatientQues/Personality';
import TriedCounseling from '../../components/PatientQues/TriedCounseling';
import MaxFee from '../../components/PatientQues/MaxFee';
import SpecificConcern from '../../components/PatientQues/SpecificConcern';
import Religion from '../../components/PatientQues/Religion';
import IsSpiritual from '../../components/PatientQues/IsSpiritual';
import Orientation from '../../components/PatientQues/Orientation';
import Race from '../../components/PatientQues/Race';
import RacePrefer from '../../components/PatientQues/RacePrefer';
import PreferGender from '../../components/PatientQues/PreferGender';
import IsReligious from '../../components/PatientQues/IsReligious';
import Age from '../../components/PatientQues/Age';
import Button from '../../components/UI/Button';
import SpeakOtherLang from '../../components/PatientQues/SpeakOtherLang';
import CostDecision from '../../components/PatientQues/CostDecision';
import AcceptInsurance from '../../components/PatientQues/AcceptInsurance';
import IsInUs from '../../components/PatientQues/IsInUs';
import { useFetchPatientQuery } from '../../store/api/ssmApi';
import { ImSpinner9 } from 'react-icons/im';
import { useRouter } from 'next/router';
import InpersonFuture from '../../components/PatientQues/InpersonFuture';
import Link from 'next/link';
import Thankyou from '../../components/PatientQues/Thankyou';
import Spinner from '../../components/UI/Loader';
import FormOfCounselling from '../../components/PatientQues/FormOfCounselling';
import Head from 'next/head';

const Questionnaire = () => {

    const [ step, setStep ] = React.useState(0);
    const {isLoggedIn } = useSelector(state => state.auth);
    const {data, isSuccess, isLoading} = useFetchPatientQuery();

    const router = useRouter();

    const components = [
        {
            component: <Button title={'GET STARTED'} btnQnr btnLg onClick={() => setStep(step + 1)} className="sm:my-10" />,
            status: "",
        },
        {
            component: <Name profile={data} step={step} setStep={setStep} />,
            status: "entered-name",
        },
        // {
        //     component: <Email profile={data} step={step} setStep={setStep} />,
        //     status: "entered-email",
        // },
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
            component: <Age profile={data} step={step} setStep={setStep} />,
            status: "entered-age",
        },
        // {
        //     component: <AgePrefer profile={data} step={step} setStep={setStep} />,
        //     status: "entered-age-preference",
        // },
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
        // {
        //     component: <PreferOrientation profile={data} step={step} setStep={setStep} />,
        //     status: "entered-prefer-orientation",
        // },
        
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
            component: <Personality profile={data} step={step} setStep={setStep} />,
            status: "entered-personality",
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
            status: "entered-maxfee",
        },
        {
            component: <AcceptInsurance profile={data} step={step} setStep={setStep} />,
            status: "entered-accept_insurance",
        },

        {
            component: <InpersonFuture profile={data} step={step} setStep={setStep} />,
            status: "entered-session_type",
        },
        {
            component: <FormOfCounselling profile={data} step={step} setStep={setStep} />,
            status: "entered-form_of_counselling",
        },
        {
            component: <SpecificConcern profile={data} step={step} setStep={setStep} />,
            status: "entered-form_specific_concern",
        },
        {
            component: <IsInUs profile={data} step={step} setStep={setStep} />,
            status: "entered-is_in_us",
        },
        
        {
            component: <Thankyou profile={data} step={step} setStep={setStep} />,
            status: "entered-completed",
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
    },[isSuccess, isLoggedIn, router]);

    if(isLoading && step === 0){
        return <Spinner />;
    }

    const percent = Math.round((step/components.length)*100);
   
    return (
    <div className={`px-[5%] pt-14 md:pt-16 xl:pt-[100px] xl:min-h-[816px] ${step === 0 ? 'bg-gradient-to-b from-[#FFFFFF] via-[#6F348D]/20 to-[#6F348D]/90': ''}`}>
        <Head>
            <title>Questionnnaire - Start Saying More</title>
        </Head>
        <div >
            <h1 className="text-center xl:text-left text-5xl md:text-[32px] xl:text-[54px] font-sterio text-[#331447]">{
                step === (components.length - 1) ?
                'Thank you!':
                'Welcome'
                }
            </h1>
            {
                step === (components.length - 1) ?
                <p className="mt-8 text-center xl:text-left">
                    Thank you for completing our match survey! Please share your email address with us, and we will send over your top matches.
                </p>:
                <p className="mt-8 text-center xl:text-left">
                Congratulations on starting your 
                journey! We have created a detailed questionnaire 
                to help us match you with a therapist in our directory. 
                You will need to provide your Myers-Briggs Personality Test factors, so please be sure you have completed that test. If you 
                have not completed the Personality Test, please do so&nbsp;
                <Link href={'http://16personalities.com'}>
                    <a className='text-secondary font-medium underline'>here</a>
                </Link> . It shouldn&apos;t take longer than 20 minutes!
            </p>
            }
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
            <div className="text-center mt-8 md:mt-9 xl:mt-16">
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