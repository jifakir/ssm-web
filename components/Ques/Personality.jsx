import React from 'react';



const Personality = () => {
    return (
        <div className="">
            <h1 className="text-left text-lg my-5">Share your Myers-Brigg Personality Type aspects</h1>
            <div className="flex text-sm gap-5">
                <div className="">
                    <h3 className="text-sm">Mind(select one)</h3>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="orientation" className="radio checked:bg-primary" />
                            <span className="label-text pl-2">Introvert</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="orientation" className="radio checked:bg-primary" />
                            <span className="label-text justify-start pl-2">Extrovert</span>
                        </label>
                    </div>
                </div>
                <div className="">
                    <h3 className="text-sm">Energy(select one)</h3>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="orientation" className="radio checked:bg-primary" />
                            <span className="label-text pl-2">Observant</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="orientation" className="radio checked:bg-primary" />
                            <span className="label-text justify-start pl-2">Thinking</span>
                        </label>
                    </div>
                </div>
                <div className="">
                    <h3 className="text-sm">Nature(select one)</h3>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="orientation" className="radio checked:bg-primary" />
                            <span className="label-text pl-2">Feeling</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="orientation" className="radio checked:bg-primary" />
                            <span className="label-text justify-start pl-2">Thinking</span>
                        </label>
                    </div>
                </div>
                <div className="">
                    <h3 className="text-sm">Tactics(select one)</h3>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="orientation" className="radio checked:bg-primary" />
                            <span className="label-text pl-2">Judging</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="orientation" className="radio checked:bg-primary" />
                            <span className="label-text justify-start pl-2">Prospecting</span>
                        </label>
                    </div>
                </div>
                <div className="">
                    <h3 className="text-sm">Identity(select one)</h3>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="orientation" className="radio checked:bg-primary" />
                            <span className="label-text pl-2">Assertive</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="orientation" className="radio checked:bg-primary" />
                            <span className="label-text justify-start pl-2">Turbulent</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Personality;