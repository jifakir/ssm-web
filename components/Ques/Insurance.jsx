import React from 'react';



const Insurance = () => {
    
    return (
        <div className="text-sm text-left">
            <h1 className="text-lg my-2">Which insurance plans do you accept?</h1>
            <div className="flex gap-5">
                <select tabIndex={0} className="dropdown select select-bordered w-full max-w-xs text-sm">
                    <option disabled selected>Insurances E-H</option>
                    <option>
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start">
                                <input type="checkbox" name="orientation" className="checkbox checked:bg-primary" />
                                <span className="label-text pl-5">Empire Blue Cross</span>
                            </label>
                        </div>
                    </option>
                    <option>
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start">
                                <input type="checkbox" name="orientation" className="checkbox checked:bg-primary" />
                                <span className="label-text pl-5">E4 Health EAP</span>
                            </label>
                        </div>
                    </option>
                    <option>
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start">
                                <input type="checkbox" name="orientation" className="checkbox checked:bg-primary" />
                                <span className="label-text pl-5">Fidalis Care</span>
                            </label>
                        </div>
                    </option>
                    <option>
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start">
                                <input type="checkbox" name="orientation" className="checkbox checked:bg-primary" />
                                <span className="label-text pl-5">First Choice Health Network</span>
                            </label>
                        </div>
                    </option>
                </select>
            </div>
        </div>
    )
}

export default Insurance;