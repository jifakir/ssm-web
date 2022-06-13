import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Hero from '../components/Home/Hero'
import Button from '../components/UI/Button'
import HowItWorks from '../components/Home/HowItWorks';
import {url} from '../utils/flickr';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [filcker, setFlick] = useState(null);
  console.log(filcker)
  useEffect(() => {
    axios.get(url).then((result) => result).then(data => setFlick(data)).catch(err=> console.log(err));
  },[])
  return (
    <div className='w-full'>
      <Hero />
      <div className="w-[90%] md:w-[65%] mx-auto">
        <div className="w-full lg:flex items-center justify-between py-16">
          <div className="lg:w-1/2 relative px-5 flex justify-center lg:block">
            <Image src={'/img/underhero.png'} alt="Under hero" width={454} height={302} />
          </div>
          <div className="lg:w-1/2 pl-5 mt-5 lg:mt-0">
            <p className="text-center lg:text-left">
              Finding the right therapist can be stressful and time-intensive. Start Saying More is an innovative platform that aims to connect minority individuals with a mental health provider that they are most likely to feel secure sharing and healing with. Using our detailed survey, we’ll match your personality, area(s) of concern, experiences, and preferences with professionals in our database that are just right for you. We’re helping to reduce the stress associated with looking for a new provider. We want to make it easier for you.
            </p>
          </div>
        </div>
        {/* HOW IT WORKS */}
        <HowItWorks />
        {/* FIND A THERAPIST BUTTON AND WHO WE ARE */}
        <div className="mt-10 flex justify-center">
          <Link href={'/patient'} passHref>
            <Button title={'Find A Therapist'} btnLg  />
          </Link>
        </div>
        <div className="mt-16">
          <h1 className="text-[35px] text-black font-bold text-center mb-5">
            Who We Are
          </h1>
          <p className="py-5">
            Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus. Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus. Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo.
          </p>
        </div>
      </div>
      <div className="mb-16">
        <div className="px-[5%] md:px-[10%] my-5 md:flex gap-5 md:gap-5 space-y-5 md:space-y-0">
          {
            filcker?.data?.photos.photo?.slice(0,5).map((photo, idx) => (
              <div className="relative w-full h-52 sm:h-72 md:w-50 md:h-52" key={idx}>
                <Image src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`} alt="Pic" layout='fill' objectFit='cover' />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
