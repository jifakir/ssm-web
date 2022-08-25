import React from 'react';
import { useFetchTherapistQuery, useReferUrlQuery } from '../../../store/api/ssmApi';



const Referral = ({ profile }) => {

    const {data} = useReferUrlQuery(profile?.id);

    const copyToClipboard = () => {
        if(!data) return console.log("Failed!");
        navigator.clipboard.writeText(data?.referral_link);
    }

    return (
        <div className="border border-primary rounded-md p-2 md:border-none">
            <h1 className="text-primary font-semibold">Referral URL</h1>
            <div className="mt-[18px]">
                <p onClick={() => navigator.clipboard.writeText('This is text')} className="mb-1.5">
                    For every person that subscribes with your URL, 
                    we’ll gift you 1 month free of your subscription!
                </p>
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
                    value={"https://ssm.com/" + data?.referral_link.slice(-7) || ''} 
                    readOnly />
            </div>
        </div>
    )
}

export default Referral;