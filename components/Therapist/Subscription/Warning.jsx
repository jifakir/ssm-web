import React from 'react';
import Button from '../../UI/Button';



const Warning = ({yesHandler, noHandler}) => {
    return (
        <div className={`
            md:fixed bottom-0 md:h-screen md:min-h-screen 
            transition-all duration-500 ease-in-out top-0 
            left-0 z-50 md:bg-primary/60 w-full flex justify-center items-center overscroll-contain`}>
            <div className="w-full md:w-[450px] h-auto md:px-10 py-10 flex justify-center items-center bg-white rounded-md">
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
        </div>
    )
}

export default Warning;