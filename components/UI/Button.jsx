import React from 'react';



const Button = ({children, title, onClick, className, ...rest}) => {
    return (
    <button onClick={onClick} {...rest} className={`hover:bg-neutral/50 hover:border-neutral/20 active:bg-neutral-focus btn rounded border-2 gap-2 text-primary font-semibold ${className}`}>
        <div className="">
        {children}
        {title}
        </div>
    </button>
    )
}

export default Button;