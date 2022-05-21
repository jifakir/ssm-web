import React from 'react';
import Button from '../../components/UI/Button';


const JoinAsTherapist = () => {
    return (
        <div className="px-[10%]">
            <div className="">
                <h1 className="font-sterio text-3xl md:text-5xl text-center mt-10">
                    Join As a Therapist
                </h1>
                <div className="mt-5">
                    <p className="">
                        Therapists are the foundation of the healing journey. With the growing demand for mental health care, it’s challenging for individuals to find their ideal therapist. To alleviate this problem, Start Saying More is dedicated to connecting patients with therapists in an effective and efficient manner. In order to best serve our clients, we need qualified therapists to join our database so we can provide your details to potential patients.
                    </p>
                    <p className="mt-5">
                        We benefit both sides. Patients connect with professionals and build confidence and know-how to seek therapy in their future. We want to make finding a therapist easy and fun. By joining our website, you’re on your way to helping individuals find their future therapist, and potentially changing someone&apos;s life!
                    </p>
                </div>
            </div>
            <div className="">
                <div className="border-2 border-primary rounded-md">
                    <div className="p-5 text-center">
                        <div className="">
                            <h1 className="text-3xl font-bold">Monthly</h1>
                            <p className="">Membership</p>
                        </div>
                        <div className="my-10">
                            <h1 className="text-5xl font-bold">29.99</h1>
                            <p className="">per month</p>
                        </div>
                        <div className="">
                            <p className="">30-day free trial</p>
                        </div>
                    </div>
                    <Button title={'Subscribe Now'} className="w-full rounded-t-none btn-secondary text-2xl" />
                </div>
            </div>
        </div>
    )
}

export default JoinAsTherapist;