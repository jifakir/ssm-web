import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineClose } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import Form from '../components/Signup/Form';
import Success from '../components/Signup/Success';

const Signup = () => {

    const [submitted, setSubmitted] = React.useState(true);

    return (
        <div className="w-full min-h-full flex justify-center items-center">
            {
                submitted ? <Success /> : <Form />
            }
        </div>
    )
}

export default Signup;