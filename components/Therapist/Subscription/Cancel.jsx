import React from 'react';
import Button from '../../UI/Button';



const Cancel = ({ yesHandler, noHandler }) => {

    return (
        <div className="h-72 flex justify-center items-center">
            <div className="text-center w-[80%]">
                <h1 className="font-bold text-2xl pb-4">Are you sure you want to cancel?</h1>
                <div className="my-4">
                    <Button
                        onClick={yesHandler}
                        title={`No, don't cancel`}
                        btnOutline />
                </div>
                <Button
                    onClick={noHandler}
                    title={`yes, cancel`}
                    btnOutline 
                    btnSecondary />
            </div>
        </div>
    )
}

export default Cancel;