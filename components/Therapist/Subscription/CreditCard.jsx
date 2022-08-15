import React from 'react';
import Image from 'next/image';


const CreditCard = ({ brand, cardNumber }) => (
    <div className="flex items-center">
        <Image src={`/img/${brand === 'visa' ? 'visa.svg' : brand === 'mastercard' ? 'mastercard.svg' : brand === 'amex' ? 'amex.svg' : 'discover.svg'}`} alt="Card Logo" width={41} height={32} />
        <span className='pl-2 text-sm'>ending {cardNumber}</span>
    </div>
)

export default CreditCard;