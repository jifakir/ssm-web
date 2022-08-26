import React from 'react';
import { useSelector } from 'react-redux';


// importing components;
import Image from 'next/image';
import Button from '../../components/UI/Button';
import HowItWorks from '../../components/Home/HowItWorks';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Patient from '../../components/Auth/Patient';




const Therapist = () => {

    const [open , setOpen] = React.useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const router = useRouter();

    const loginHandler = () => {
        if(!isLoggedIn){
            setOpen(!open);
        }else{  
            router.push('/patient/questionnaire');
        }
    };

    return (
        <div className="">
            <Patient open={open} setOpen={setOpen} />
            <div className={`w-[90%] xs:w-[80%] lg:w-[65%] mx-auto ${open ? 'hidden sm:block' : 'block sm:block'}`}>
                <div className="my-5 md:my-16">
                    <h1 className="font-sterio text-4xl md:text-5xl text-center mt-10">Find a Therapist</h1>
                    <div className="text-center my-5 lg:hidden">
                        <h2 className="text-sm sm:text-xl font-medium md:text-2xl mb-3">Step 1</h2>
                        <Link href={'http://16personalities.com'}>
                            <a target={'_blank'}>
                                <Button 
                                title={'Myers Briggs Test'} />
                            </a>
                        </Link>
                    </div>
                    <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
                        <div className="text-center">
                            <div className="hidden lg:block">
                                <h2 className="text-sm sm:text-xl font-medium md:text-2xl mb-3">Step 1</h2>
                                <Link href={'http://16personalities.com'}>
                                    <a target={'_blank'}>
                                        <Button 
                                        title={'Myers Briggs Test'} />
                                    </a>
                                </Link>
                            </div>
                            <div className="mt-8">
                                <h2 className="text-sm font-medium sm:text-lg md:text-2xl mb-3">Step 2</h2>
                                <Button 
                                    onClick={loginHandler}
                                    title={'Match Survey'} />
                            </div>
                        </div>
                        <div className="relative lg:w-1/2">
                            <Image src={'/img/talking_therapist.png'} alt="" width={591} height={472} />
                        </div>
                    </div>
                </div>
                <HowItWorks />
                <div className="mt-10 flex justify-center">
                    <Button
                        onClick={loginHandler} 
                        title={'Find A Therapist'} />
                </div>
                <div className="my-10 md:my-16">
                    <h1 className="my-5 md:my-10 font-bold text-lg sm:text-2xl md:text-3xl text-center">Therapy is more successful when you feel supported</h1>
                    <div className="text-sm md:text-base text-center md:text-left">
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

export default Therapist;