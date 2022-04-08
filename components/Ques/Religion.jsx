import React from 'react';



const Orientation = () => {

    return (
        <div className="text-left text-sm">
            <h1 className="text-lg my-2">Which do you identify as?</h1>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" name="orientation" className="radio checked:bg-primary" />
                    <span className="label-text pl-2">Christianity</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" name="orientation" className="radio checked:bg-primary" />
                    <span className="label-text justify-start pl-2">Judaism</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" name="orientation" className="radio checked:bg-primary" />
                    <span className="label-text justify-start pl-2">Islam</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" name="orientation" className="radio checked:bg-primary" />
                    <span className="label-text justify-start pl-2">Hinduism</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" name="orientation" className="radio checked:bg-primary" />
                    <span className="label-text justify-start pl-2">Buddhism</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" name="orientation" className="radio checked:bg-primary" />
                    <span className="label-text justify-start pl-2">Atheist</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" name="orientation" className="radio checked:bg-primary" />
                    <span className="label-text justify-start pl-2">None</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" name="orientation" className="radio checked:bg-primary" />
                    <span className="label-text justify-start pl-2">Other</span>
                    <input type="text" placeholder='Input religious affiliataions' className="input focus:outline-none border" />
                </label>
            </div>
        </div>
    )
}

export default Orientation;