import React from 'react';
import Link from 'next/link'
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineClose } from 'react-icons/md';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import Button from '../../components/UI/Button';
import TextInput from '../../components/UI/TextInput';
import { useLoginQuery, useSignupMutation } from '../../store/api/ssmApi';
import { logIn } from '../../store/reducers/authReducer';
import { useDispatch } from 'react-redux';



const Form = ({ setSubmitted }) => {

    const [showPass, setShowPass] = React.useState(false);
    const dispatch = useDispatch();
    const { register, reset, handleSubmit, formState: {errors}} = useForm();

    const [signup, { data, isError, isSuccess, isLoading, error }] = useSignupMutation();

    const onSubmitHandler = async (data) => {
        await signup(data);
    }

    const responseGoogle = (response) => {
        console.log(response);
      }


    React.useEffect(() => {
        
        if(isError){
            reset({
                password: ''
            })
        }
        if(isSuccess){
            setSubmitted(true);
            reset();
        }

    },[isError, isSuccess, reset, setSubmitted, data]);

    if(isLoading) return <p className="">Loading...</p>

    return (
        <div className="w-full min-h-full flex justify-center items-center">
            
            <form onSubmit={handleSubmit(onSubmitHandler)} className="my-10 rounded bg-white card w-[415px] shadow-lg px-8 py-5">
                <div className="absolute top-3 right-3 text-3xl font-bold cursor-pointer hover:text-error">
                    <MdOutlineClose />
                </div>
                <div className="card-body items-center text-center">
                    {/* <button className="w-full btn gap-2 bg-white text-black hover:bg-white/70 normal-case font-bold">
                        {/* <FcGoogle className='text-xl'/>
                        Signup with Google */}
                    {/* </button> */}
                    <GoogleLogin
                            clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
                            buttonText="Signup with google"
                            theme='dark'
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            className="w-full rounded-lg cursor-pointer text-center bg-blue-500"
                        />
                    <div className="mt-3">
                        <h1 className="text-2xl font-medium">or</h1>
                    </div>
                    <div className="">
                        {
                            isError && <p className="text-xs text-accent font-bold">{error.data?.message}</p>
                        }
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <TextInput register={register} errors={errors} data={{type: 'text', pHolder: 'Full Name', name: 'full_name', title: 'Name'}} />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <TextInput register={register} errors={errors} data={{type: 'text', pHolder: 'startsayingmore@gmail.com', name: 'email', title: 'Email'}} />
                    </div>
                    <div className="relative form-control w-full max-w-xs">
                        <TextInput register={register} errors={errors} type={showPass ? 'text' : 'password'} data={{ pHolder: 'Password', name: 'password', title: 'Password'}} />
                        <div onClick={() => setShowPass(!showPass)} className="absolute right-3 bottom-5 cursor-pointer">
                            {
                                showPass ? <BsEye /> : <BsEyeSlash />
                            }
                        </div>
                    </div>
                    <div className="w-full card-actions pt-5">
                    <button 
                                type='submit'
                                    className={`
                                        w-full
                                        bg-secondary
                                        text-2xl
                                        tracking-[0.055em]
                                        text-primary
                                        py-1
                                        hover:bg-secondary/50 
                                        active:bg-neutral-focus
                                        rounded
                                        gap-2
                                        px-5
                                        md:px-8
                                        font-semibold
                                        disabled:bg-[#C0C0C0]
                                        disabled:text-[#3E3643]
                                        disabled:cursor-not-allowed
                                        uppercase border-[3px]':
                                        `}>
                                            continue
                                        </button>
                    </div>
                    {/* <div className="text-sm">
                        <p className="">Do not have an account? <a className="text-blue-700 font-bold cursor-pointer">Sign up</a></p>
                    </div> */}
                    <div className="text-xs mt-5">
                        <p className="font-medium mb-2">
                            Already have an account? <Link href={'/login'}><a className="text-blue-700 font-bold cursor-pointer">Log in</a></Link>
                        </p>
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