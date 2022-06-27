import React, { useEffect } from 'react';
import Button from '../../components/UI/Button';
import Login from '../../components/Auth/Login';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchSubscriptionPlanQuery, useSubscribeMutation } from '../../store/api/ssmApi';
import Loader from '../../components/UI/Loader';
import { MdClose } from 'react-icons/md';
import { BiLoaderAlt  } from 'react-icons/bi';
import Stripe from '../../components/Stripe';


const JoinAsTherapist = () => {

    const [open , setOpen] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    const { data, isSuccess, isError, isLoading } = useFetchSubscriptionPlanQuery();
    const [subscribe, { data:subscriptionData, error, isLoading: subsLoading, isError:subsError }] = useSubscribeMutation(subscriptionData);

    const router = useRouter();
    const dispatch = useDispatch();

    const loginHandler = () => {
        if(!isLoggedIn){
            
        }else{  
            router.push('/therapist/questionnaire');
        }
    };

    const handleSubscribe = async (plan_id) => {
        if(!isLoggedIn) return setOpen(!open);
        await subscribe({subscription_plan_id: plan_id});
        setModal(plan_id);
    };

    useEffect(() => {
        // if(isLoggedIn){
        //     router.push('/therapist/questionnaire');
        // }
        if(subsError){
            if(error.status == 422){
                router.push('/therapist/questionnaire')
            }
        }
    },[subsError]);

    if(isLoading){
        return <Loader />
    }

    const [plan1, plan2] = data;

    console.log("Subs: ", subscriptionData);

    return (
        <div className="px-[10%]">
            <Login open={open} setOpen={setOpen} redirectTo="/therapist"   />
            {
                modal && !subsError && (
                        <div className="fixed bg-primary/50 bg-blend-saturation top-0 left-0 z-[500] w-full min-h-screen h-screen flex justify-center items-center">
                            {
                                subsLoading ? 
                                <BiLoaderAlt className="animate-spin text-2xl mr-2" />: 
                                (
                                    <div className="shadow-lg rounded-lg relative w-1/2 min-h-52 h-auto bg-white text-whtie text-center flex justify-center items-center">
                                        <span onClick={() => setModal(false)} className="absolute top-1 right-2 text-2xl cursor-pointer hover:text-red-600">
                                            <MdClose />
                                        </span>
                                        <Stripe loading={subsLoading} data={subscriptionData} />
                                    </div>
                                )
                            }
                        </div>
                        )
            }
            <div className="">
                <h1 className="font-sterio text-3xl xs:text-4xl sm:text-5xl text-center mt-16">
                    Join As a Therapist
                </h1>
                <div className="mt-8 text-xs xs:text-sm sm:text-base text-center lg:text-left">
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
                            <h1 className="text-3xl font-bold">{plan1.plan_name}</h1>
                            <p className="">Membership</p>
                        </div>
                        <div className="my-16">
                            <h1 className="text-5xl font-bold"><sup className='font-normal text-3xl'>$</sup>{plan1.price}</h1>
                            <p className="pb-3">per month</p>
                        </div>
                        <div className="">
                            <p className="">30-day free trial</p>
                        </div>
                    </div>
                    <Button onClick={() => handleSubscribe(plan1.id)} title={'Subscribe Now'} className="w-full btn-secondary rounded-t-none text-2xl" />
                </div>
                <div className="relative md:w-1/2 border-2 border-primary rounded-md mt-10 md:mt-0">
                    <div className="absolute bottom-full font-medium left-1/2 bg-neutral px-3 py-0.5 transform -translate-x-1/2">
                        RECOMMENDED
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
                    <Button onClick={() => handleSubscribe(plan2.id)} title={'Subscribe Now'} className="w-full rounded-t-none btn-secondary text-2xl" />
                </div>
            </div>
        </div>
    )
}

export default JoinAsTherapist;