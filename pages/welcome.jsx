import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/UI/TextInput';


const Welcome = () => {

    const {control} = useForm();

    return (
        <div className="">Hello</div>
    )
}

export default Welcome;