import React from 'react';
import Image from 'next/image';

const howitworks = [
    {
      title: 'Step 1',
      description: 'Complete the Myers-Briggs Personality test to receive your five-factor personality type.',
      imgUrl: '/img/brain.png'
    },
    {
      title: 'Step 2',
      description: 'Complete our detailed survey to provide us with your personality factors, experiences, preferences, and area(s) of concern.',
      imgUrl: '/img/task.png'
    },
    {
      title: 'Step 3',
      description: 'Our intelligent algorithm will use the results you have provided us with to match you with mental health professionals.',
      imgUrl: '/img/relation.png'
    },
    {
      title: 'Step 4',
      description: 'You will receive a list of professionals that you can contact so you can begin your healing journey!',
      imgUrl: '/img/chat.png'
    },
  ];


const HowItWorks = () => {

    return (
        <div className="">
          <h1 className="text-xl sm:text-[32px] font-bold text-center text-black">How it Works</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            {
              howitworks.map((itm, idx) => (
                <div key={`how_it_words_${idx}`} className="border-2 border-primary p-5 rounded text-center">
                  <h3 className="text-base md:text-2xl">{itm.title}</h3>
                  <div className="flex justify-center">
                    <div className="relative w-32 h-24 my-5">
                      <Image src={itm.imgUrl} alt="Brain" layout='fill' objectFit='contain'  />
                    </div>
                  </div>
                  <div className="">
                    <p className="text-sm md:text-base">
                      {itm.description}
                    </p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
    )
}

export default HowItWorks;