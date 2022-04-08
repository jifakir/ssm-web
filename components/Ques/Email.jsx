import React from 'react';



const Email = () => {
    return (
        <div className="">
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text text-lg">Email</span>
                </label>
                <input type="email" placeholder="Email" className="input input-bordered w-full max-w-xs" />
            </div>
        </div>
    )
}

export default Email;