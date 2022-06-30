import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';


const Loader = () => {
    return (
        <div className="">
            <div className="flex justify-center items-center min-h-72 h-72">
                <BiLoaderAlt className='animate-spin text-primary text-5xl' />
            </div>
        </div>
    )
}

export default Loader;