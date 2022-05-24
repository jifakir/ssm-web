import React from 'react';
import Image from 'next/image';
import Button from '../UI/Button';


const Hero = () => {
    return (
        <div className="relative w-full">
            <div className="relative w-full h-[550px] overflow-hidden">
                <Image src={'/img/hero.png'} alt={'Hero Image'} layout="fill" objectFit='cover'  />
            </div>
            <div className="absolute z-10 top-1/2 left-24">
                <h1 className="font-sterio text-5xl text-primary">Start Saying More</h1>
                <p className="my-5">Briding the gap between you and a therapist.</p>
                <Button title={'Start Saying More'} className="text-xl shadow-md" />
            </div>
        </div>
    )
}

export default Hero;