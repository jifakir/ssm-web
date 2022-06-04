import React from 'react';
import Image from 'next/image';
import Button from '../components/UI/Button';
import {url} from '../utils/flickr';
import { useEffect, useState } from 'react';
import axios from 'axios';

const About = () => {

    const [filcker, setFlick] = useState(null);
    console.log(filcker)
    useEffect(() => {
        axios.get(url).then((result) => result).then(data => setFlick(data)).catch(err=> console.log(err));
    },[])

    return (
        <div className="">
           <div className="relative w-full">
                <div className="relative w-full h-[350px] sm:h-[400px] md:h-[550px] overflow-hidden">
                    <Image src={'/img/about-hero.png'} alt={'Hero Image'} layout="fill" objectFit='cover'  />
                </div>
                <div className="absolute w-full font-sterio right-1/2 translate-x-1/2 md:translate-x-0 text-4xl font-medium md:font-normal md:text-5xl text-primary z-10 top-1/2 md:right-24 transform -translate-y-1/2 text-center md:text-right leading-[50px] md:leading-[64px]">
                    <h2>We want you to</h2>
                    <h1>Start Saying More</h1>
                </div>
            </div>
            <div className="w-[90%] md:w-[65%] mx-auto">
                <div className="my-10 md:my-20">
                    <p className="">
                        With a lack of Minority providers available, Minority groups are more likely to suffer negative side effects from inadequate treatment or misdiagnosis, and falsely believe they have little access to support. Start Saying More is dedicated to dismantling these beliefs by providing resources and support for the mental health of Black and minority individuals. Everyone deserves the right to quality mental healthcare, and we’re here to help individuals start saying more.
                    </p>
                    <p className="pt-5">
                        Our goal is to improve the accessibility and efficacy of mental health care by eliminating the search process and reducing the likelihood of switching therapists or giving up on therapy. We want to help you get rid of the grunt work that comes with searching for a therapist! At Start Saying More, we will match you with a therapist who has the personality and experience you are looking for, so that you can begin your counseling journey more easily. We don&apos;t want a difficult process or bad experience to deter you from taking care of your mental health needs, so we are here to help make it easier for you to start and more likely for you to stay.
                    </p>
                </div>
                <div className="">
                    <div className="flex flex-col-reverse lg:flex-row">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold mt-5 lg:mt-0 text-center">Olamide Afolabi</h2>
                            <h3 className="text-xl sm:text-2xl text-center mt-2">CEO &amp; Founder</h3>
                            <div className="mt-2">
                                <p className="">
                                    Start Saying More was founded by Olamide Afolabi, a Nigerian American who has made it her mission in life to get as many people as she can into therapy. She holds the strong belief that the ability to unlearn and relearn how to properly process experiences is one of the first things that poise us for success. In the past, Olamide had worked with some non-Black mental health providers who simply did not create a comfortable and trusting atmosphere. Due to this, she would half-heartedly attend sessions until she would stop going completely. Each time, it would take years before she put in the effort to find a new therapist. It wasn’t until Olamide found a Black woman therapist with similar personality traits, values, and experiences that she felt fully supported enough to explore herself and do the self work necessary to be a better human, all around.
                                </p>
                                <p className="mt-2">
                                The story of having a difficult time connecting with a mental health provider is not new or uncommon. Understanding this, Olamide is devoted to providing methods to not only get more Black and minority people into therapy, but to retain them as well.
                                </p>
                            </div>
                        </div>
                        <div className="lg:pl-10 pt-2 lg:pt-12 flex justify-center">
                            <div className="relative">
                                <Image src={'/img/olamide.jpg'} alt="CEO Photo" width={428} height={428} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[90%] mx-auto my-5">
                <h3 className="text-2xl text-left">Connect with us on social media!</h3>
                <div className="my-5 md:flex justify-center gap-2">
                    {
                        filcker?.data?.photos.photo?.slice(0,5).map((photo, idx) => (
                        <div className="relative w-full h-52 sm:h-72 md:w-50 md:h-52" key={idx}>
                            <Image src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`} alt="Pic" layout='fill' objectFit='cover' />
                        </div>
                        ))
                    }
                    {/* <div className="relative w-52 h-52">
                        <Image src={'/img/who1.png'} alt="Pic" layout='fill' objectFit='cover' />
                    </div>
                    <div className="relative w-52 h-52">
                        <Image src={'/img/who2.png'} alt="Pic" layout='fill' objectFit='cover' />
                    </div>
                    <div className="relative w-52 h-52">
                        <Image src={'/img/who3.png'} alt="Pic" layout='fill' objectFit='cover' />
                    </div>
                    <div className="relative w-52 h-52">
                        <Image src={'/img/who4.png'} alt="Pic" layout='fill' objectFit='cover' />
                    </div>
                    <div className="relative w-52 h-52">
                        <Image src={'/img/who5.png'} alt="Pic" layout='fill' objectFit='cover' />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default About;