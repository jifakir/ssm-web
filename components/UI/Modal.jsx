import React from 'react';

const Modal = ({children, open}) => {
    return (
        <div className={`${open ? 'block' : 'hidden'} sm:fixed bottom-0 sm:h-screen sm:min-h-screen transition-all duration-500 ease-in-out top-0 left-0 z-50 bg-primary/60 w-full`}>
            <div className="overflow-y-scroll h-full w-full flex justify-center items-center">
                {children}
            </div>
        </div>
    )
}

export default Modal;