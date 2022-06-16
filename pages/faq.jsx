import React from 'react';
import Accordion from '../components/Accordion';

const faqData = [
    {
        title: 'How can I log in and see my profile?',
        description: 'If you have signed up as a patient, we currently do not have any login or profile page set up for you.  We have your details that you have shared, and once we have the option available you will be able to use the email and password that you have created. If you are a therapist, select login in the top right corner of any page. You should be logged in and able to view and edit your complete profile.'
    },
    {
        title: `I've completed the survey. What happens next?`,
        description: 'adkfkdj'
    },
    {
        title: 'How is therapy going to help me?',
        description: 'adkfkdj'
    },
    {
        title: 'How can I get the most out of therapy?',
        description: 'adkfkdj'
    },
    {
        title: 'Who can benefit from therapy?',
        description: 'adkfkdj'
    },
    {
        title: 'How do I know if I need medication?',
        description: 'adkfkdj'
    },
];

const Faq = () => {

    return (
        <div className="w-[85%] mx-auto my-16">
            <h1 className="font-sterio text-center text-5xl">Frequently Asked Questions</h1>
            <div className="mt-16">
                {
                    faqData.map((itm, idx) => <Accordion key={idx} data={itm} />)
                }
            </div>
        </div>
    )
}

export default Faq;