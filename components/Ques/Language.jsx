import React from 'react';



const Language = () => {
    
    return (
        <div className="text-left text-sm">
            <h1 className="my-2 text-lg">Select all languages that apply</h1>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="checkbox" name="orientation" className="checkbox checked:checkbox-primary" />
                    <span className="label-text pl-2">Spanish</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="checkbox" name="orientation" className="checkbox checked:checkbox-primary" />
                    <span className="label-text justify-start pl-2">French</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="checkbox" name="orientation" className="checkbox checked:checkbox-primary" />
                    <span className="label-text justify-start pl-2">Kreyol</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="checkbox" name="orientation" className="checkbox checked:checkbox-primary" />
                    <span className="label-text justify-start pl-2">Yoruba</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="checkbox" name="orientation" className="checkbox checked:checkbox-primary" />
                    <span className="label-text justify-start pl-2">Igbo</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="checkbox" name="orientation" className="checkbox checked:checkbox-primary" />
                    <span className="label-text justify-start pl-2">Other</span>
                    <input type="text" placeholder='Input language' className="input focus:outline-none border" />
                </label>
            </div>
        </div>
    )
}

export default Language;