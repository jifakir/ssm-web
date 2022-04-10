import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineClose } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import Form from '../components/Signup/Form';
import Success from '../components/Signup/Success';
import { useRouter } from 'next/router';

const Signup = () => {

    const router = useRouter();
    const [submitted, setSubmitted] = React.useState(false);

    React.useEffect(() => {
        if(submitted){
            setTimeout(() => router.push('/questionnaire'), 500);
        }
    },[submitted]);

    return (
        <div className="w-full flex justify-center items-center">
            {
                submitted ? <Success /> : <Form setSubmitted={setSubmitted} />
            }
        </div>
    )
}

export default Signup;