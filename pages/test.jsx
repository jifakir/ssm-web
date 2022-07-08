import React from 'react';
import { useForm } from 'react-hook-form';
import InstagramEmbed from 'react-instagram-embed';
import Stripe from '../components/Stripe';
import Qualification from '../components/Therapist/Qualification';
import Availability from '../components/TherapyQues/Availability';
import TestAvail from '../components/TherapyQues/TestAvail';
import InputText from '../components/UI/InputText';
import PhonNumber from '../components/UI/Number';
import RadioInput from '../components/UI/TestRadio';
import TestRadio from '../components/UI/TestRadio';



const Test = () => {

    const { control, watch, handleSubmit } = useForm({defaultValues: {number: ''}});
    const onSubmitHandler = (data) => {
        console.log(data);
    };

    console.log(watch());
    
    return (
        <div className="min-h-screen w-[50%] mx-auto my-10">
                
                <TestAvail />
            {/* <Qualification /> */}
                {/* <InstagramEmbed
                    url='http://instagram.com/gkjahid02'
                    clientAccessToken='610311713855658|TtqhADvzBmWWT43hhr8W4vvxVXs'
                    maxWidth={700}
                    hideCaption={false}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}
                     /> */}
        </div>
    )
}

export default Test;