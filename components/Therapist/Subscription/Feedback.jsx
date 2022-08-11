import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useCancelSubscriptionMutation, useFetchSubscriptionsQuery } from '../../../store/api/ssmApi';
import Button from '../../UI/Button';
import Input from '../../UI/TextInput';



const Feedback = ({ setForm }) => {

    const { control, handleSubmit } = useForm({defaultValues: {feedback: ''}});
    const { data } = useFetchSubscriptionsQuery();
    const [cancelSubscription, {isLoading, isError, error}] = useCancelSubscriptionMutation();

    const { isLoggedIn, userDetails } = useSelector(state => state.auth);
    console.log("Subsc", data);
    const handleFeedback = ({feedback}) => {
        const subscription = data ? data[0].id : ''
        if(!subscription){
            console.log('Does not exist');
        }
        cancelSubscription({subsId: subscription, feedback});
        setForm(false);
    };

    return (
        <div className={`
            md:fixed bottom-0 md:h-screen md:min-h-screen 
            transition-all duration-500 ease-in-out top-0 
            left-0 z-50 md:bg-primary/60 w-full flex justify-center items-center overscroll-contain`}>
            <div className="w-full md:w-[450px] h-auto md:px-10 py-10 flex justify-center items-center bg-white rounded-md">
                <div className="my-5">
                    <div className="text-center">
                        <h1 className="font-sterio text-3xl">We&apos;re sorry to see you go!</h1>
                        <p className="text-sm mt-5">
                            We have cancelled your subscription. 
                            You will no longer be charged to be listed on the Start 
                            Saying More database, but you will be listed until the end of 
                            the billing period. You are free to reactivate your subscription 
                            at any point on your profile page. 
                        </p>
                        <p className="text-sm mt-2">
                            Please let us know below what we can do better.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(handleFeedback)} className="mt-5">
                        <Input
                            type={'textarea'}
                            control={control}
                            name={'feedback'}
                            rules={{
                                required: 'This field is requried'
                            }}
                            className="min-w-full" />
                        <div className="mt-2 text-center">
                            <Button
                                title={'Submit'} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Feedback;