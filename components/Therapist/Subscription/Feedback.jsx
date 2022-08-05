import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../UI/Button';
import Input from '../../UI/TextInput';



const Feedback = ({submitHandler}) => {

    const { control } = useForm({defaultValues: {feedback: ''}});

    return (
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
            <form className="mt-5">
                <Input
                    type={'textarea'}
                    control={control}
                    name={'feedback'}
                    className="min-w-full" />
                <div className="mt-2 text-center">
                    <Button
                        title={'Submit'} />
                </div>
            </form>
        </div>
    )
}

export default Feedback;