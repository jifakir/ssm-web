import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useFetchTherapistQuery, useReferUrlQuery } from '../../../store/api/ssmApi';



const Referral = ({ profile }) => {

    const [tooltip, setTooltip] = useState('Click to copy!')
    const {data} = useReferUrlQuery(profile?.id);

    const copyToClipboard = () => {
        if(!data) return console.log("Failed!");
        navigator.clipboard.writeText(data?.referral_link);
        setTooltip('Copied!');
    }

    useEffect(() => {
        const timeout = setTimeout(() => setTooltip('Click to copy!'),3000);
        return () => clearTimeout(timeout);
    },[tooltip]);
    
    return (
        <div className="border border-primary rounded-md p-2 md:border-none">
            <h1 className="text-primary font-semibold">Referral URL</h1>
            <div className="mt-[18px]">
                <p onClick={() => navigator.clipboard.writeText('This is text')} className="mb-1.5">
                    For every person that subscribes with your URL, 
                    we’ll gift you 1 month free of your subscription!
                </p>
                <div className="tooltip" data-tip={tooltip}>
                    <input 
                        onClick={copyToClipboard}
                        type="text" 
                        className="w-full
                        px-4 py-2 text-sm
                        border-2 
                        hover:border-neutral 
                        shadow-sm 
                        focus:border-accent 
                        focus:outline-none 
                        bg-white
                        cursor-pointer
                        rounded"
                        value={"https://www.startsayingmore.com/" + data?.referral_link.slice(-7) || ''} 
                        readOnly />
                </div>
            </div>
        </div>
    )
}

export default Referral;