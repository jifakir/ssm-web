import React from 'react';
import Button from '../../UI/Button';



const Confirmed = ({clickedOk}) => {
    
    return (
        <div className="h-72 flex justify-center items-center">
            <div className="w-[80%] text-center">
                <h1 className="font-sterio text-3xl">Subscription Confirmed</h1>
                <p className="my-8 text-xl">You will receive an email confirmation shortly!</p>
                <div className="">
                    <Button 
                        onClick={clickedOk}
                        title={'OK'}
                        btnOutline
                        />
                </div>
            </div>
        </div>
    )
}

export default Confirmed;