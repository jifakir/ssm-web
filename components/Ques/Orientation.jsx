import React from 'react';



const Orientation = () => {

    return (
        <div className="text-left">
            <h1 className="">Which do you identify as?</h1>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" name="orientation" className="radio checked:bg-primary" />
                    <span className="label-text pl-5">Straight</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" name="orientation" className="radio checked:bg-primary" />
                    <span className="label-text justify-start pl-5">Lesbian</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" name="orientation" className="radio checked:bg-primary" />
                    <span className="label-text justify-start pl-5">Gay</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" name="orientation" className="radio checked:bg-primary" />
                    <span className="label-text justify-start pl-5">Bi-Sexual</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" name="orientation" className="radio checked:bg-primary" />
                    <span className="label-text justify-start pl-5">Assexual</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" name="orientation" className="radio checked:bg-primary" />
                    <span className="label-text justify-start pl-5">Pansexual</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="radio" name="orientation" className="radio checked:bg-primary" />
                    <span className="label-text justify-start pl-5">Prefer not to answer</span>
                </label>
            </div>
        </div>
    )
}

export default Orientation;