import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';


const Accordion = ({ data: {title, description} }) => {

    const [open, setOpen] = useState(false);
    console.log(open);

    return (
        <div className="collapse collapse-arrow border-t-2 border-secondary">
            <input type="checkbox" className="peer" /> 
            <div  className="flex justify-between items-center collapse-title text-black peer-checked:bg-secondary peer-checked:text-secondary-content">
                    <span className="">{title}</span>
            </div>
            <div className="collapse-content text-primary-content  peer-checked:text-secondary-content"> 
                <p className='py-3'>{description}</p>
            </div>
        </div>
    )
}

export default Accordion;