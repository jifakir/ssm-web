import React from 'react';



const Availability = () => {
    
    return (
        <div className="text-left text-sm flex gap-5">
            <div className="">
                <h1 className="text-lg my-2">Availability</h1>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start">
                        <input type="checkbox" name="orientation" className="checkbox checked:bg-primary" />
                        <span className="label-text pl-5">Monday</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start">
                        <input type="checkbox" name="orientation" className="checkbox checked:bg-primary" />
                        <span className="label-text justify-start pl-5">Tuesday</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start">
                        <input type="checkbox" name="orientation" className="checkbox checked:bg-primary" />
                        <span className="label-text justify-start pl-5">Wednesday</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start">
                        <input type="checkbox" name="orientation" className="checkbox checked:bg-primary" />
                        <span className="label-text justify-start pl-5">Thursday</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start">
                        <input type="checkbox" name="orientation" className="checkbox checked:bg-primary" />
                        <span className="label-text justify-start pl-5">Friday</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start">
                        <input type="checkbox" name="orientation" className="checkbox checked:bg-primary" />
                        <span className="label-text justify-start pl-5">Saturday</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start">
                        <input type="checkbox" name="orientation" className="checkbox checked:bg-primary" />
                        <span className="label-text justify-start pl-5">Sunday</span>
                    </label>
                </div>
            </div>
            <div className="mt-1">
                <h3 className="my-2">M-Start Time</h3>
                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>00:00 AM</option>
                    <option>01:00 PM</option>
                    <option>01:30 PM</option>
                    <option>02:00 PM</option>
                    <option>02:30 PM</option>
                    <option>03:00 PM</option>
                    <option>03:30 PM</option>
                    <option>04:00 PM</option>
                    <option>04:30 PM</option>
                    <option>05:00 PM</option>
                    <option>05:30 PM</option>
                    <option>06:00 PM</option>
                    <option>06:30 PM</option>
                </select>
            </div>
            <div className="mt-1">
                <h3 className="my-2">M-End Time</h3>
                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>11:59 PM</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>
            </div>
        </div>
    )
}

export default Availability;