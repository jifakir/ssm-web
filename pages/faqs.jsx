import React from 'react';
import Accordion from '../components/Accordion';

const faqData = [
    {
        title: 'How can I log in and see my profile?',
        description: 'If you have signed up as a patient, we currently do not have any login or profile page set up for you.  We have your details that you have shared, and once we have the option available you will be able to use the email and password that you have created. If you are a therapist, select login in the top right corner of any page. You should be logged in and able to view and edit your complete profile.'
    },
    {
        title: `I've completed the survey. What happens next?`,
        description: `You have taken the first step to take the first steps toward getting help for yourself. Congratulations! Now that you have completed the match survey, keep an eye out for an email for us with a little of possible therapists. It is up to you to reach out and schedule the appointment. We help you find somebody, but you have to be the one to take that leap for yourself. You got this!`
    },
    {
        title: 'How is therapy going to help me?',
        description: `Going to therapy helps people in different ways. It honestly depends on you - why you're going, what you put into it, and what you aim to gain from it. You must put in a genuine effort with therapy for it to work. You must do the work - the homework, the self-work, and the daily work on days that you don't have sessions. Talk to your mental health provider about ways to make counseling as effective as possible for you.`
    },
    {
        title: 'How can I get the most out of therapy?',
        description: `Be fully in it! Like most things, therapy works best when you are open and willing. Take notes before, after, and during your sessions. Be honest with your therapist - they aren't there to judge you and cannot properly guide you if you are telling lies. Complete the assignment your provider gives you. Take the time to self-reflect - on your mindset, your reactions, your experiences, and your overall thoughts.`
    },
    {
        title: 'Who can benefit from therapy?',
        description: `Any and everyone can benefit from therapy. If you have life experiences, you can benefit. Therapy is not only for traumatic experiences - it can also be used to help you manage life's daily stressors, make changes in your career, develop or repair family relationships, increase self-confidence, etc. The possibilities are endless.`
    },
    {
        title: 'How do I know if I need medication?',
        description: `If you think you may need medication, a psychiatrist can help to confirm and prescribe any necessary medications. Be honest with your psychiatrist so they are able to make an accurate judgment of your mental state and help you as needed.`
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