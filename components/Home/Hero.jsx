import React from 'react';
import Image from 'next/image';
import Button from '../UI/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Autoplay } from "swiper";


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
                <SwiperSlide>
                    <div className="relative w-full h-[550px] overflow-hidden">
                        <Image src={'/img/hero.png'} alt={'Hero Image'} layout="fill" objectFit='cover'  />
                    </div>
                    <div className="absolute z-10 top-1/2 left-24">
                        <h1 className="font-sterio text-5xl text-primary">Start Saying More</h1>
                        <p className="my-5">Briding the gap between you and a therapist.</p>
                        <Button title={'Start Saying More'} className="text-xl shadow-md btn-secondary" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full h-[550px] overflow-hidden">
                        <Image src={'/img/slide2.png'} alt={'Hero Image'} layout="fill" objectFit='cover'  />
                    </div>
                    <div className="absolute z-10 top-1/2 left-24">
                        <h1 className="font-sterio text-5xl text-primary">Start Saying More</h1>
                        <p className="my-5">Briding the gap between you and a therapist.</p>
                        <Button title={'Start Saying More'} className="text-xl shadow-md btn-secondary" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full h-[550px] overflow-hidden">
                        <Image src={'/img/hero.png'} alt={'Hero Image'} layout="fill" objectFit='cover'  />
                    </div>
                    <div className="absolute z-10 top-1/2 left-24">
                        <h1 className="font-sterio text-5xl text-primary">Start Saying More</h1>
                        <p className="my-5">Briding the gap between you and a therapist.</p>
                        <Button title={'Start Saying More'} className="text-xl shadow-md btn-secondary" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Hero;