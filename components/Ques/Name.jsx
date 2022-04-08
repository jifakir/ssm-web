import React from 'react';



const Name = () => {
    return (
        <div className="">
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text text-lg">Name</span>
                </label>
                <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" />
            </div>
        </div>
    )
}

export default Name;