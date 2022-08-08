import React from 'react';
import Button from '../../UI/Button';



const Warning = ({yesHandler, noHandler}) => {
    return (
        <div className="h-72 flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-xl pb-4"> If you cancel, you will no longer be listed on our database. We want to continue to share your contact details with future patients. </h1>
                <div className="my-4"> 
                    <Button
                        onClick={noHandler}
                        title={`No, don't cancel`}
                        btnOutline />
                </div>
                <Button
                    onClick={yesHandler}
                    title={`yes, cancel`}
                    btnOutline 
                    btnSecondary />
            </div>
        </div>
    )
}

export default Warning;