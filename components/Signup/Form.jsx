import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineClose } from 'react-icons/md';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { useForm } from 'react-hook-form';


const Form = ({ setSubmitted }) => {

    const [showPass, setShowPass] = React.useState(false);

    const { register, errors} = useForm();

    const onSubmitHandler = () => {

        setSubmitted(true);

    }

    return (
        <div className="w-full min-h-full flex justify-center items-center">
            <form className="card w-[415px] bg-neutral shadow-xl px-5 py-3">
                <div className="absolute top-3 right-3 text-3xl font-bold cursor-pointer hover:text-error">
                    <MdOutlineClose />
                </div>
                <div className="card-body items-center text-center">
                    <button className="w-full btn gap-2 bg-white text-black hover:bg-white/70 normal-case font-bold">
                        <FcGoogle className='text-xl'/>
                        Signup with Google
                    </button>
                    <div className="">
                        <h1 className="text-2xl font-bold">or</h1>
                    </div>
                    <div className="form-control w-full max-w-xs -mt-3">
                        <label className="label">
                            <span className="label-text text-lg">Name</span>
                        </label>
                        <input {...register('name', {required: true})} type="text" placeholder="Full Name" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-lg">Email</span>
                        </label>
                        <input {...register('email', {required: true})} type="email" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-lg">Password</span>
                        </label>
                        <label className="input-group">
                            <input {...register('password', {required: true})} type={`${showPass ? 'text' : 'password'}`} placeholder="Strong password" className="input input-bordered w-full max-w-xs" />
                            <button onClick={() => setShowPass(!showPass)} className="btn btn-square bg-white hover:bg-white/90 text-black focus:bg-white text-lg px-3 border-none">
                                {
                                    !showPass ? <BsEye /> : <BsEyeSlash/>
                                }
                            </button>
                        </label>
                    </div>
                    <div className="w-full card-actions pt-5">
                        <button className="w-full btn btn-primary">create account</button>
                    </div>
                    <div className="text-sm">
                        <p className="">Already have an account? <a className="text-blue-700 font-bold cursor-pointer">Log in</a></p>
                    </div>
                    <div className="text-xs">
                        <p className="">
                            Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod.
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form;