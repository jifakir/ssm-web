import React from 'react';



const OtherLang = () => {
    return (
        <div className="text-left text-sm">
            <h1 className="text-lg my-2">Do you speak other languages?</h1>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" name="orientation" className="radio checked:bg-primary" />
                    <span className="label-text pl-2">Yes</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" name="orientation" className="radio checked:bg-primary" />
                    <span className="label-text justify-start pl-2">No</span>
                </label>
            </div>
        </div>
    )
}

export default OtherLang;