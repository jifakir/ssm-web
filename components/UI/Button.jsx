import React from 'react';



const Button = ({children, title, className, ...rest}) => {
    return (
    <button {...rest} className={`hover:bg-neutral/50 hover:border-neutral/20 active:bg-neutral-focus btn rounded border-2 gap-2 text-primary font-semibold ${className}`}>
        {children}
        {title}
    </button>
    )
}

export default Button;