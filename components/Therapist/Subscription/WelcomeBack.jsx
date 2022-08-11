import React from 'react';
import Button from '../../UI/Button';



const WelcomeBack = ({clickedOk}) => {
    
    return (
        <div className="h-72 flex justify-center items-center">
            <div className="w-[80%] text-center">
                <h1 className="font-sterio text-3xl">Welcome back!</h1>
                <p className="my-8 text-sm">
                    We have reactivated your subscription. 
                    Your billing date will be updated to reflect the reactivation. 
                    If you have any questions, do not hesitate to contact us. 
                </p>
                <div className="">
                    <Button 
                        title={'OK'}
                        onClick={clickedOk}
                        btnOutline
                        />
                </div>
            </div>
        </div>
    )
}

export default WelcomeBack;