import React from 'react';
import Button from '../../UI/Button';



const Cancel = ({ yesHandler, noHandler }) => {

    return (
        <div className={`
            md:fixed bottom-0 md:h-screen md:min-h-screen 
            transition-all duration-500 ease-in-out top-0 
            left-0 z-50 md:bg-primary/60 w-full flex justify-center items-center overscroll-contain`}>
            <div className="h-72 md:h-96 md:px-10 flex justify-center items-center bg-white rounded-md">
                <div className="text-center w-[80%]">
                    <h1 className="font-bold text-2xl pb-4">Are you sure you want to cancel?</h1>
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

export default Cancel;