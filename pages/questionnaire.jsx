import React from 'react';
import Orientation from '../components/Ques/Orientation';
import Religion from '../components/Ques/Religion';
import Language from '../components/Ques/Language';
import Availability from '../components/Ques/Availability';
import Education from '../components/Ques/Education';
import Email from '../components/Ques/Email';
import Insurance from '../components/Ques/Insurance';
import Name from '../components/Ques/Name';
import OtherLang from '../components/Ques/OtherLang';
import Personality from '../components/Ques/Personality';
import RelSess from '../components/Ques/RelSess';
import SpritPerson from '../components/Ques/SpritPerson';




const Questionnaire = () => {

    const [serial, setSerial] = React.useState(null);

    const handleNext = () => {
        if(serial === 13) return;
        setSerial(serial + 1);
    };

    const handleBack = () => {
        if(serial === 1) return;
        setSerial(serial - 1);
    };

    React.useEffect(() => {
        setSerial(1);
    },[]);


    const components = [
        {
            sr: 1,
            cp: <button onClick={handleNext} className="btn bg-primary border-none font-medium px-8">Get Started</button>
        },
        {
            sr: 2,
            cp: <Name />
        },
        {
            sr: 3,
            cp: <Email />
        },
        {
            sr: 4,
            cp: <Orientation />
        },
        {
            sr: 5,
            cp: <Education />
        },
        {
            sr: 6,
            cp: <Personality />
        },
        {
            sr: 7,
            cp: <Religion />
        },
        {
            sr: 8,
            cp: <RelSess />
        },
        {
            sr: 9,
            cp: <SpritPerson />
        },
        {
            sr: 10,
            cp: <Language />
        },
        {
            sr: 11,
            cp: <OtherLang />
        },
        {
            sr: 12,
            cp: <Insurance />
        },
        {
            sr: 13,
            cp: <Availability />
        },
    ];

    return (
        <div className="px-10 pt-5">
            <div className="">
                <h1 className="text-7xl">Welcome</h1>
                <p className="text-2xl mt-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. 
                </p>
            </div>
            {/* Slide section */}
            <div className="mt-10">
                <progress className="progress w-full bg-neutral1 progress-primary" value="10" max="100"></progress>
                {/* Form Inner */}
                <div className="text-center">
                    {
                        components.map((cp, idx) => {

                            return (
                                <div className={serial === cp.sr ? 'block' : 'hidden'} key={idx}>
                                    {cp.cp}
                                </div>
                            )
                        })
                    }
                </div>
                {/* Handle Form */}
                <div className={`space-x-5 py-2 ${serial === 1 ? 'hidden' : 'block'}`}>
                    <button onClick={handleBack} className="btn btn-outline btn-primary">
                        Back
                    </button>
                    <button onClick={handleNext} className="btn btn-primary" >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Questionnaire;