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
import Image from 'next/image';
import Button from '../../components/UI/Button';
import HowItWorks from '../../components/Home/HowItWorks';




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
    },[data]);

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
        <div className="">
            <div className="w-[90%] md:w-[65%] mx-auto">
                <div className="my-5">
                    <h1 className="font-sterio text-3xl md:text-5xl text-center mt-10">Find a Therapist</h1>
                    <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                        <div className="text-center">
                            <div className="">
                                <h2 className="text-lg md:text-2xl mb-3">Step 1</h2>
                                <Button title={'Myers Briggs Test'} className="btn-secondary text-lg md:text-2xl font-medium" />
                            </div>
                            <div className="mt-5">
                                <h2 className="text-lg md:text-2xl mb-3">Step 1</h2>
                                <Button title={'Match Survey'} className="btn-secondary text-lg md:text-2xl font-medium" />
                            </div>
                        </div>
                        <div className="relative w-1/2">
                            <Image src={'/img/find_therapist.png'} alt="" width={591} height={472} />
                        </div>
                    </div>
                </div>
                <HowItWorks />
                <div className="mt-10 flex justify-center">
                    <Button title={'Find A Therapist'} className="text-xl btn-secondary" />
                </div>
                <div className="">
                    <h1 className="my-10 font-bold text-2xl md:text-3xl text-center">Therapy is more successful when you feel supported</h1>
                    <div className="">
                        <p className="py-2">
                            When it comes to the mental health treatment journey, a critical aspect of your healing is how connected you feel to your provider. Have you ever tried going to a therapist just to feel disconnected and ultimately quit going? Or maybe you were simply just looking for a therapist and became overwhelmed with the sheer number of options out there. Well, we can promise you that you&apos;re not alone. Unfortunately, finding the ideal therapist ends up being much like dating around. The issue, though, is that feeling a disconnect in therapy only continues to affect us in the long run.    
                        </p>
                        <p className="py-2">
                            Our goal is to enable you to not only enlist in therapy but to have a successful experience. To do that, we first need you to complete an online Myers &amp; Briggs personality test.  Here’s the logic - research has shown that certain combinations of personalities have a higher likelihood of forming a positive connection. For example, if your results show that you are a Sensing Judger (ex: ESTJ), you may benefit from a pairing with a mental health provider who is also a Sensing Judger (ex: ISFJ) because when paired together, Sensing Judgers have a 79% success rate in getting along (1). High connection success rates can be seen with various personality pairings. 
                        </p>
                        <p className="py-2">
                            We don’t stop at pairing you with your personality match, though! To ensure that you’re receiving optimal care, we are also connecting you based on your experiences. When independently searching for a mental health provider it’s important to review the counselor&apos;s areas of expertise, so we made sure to include that in your connection as well. In our survey, we will ask you to share your experiences and area(s) of concern. We will then use our intelligent algorithm to compare your background with the professional experiences of therapists in our database to pair you with a provider who has experience in working with 2 or more of your area(s) of concern. For this reason, we ask that you share as much as you are comfortable sharing. The more information we have about you, the closer the match we will be able to find.
                        </p>
                        <p className="py-2">
                            We will also be sure to inquire about your preferences, so we can connect you with a mental health provider with whom you will feel comfortable sharing with. 
                        </p>
                        <p className="py-2">
                            Combined with an environment where you feel culturally seen, we feel these factors will help to foster the optimal ambiance for healing. In this setting, you will feel enabled to share more, communicate more, and start saying more.
                        </p>
                        <p className="py-2">
                            References:
                            1. Tieger, P., &amp; Barron-Tieger, B. (2000). Just Your Type. Boston, MA: Little, Brown, and Co.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Questionnaire;