import React from 'react';



const Availability = ({register, errors, watch, trigger, step, setStep}) => {
    

    const handleNext = async () => {

        const trig = await trigger(['availability','start_time','end_time']);
        console.log("Availability",trig);
        if(!trig) return;

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };


    return (
        <div className="">
        <div className="text-left text-sm flex gap-5">
            <div className="">
                <h1 className="text-lg my-2">Availability</h1>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start">
                        <input {...register('availability', {required: true})} type="checkbox"  className={`checkbox ${errors.availability ? 'checkbox-accent' : 'checked:checkbox-primary'}`} />
                        <span className="label-text pl-5">Monday</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start">
                        <input {...register('availability', {required: true})} type="checkbox"  className={`checkbox ${errors.availability ? 'checkbox-accent' : 'checked:checkbox-primary'}`} />
                        <span className="label-text justify-start pl-5">Tuesday</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start">
                        <input {...register('availability', {required: true})} type="checkbox"  className={`checkbox ${errors.availability ? 'checkbox-accent' : 'checked:checkbox-primary'}`} />
                        <span className="label-text justify-start pl-5">Wednesday</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start">
                        <input {...register('availability', {required: true})} type="checkbox"  className={`checkbox ${errors.availability ? 'checkbox-accent' : 'checked:checkbox-primary'}`} />
                        <span className="label-text justify-start pl-5">Thursday</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start">
                        <input {...register('availability', {required: true})} type="checkbox"  className={`checkbox ${errors.availability ? 'checkbox-accent' : 'checked:checkbox-primary'}`} />
                        <span className="label-text justify-start pl-5">Friday</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start">
                        <input {...register('availability', {required: true})} type="checkbox"  className={`checkbox ${errors.availability ? 'checkbox-accent' : 'checked:checkbox-primary'}`} />
                        <span className="label-text justify-start pl-5">Saturday</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start">
                        <input {...register('availability', {required: true})} type="checkbox"  className={`checkbox ${errors.availability ? 'checkbox-accent' : 'checked:checkbox-primary'}`} />
                        <span className="label-text justify-start pl-5">Sunday</span>
                    </label>
                </div>
            </div>
            <div className="mt-1">
                <h3 className="my-2">M-Start Time</h3>
                <select {...register('start_time', {required: true})} defaultValue={null}  className={`select select-bordered w-full max-w-xs ${errors.start_time && 'select-primary'}`}>
                    <option value={null}>00:00 AM</option>
                    <option value={'1:00pm'}>01:00 PM</option>
                    <option value={'1:30pm'}>01:30 PM</option>
                    <option value={'2:00pm'}>02:00 PM</option>
                    <option value={'2:30pm'}>02:30 PM</option>
                    <option value={'3:00pm'}>03:00 PM</option>
                    <option value={'3:30pm'}>03:30 PM</option>
                    <option value={'4:00pm'}>04:00 PM</option>
                    <option value={'4:30pm'}>04:30 PM</option>
                    <option value={'5:00pm'}>05:00 PM</option>
                    <option value={'5:30pm'}>05:30 PM</option>
                    <option value={'6:00pm'}>06:00 PM</option>
                    <option value={'6:30pm'}>06:30 PM</option>
                </select>
            </div>
            <div className="mt-1">
                <h3 className="my-2">M-End Time</h3>
                <select {...register('end_time', {required: true})} defaultValue={null}  className={`select select-bordered w-full max-w-xs ${errors.end_time && 'select-primary'}`}>
                    <option value={null}>00:00 AM</option>
                    <option value={'1:00pm'}>01:00 PM</option>
                    <option value={'1:30pm'}>01:30 PM</option>
                    <option value={'2:00pm'}>02:00 PM</option>
                    <option value={'2:30pm'}>02:30 PM</option>
                    <option value={'3:00pm'}>03:00 PM</option>
                    <option value={'3:30pm'}>03:30 PM</option>
                    <option value={'4:00pm'}>04:00 PM</option>
                    <option value={'4:30pm'}>04:30 PM</option>
                    <option value={'5:00pm'}>05:00 PM</option>
                    <option value={'5:30pm'}>05:30 PM</option>
                    <option value={'6:00pm'}>06:00 PM</option>
                    <option value={'6:30pm'}>06:30 PM</option>
                </select>
            </div>
            
        </div>
        <div className={`flex gap-5 py-5`}>
                <button onClick={handleBack} className={`btn btn-outline btn-primary`}>
                    Back
                </button>
                <button onClick={handleNext} type="submit" className={`btn text-white ${!watch().availability || watch().availability.length === 0 || !watch().start_time || !watch().end_time ? 'bg-gray-400' : 'btn-primary'}`} >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default Availability;