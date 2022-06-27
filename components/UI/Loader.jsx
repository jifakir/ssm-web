import React from 'react';
import { FaSpinner } from 'react-icons/fa';


const Loader = () => {
    return (
        <div className="">
            <div className="flex justify-center items-center min-h-72 h-72">
                <FaSpinner className='animate-spin text-primary text-5xl' />
            </div>
        </div>
    )
}

export default Loader;