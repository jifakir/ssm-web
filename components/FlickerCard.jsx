import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Loader from './UI/Loader';
import { url } from '../utils/flickr';

const FlickerCard = () => {

  const [filcker, setFlick] = useState(null);

  useEffect(() => {
    axios.get(url)
    .then((result) => result)
    .then(data => setFlick(data))
    .catch(err=> console.log(err));
  },[])

  if(!filcker){
    return <Loader className='text-5xl text-secondary' />
  }
  return  (<div
    loading="lazy"
    data-mc-src="88ec8575-62d6-4b60-9db9-22d62d8c21da#instagram"></div>

    // return (
    //     <div className="px-[5%] md:px-[10%] my-5 md:flex gap-5 md:gap-5 space-y-5 md:space-y-0">
    //       {
    //         filcker?.data?.photos.photo?.slice(0,5).map((photo, idx) => (
    //           <div className="relative w-full h-52 sm:h-72 md:w-50 md:h-32 lg:h-52" key={idx}>
    //             <Image src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`} alt="Pic" layout='fill' objectFit='cover' />
    //           </div>
    //         ))
    //       }
    //     </div>
    // )
}

export default FlickerCard;