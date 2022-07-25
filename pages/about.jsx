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
           <div className="relative w-full h-[400px] xs:h-[250px] sm:h-[400px] md:h-[550px]">
                <div className="relative w-full h-full overflow-hidden">
                    <Image src={'/img/about-hero.png'} alt={'Hero Image'} layout="fill" objectFit='cover'  />
                </div>
                <div className="bg-gradient-to-b from-transparent to-secondary/60 absolute w-full h-full top-0  font-sterio sm:translate-x-0 text-5xl sm:text-6xl font-medium md:font-normal md:text-7xl text-primary z-10 text-center md:text-right leading-[50px] md:leading-[93px]">
                    <div className="w-full h-full flex justify-center md:justify-end items-center">
                        <div className="md:text-right md:mr-20">
                            <h2>We want you to</h2>
                            <h1>Start Saying More</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[90%] md:w-[80%] lg:w-[65%] mx-auto">
                <div className="my-10 text-sm md:text-base md:my-16 text-center lg:text-left">
                    <p className="">
                        With a lack of Minority providers available, Minority groups are more likely to suffer negative side effects from inadequate treatment or misdiagnosis, and falsely believe they have little access to support. Start Saying More is dedicated to dismantling these beliefs by providing resources and support for the mental health of Black and minority individuals. Everyone deserves the right to quality mental healthcare, and we’re here to help individuals start saying more.
                    </p>
                    <p className="pt-5">
                        Our goal is to improve the accessibility and efficacy of mental health care by eliminating the search process and reducing the likelihood of switching therapists or giving up on therapy. We want to help you get rid of the grunt work that comes with searching for a therapist! At Start Saying More, we will match you with a therapist who has the personality and experience you are looking for, so that you can begin your counseling journey more easily. We don&apos;t want a difficult process or bad experience to deter you from taking care of your mental health needs, so we are here to help make it easier for you to start and more likely for you to stay.
                    </p>
                </div>
                <div className="">
                    <div className="flex flex-col-reverse lg:flex-row">
                        <div className="lg:w-3/5">
                            <h2 className="text-3xl font-bold mt-5 lg:mt-0 text-center lg:text-left">Olamide Afolabi</h2>
                            <h3 className="text-xl sm:text-2xl text-center lg:text-left mt-2">CEO &amp; Founder</h3>
                            <div className="mt-5 md:mt-2 text-sm md:text-base text-center lg:text-left">
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
            <div className="w-[90%] mx-auto my-10 md:my-16">
                <h3 className="text-2xl text-center lg:text-left">Connect with us on social media!</h3>
                <div className="md:px-[10%] my-5 md:flex gap-5 md:gap-5 space-y-5 md:space-y-0">
                    {
                        filcker?.data?.photos.photo?.slice(0,5).map((photo, idx) => (
                        <div className="relative w-full h-52 sm:h-72 md:w-50 md:h-32 lg:h-52" key={idx}>
                            <Image src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`} alt="Pic" layout='fill' objectFit='cover' />
                        </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default About;