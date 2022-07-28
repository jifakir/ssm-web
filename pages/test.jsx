import React from 'react';
import { useForm } from 'react-hook-form';
import Script from 'next/script'
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
      <>
      <Script  src="https://cdn2.woxo.tech/a.js#62c40614ec33d95e7c27e46a" async data-usrc/>
      <div
  loading="lazy"
  data-mc-src="88d1d45b-7899-43f1-a878-fd3c98111fc8#null"></div>

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
        </>
    )
}

export default Test;
