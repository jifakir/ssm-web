import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


const Patient = () => {
    
    return (
        <div className="">
            <div className="px-[10%] mt-28 flex">
                <div className="">
                    <Image src={'/img/bg.png'} alt={'Image'} width={600} height={400} />
                </div>
                <div className="flex flex-col gap-5 justify-end pl-5 pb-6">
                    <div className="uppercase">
                        <h2>STEP 1</h2>
                        <button className="btn bg-[#be6720] text-lg text-white">
                            Myers-briggs test
                        </button>
                    </div>
                    <div className="uppercase">
                        <h2>STEP 1</h2>
                        <button className="w-full btn btn-primary text-lg text-white">
                            <Link href={'/patient/questionnaire'}>
                                match survey
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
            <div className="">
                <h1 className="">
                    How It Works
                </h1>
            </div>
        </div>
    )
}

export default Patient;