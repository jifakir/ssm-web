import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { ImSpinner9 } from 'react-icons/im';


const Subscription = () => {
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(()=> router.push('/therapist/profile'), 3000);
        return () => timeout
    },[]);
    
    return (
        <div className="min-h-72 h-72 w-full flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-primary text-5xl font-sterio">Subscription Successful!</h1>
                <div className='flex justify-center my-5'>
                    <ImSpinner9 className='text-2xl text-primary animate-spin' /> 
                </div>
                <p className="text-sm text-primary/50">now you are redirecting to profile page</p>
            </div>
        </div>
    )
}

export default Subscription;