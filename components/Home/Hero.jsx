import React from 'react';
import Image from 'next/image';
import Button from '../UI/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Autoplay } from "swiper";

const slideData = [
    {
        imgUrl: '/img/slide1.jpg',
        title: 'Start Saying More',
        description: 'Briding the gap between you and a therapist.'
    },
    {
        imgUrl: '/img/slide2.jpg',
        title: 'Start Saying More',
        description: 'Briding the gap between you and a therapist.'
    },
    {
        imgUrl: '/img/slide3.jpg',
        title: 'Start Saying More',
        description: 'Briding the gap between you and a therapist.'
    },
    {
        imgUrl: '/img/slide4.jpg',
        title: 'Start Saying More',
        description: 'Briding the gap between you and a therapist.'
    },
    {
        imgUrl: '/img/slide5.jpg',
        title: 'Start Saying More',
        description: 'Briding the gap between you and a therapist.'
    },
    {
        imgUrl: '/img/slide6.jpg',
        title: 'Start Saying More',
        description: 'Briding the gap between you and a therapist.'
    },
    {
        imgUrl: '/img/slide7.jpg',
        title: 'Start Saying More',
        description: 'Briding the gap between you and a therapist.'
    },
    {
        imgUrl: '/img/slide8.jpg',
        title: 'Start Saying More',
        description: 'Briding the gap between you and a therapist.'
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
                                <div className="relative w-full z-10 h-[180px] xs:h-[250px] sm:h-[300px] md:h-[400px] lg:h-[550px] overflow-hidden">
                                    <Image src={slide.imgUrl} alt={'Hero Image'} layout="fill" objectFit='cover'  />
                                </div>
                                <div className="absolute z-10 top-1/3 sm:top-1/2 left-5 sm:left-14 md:left-24">
                                    <h1 className="font-sterio text-3xl md:text-7xl text-primary">{slide.title}</h1>
                                    <p className="my-2 md:my-5 text-xs md:text-lg">{slide.description}</p>
                                    <Button 
                                        title={'Start Saying More'}
                                        btnLg
                                         />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                
            </Swiper>
        </div>
    )
}

export default Hero;