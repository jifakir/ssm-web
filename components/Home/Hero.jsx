import React from 'react';
import Image from 'next/image';
import Button from '../UI/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Autoplay } from "swiper";
import Link from 'next/link';

const slideData = [
    {
        imgUrl: '/img/slide1.jpg',
        title: 'Start Saying More',
        description: 'Bridging the gap between you and a therapist.'
    },
    {
        imgUrl: '/img/slide2.jpg',
        title: 'Start Saying More',
        description: 'Bridging the gap between you and a therapist.'
    },
    {
        imgUrl: '/img/slide3.jpg',
        title: 'Start Saying More',
        description: 'Bridging the gap between you and a therapist.'
    },
    {
        imgUrl: '/img/slide4.jpg',
        title: 'Start Saying More',
        description: 'Bridging the gap between you and a therapist.'
    },
    {
        imgUrl: '/img/slide5.jpg',
        title: 'Start Saying More',
        description: 'Bridging the gap between you and a therapist.'
    },
    {
        imgUrl: '/img/slide6.jpg',
        title: 'Start Saying More',
        description: 'Bridging the gap between you and a therapist.'
    },
    {
        imgUrl: '/img/slide7.jpg',
        title: 'Start Saying More',
        description: 'Bridging the gap between you and a therapist.'
    },
    {
        imgUrl: '/img/slide8.jpg',
        title: 'Start Saying More',
        description: 'Bridging the gap between you and a therapist.'
    },
];

const Hero = () => {


    return (
        <div className="relative w-full">
            <Swiper
                
                effect={"fade"}
                loop={true}
                autoplay={{delay: 5000}}
                speed={3000}
                modules={[EffectFade, Navigation, Autoplay]}
                >
                    {
                        slideData.map((slide, idx) => (
                            <SwiperSlide key={`slide_${idx}`}>
                                <div className="relative w-full z-10 h-[400px] sm:h-[350px] md:h-[350] lg:h-[523px] xl:h-[550px] overflow-hidden">
                                    <Image src={slide.imgUrl} alt={'Hero Image'} layout="fill" className='object-cover object-[70%_80%]'  />
                                </div>
                                <div className="absolute bg-gradient-to-b from-white/70 md:from-transparent to-accent-focus/70 md:to-transparent top-0 left-0 w-full h-full z-10 flex justify-center md:justify-start items-center xl:items-end">
                                    <div className='w-[90%] md:w-auto text-center md:text-left px-5 md:px-32 xl:pb-16'>
                                        <h1 className="font-sterio text-[35px] xxs:text-[38px] xs:text-5xl xl:text-7xl text-primary">{slide.title}</h1>
                                        <p className="my-2 mx-10 md:mx-0 md:my-5 text-xs xxs:text-sm xs:text-base md:text-xl">{slide.description}</p>
                                        <Link href={'/patient'} passHref>
                                            <button 
                                            className={`
                                                w-full
                                                xxs:w-auto
                                                bg-secondary
                                                leading-7
                                                tracking-[0.055em]
                                                text-[#4C2961]
                                                py-2
                                                md:py-3
                                                lg:py-4
                                                hover:bg-secondary/50 
                                                active:bg-neutral-focus
                                                rounded
                                                gap-2
                                                px-5
                                                xxs:px-7
                                                md:px-8
                                                font-semibold
                                                disabled:bg-[#C0C0C0]
                                                disabled:text-[#3E3643]
                                                disabled:cursor-not-allowed
                                                uppercase
                                                text-lg
                                                xs:text-2xl
                                                `}>
                                                    START SAYING MORE
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                
            </Swiper>
        </div>
    )
}

export default Hero;