import React from 'react';



const Button = ({children, btnQnr, title, fontSize, btnLg, btnSecondary, disabled, type, onClick, className, ...rest}) => {
    
    return ( btnQnr ?
            (<><button
                onClick={onClick}
                type={type ? type : 'submit'}
                {...rest} 
                className={`
                    text-2xl
                    leading-7
                    tracking-[0.055em]
                    text-primary
                    uppercase
                    px-4
                    py-2
                    hover:bg-neutral/50 
                    active:bg-accent-focus
                    rounded
                    gap-2
                    font-semibold
                    disabled:bg-[#C0C0C0]
                    disabled:text-[#3E3643]
                    disabled:cursor-not-allowed
                    ${
                        btnSecondary ?
                        'border-[3px] bg-transparent border-neutral hover:border-neutral/10':
                        'bg-neutral'
                    }
                    ${
                        btnLg ?
                        'min-w-[235px]':
                        'min-w-[156px]'
                    }
                    ${className}`}
                    disabled={disabled}>
                <div className="flex justify-center items-center">
                {children}
                {title}
                </div>
            </button></>):
            (<><button 
                onClick={onClick} 
                {...rest} 
                className={`
                    leading-7
                    tracking-[0.055em]
                    text-primary
                    py-4
                    hover:bg-secondary/50 
                    active:bg-neutral-focus
                    rounded
                    gap-2
                    font-semibold
                    disabled:bg-[#C0C0C0]
                    disabled:text-[#3E3643]
                    disabled:cursor-not-allowed
                    uppercase
                    ${
                        btnSecondary ?
                        'border-[3px] bg-transparent border-secondary hover:border-secondary/10':
                        'bg-secondary'
                    }
                    ${
                        btnLg ?
                        'sm:min-w-[235px] px-4 sm:px-6 md:px-8':
                        'sm:min-w-[156px] px-4 sm:px-5 md:px-6'
                    }
                    ${className}
                    ${
                        fontSize ? fontSize : 'text-xl md:text-2xl'
                    }`}>
                <div className="flex justify-center items-center">
                {children}
                {title}
                </div>
            </button></>)
    )
}

export default Button;