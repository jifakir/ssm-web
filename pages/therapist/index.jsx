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
import { saveSubsDetails } from '../../store/reducers/subscriptionSlice';
import { logOut } from '../../store/reducers/authReducer';
import Therapist from '../../components/Auth/Therapist';


const JoinAsTherapist = () => {

    const [open , setOpen] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    const { data, isSuccess, isError, isLoading } = useFetchSubscriptionPlanQuery();
    const [subscribe, { 
        data:subscriptionData, 
        error, 
        isLoading: subsLoading,
        isError:subsError,
        isSuccess:subsSuccess }] = useSubscribeMutation(subscriptionData);

    const router = useRouter();
    const dispatch = useDispatch();

    const loginHandler = () => {
        if(!isLoggedIn){
        }else{  
            router.push('/therapist/questionnaire');
        }
    };

    const handleSubscribe = async (plan) => {
        if(!isLoggedIn){
            setOpen(!open);
            dispatch(saveSubsDetails(plan));
            return window.scrollTo({
                top: 10,
                behavior: 'smooth',
              });
        }else{
            dispatch(saveSubsDetails(plan));
            router.push('/therapist/questionnaire');
        }
    };

    useEffect(() => {
        if(subsError){
            if(error.status == 422){
                router.push('/therapist/questionnaire')
            }
            if(error.status == 401){
                dispatch(logOut());
                setOpen(state => !state);
            }
        }
        if(subsSuccess){
            router.push('/therapist/questionnaire');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[subsError, subsSuccess]);

    if(isLoading){
        return <Loader />
    }

    if(isError){
        return (
        <div className="w-full h-72 min-h-72 flex justify-center items-center">
            <p className="text-error font-medium">{ error?.data || error?.error || 'Something went wrong!' }</p>
        </div>
        )
    }

    const monthlyPlan = data.find(d=> d.recurring_interval === 'month')
    const yearlyPlan = data.find(d=> d.recurring_interval === 'year')
    return (
        <div className="px-[10%]">
            <Therapist showSignup open={open} setOpen={setOpen} defaultTab={1} />
            <div className={`${open ? 'hidden' : 'block'}`}>
                <h1 className="font-sterio text-3xl xs:text-4xl sm:text-5xl text-center mt-16">
                    Join As a Therapist
                </h1>
                <div className="mt-8 text-sm md:text-base text-center lg:text-left">
                    <p className="">
                        Therapists are the foundation of the healing journey. With the growing demand for mental health care, it’s challenging for individuals to find their ideal therapist. To alleviate this problem, Start Saying More is dedicated to connecting patients with therapists in an effective and efficient manner. In order to best serve our clients, we need qualified therapists to join our database so we can provide your details to potential patients.
                    </p>
                    <p className="mt-5">
                        We benefit both sides. Patients connect with professionals and build confidence and know-how to seek therapy in their future. We want to make finding a therapist easy and fun. By joining our website, you’re on your way to helping individuals find their future therapist, and potentially changing someone&apos;s life!
                    </p>
                </div>
            </div>
            <div className={`my-16 md:flex justify-between gap-5 ${open ? 'hidden' : 'block'}`}>
                <div className="md:w-1/2 border-2 border-primary rounded-md">
                    <div className="p-5 text-center">
                        <div className="">
                            <h1 className="text-2xl md:text-3xl font-bold">{monthlyPlan.plan_name}</h1>
                            <p className="text-sm md:text-base">Membership</p>
                        </div>
                        <div className="my-16">
                            <h1 className="text-4xl md:text-5xl font-bold"><sup className='font-normal text-2xl md:text-3xl'>$</sup>{monthlyPlan.price}</h1>
                            <p className="pb-3 text-sm md:text-lg">per month</p>
                        </div>
                        <div className="">
                            <p className="text-sm md:text-base">30-day free trial</p>
                        </div>
                    </div>
                    <Button onClick={() => handleSubscribe(monthlyPlan)} title={'Subscribe Now'} className="w-full btn-secondary rounded-t-none text-xl md:text-2xl" />
                </div>
                <div className="relative md:w-1/2 border-2 border-primary rounded-md mt-10 md:mt-0">
                    <div className="absolute bottom-full text-xs md:text-base font-semibold md:font-medium left-1/2 bg-neutral px-3 py-0.5 transform -translate-x-1/2">
                        RECOMMENDED
                    </div>
                    <div className="p-5 text-center text-sm md:text-base">
                        <div className="">
                            <h1 className="text-2xl md:text-3xl font-bold">Annual</h1>
                            <p className="">Membership</p>
                        </div>
                        <div className="mt-16 mb-11">
                            <h1 className="text-4xl md:text-5xl font-bold"><sup className='font-normal text-2xl md:text-3xl'>$</sup>240</h1>
                            <p className="">per year</p>
                        </div>
                        <div className="">
                            <h5 className="text-primary pb-2">Save $120</h5>
                            <p className="">30-day free trial</p>
                        </div>
                    </div>
                    <Button onClick={() => handleSubscribe(yearlyPlan)} title={'Subscribe Now'} className="w-full rounded-t-none btn-secondary text-xl md:mt-1 md:text-2xl" />
                </div>
            </div>
        </div>
    )
}

export default JoinAsTherapist;