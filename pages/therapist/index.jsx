import React, { useEffect } from 'react';
import Button from '../../components/UI/Button';
import Login from '../../components/Auth/Login';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const JoinAsTherapist = () => {

    const [open , setOpen] = React.useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    const router = useRouter();

    const loginHandler = () => {
        if(!isLoggedIn){
            setOpen(!open);
        }else{  
            router.push('/therapist/questionnaire');
        }
    };

    useEffect(() => {
        // if(isLoggedIn){
        //     router.push('/therapist/questionnaire');
        // }
    },[isLoggedIn]);

    return (
        <div className="px-[10%]">
            <Login open={open} setOpen={setOpen} redirectTo="/therapist/questionnaire"   />
            <div className="">
                <h1 className="font-sterio text-4xl md:text-5xl text-center mt-16">
                    Join As a Therapist
                </h1>
                <div className="mt-8">
                    <p className="">
                        Therapists are the foundation of the healing journey. With the growing demand for mental health care, it’s challenging for individuals to find their ideal therapist. To alleviate this problem, Start Saying More is dedicated to connecting patients with therapists in an effective and efficient manner. In order to best serve our clients, we need qualified therapists to join our database so we can provide your details to potential patients.
                    </p>
                    <p className="mt-5">
                        We benefit both sides. Patients connect with professionals and build confidence and know-how to seek therapy in their future. We want to make finding a therapist easy and fun. By joining our website, you’re on your way to helping individuals find their future therapist, and potentially changing someone&apos;s life!
                    </p>
                </div>
            </div>
            <div className="my-16 md:flex justify-between gap-5">
                <div className="md:w-1/2 border-2 border-primary rounded-md">
                    <div className="p-5 text-center">
                        <div className="">
                            <h1 className="text-3xl font-bold">Monthly</h1>
                            <p className="">Membership</p>
                        </div>
                        <div className="my-16">
                            <h1 className="text-5xl font-bold"><sup className='font-normal text-3xl'>$</sup>29.99</h1>
                            <p className="pb-3">per month</p>
                        </div>
                        <div className="">
                            <p className="">30-day free trial</p>
                        </div>
                    </div>
                    <Button onClick={loginHandler} title={'Subscribe Now'} className="w-full btn-secondary rounded-t-none text-2xl" />
                </div>
                <div className="relative md:w-1/2 border-2 border-primary rounded-md mt-10 md:mt-0">
                    <div className="absolute bottom-full font-medium left-1/2 bg-neutral px-3 py-0.5 transform -translate-x-1/2">
                        RECOM MENDED
                    </div>
                    <div className="p-5 text-center">
                        <div className="">
                            <h1 className="text-3xl font-bold">Annual</h1>
                            <p className="">Membership</p>
                        </div>
                        <div className="mt-16 mb-11">
                            <h1 className="text-5xl font-bold"><sup className='font-normal text-3xl'>$</sup>240</h1>
                            <p className="">per year</p>
                        </div>
                        <div className="">
                            <h5 className="text-primary pb-2">Save $120</h5>
                            <p className="">30-day free trial</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(!open)} title={'Subscribe Now'} className="w-full rounded-t-none btn-secondary text-2xl" />
                </div>
            </div>
        </div>
    )
}

export default JoinAsTherapist;