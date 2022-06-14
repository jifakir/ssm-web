import React, { useCallback, useEffect } from 'react';
import GoogleButton from 'react-google-button'
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';
import { useSignupMutation, useLoginMutation, useGoogleLoginMutation } from '../../store/api/ssmApi';
import { GoogleLogin } from 'react-google-login';
import Button from '../UI/Button';
import TextInput from '../UI/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../store/reducers/authReducer';
import { useRouter } from 'next/router';
import Link from 'next/link';


const Login = ({open, setOpen, redirectTo}) => {

    const [showPass, setShowPass] = React.useState(false);
    const [tab, setTab] = React.useState(0);
    const { isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { register, reset, handleSubmit, watch, formState: {errors}} = useForm();
    const [login, { data, isError, isSuccess, isLoading, error }] = useLoginMutation();
    const [signup, { isLoading:signupLoading }] = useSignupMutation();
    const [googleLogin, result] = useGoogleLoginMutation();
    const router = useRouter();

    const responseGoogle = async (data) => {
        const {accessToken} = data;
        console.log(accessToken);
        await googleLogin({token: accessToken});
    };
    const onSubmitHandler = async (data) => {
        await login(data);
        reset();
    };

    const onSignupHandler = async (data) => {
        await signup(data);
    };

    const openHandler = () => {
        setOpen(!open);
    };


    useEffect(() => {
        if(isSuccess){
            dispatch(logIn({...data}));
            router.push(redirectTo);
        }
        if(isLoggedIn){
            setOpen(false);
        }
    },[isSuccess, data, isLoggedIn]);



    return (
        <div className={`${open ? 'block' : 'hidden'} fixed bottom-0 min-h-screen transition-all duration-500 ease-in-out top-0 left-0 z-50 bg-primary/60 w-full`}>
            <div className="overflow-y-scroll h-full w-full flex justify-center items-center">
            
            {
                isLoading && !isError ? (
                <div className="bg-white">
                    <div className="px-10 py-5">
                        <p className="text-center text-sm font-bold">
                            Thank you for creating your account!<br/>
                        </p>
                        <p className="mt-5">
                            You will now be redirected to<br/> complete our questionnaire.
                        </p>
                    </div>
                </div>
                ):(tab === 0) ? (
                    <form onSubmit={handleSubmit(onSubmitHandler)} className="my-10 rounded bg-white card w-[415px] shadow-lg px-8 py-5">
                        <div onClick={openHandler} className="absolute top-3 right-3 text-3xl font-bold cursor-pointer hover:text-error">
                            <MdOutlineClose />
                        </div>
                        <div className="card-body items-center text-center">
                            <GoogleLogin
                                    clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
                                    theme='dark'
                                    render={(renderProps) => (
                                        <GoogleButton 
                                            onClick={renderProps.onClick} 
                                            disabled={renderProps.disabled}
                                            label="LOGIN WITH GOOGLE" />
                                    )}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    className="rounded-lg cursor-pointer text-center"
                                    style={{padding: '16px'}}
                                />
                            <div className="mt-3">
                                <h1 className="text-2xl font-medium">or</h1>
                            </div>
                            <div className={isError ? 'block' : 'hidden'}>
                                {
                                    isError && <p className="text-xs text-accent font-bold">{error.data?.message}</p>
                                }
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <TextInput 
                                    register={register} 
                                    errors={errors}
                                    data={{type: 'text', pHolder: 'startsayingmore@gmail.com', name: 'email', title: 'Email'}} />
                            </div>
                            <div className="relative form-control w-full max-w-xs">
                                <TextInput
                                    register={register} 
                                    errors={errors} 
                                    type={showPass ? 'text' : 'password'} 
                                    data={{ pHolder: 'Password', name: 'password', title: 'Password'}} />
                                <div 
                                    onClick={() => setShowPass(!showPass)} 
                                    className="absolute right-3 bottom-4 cursor-pointer">
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
                            <div className="text-sm mt-4">
                                <p className="">
                                    Do not have an account? 
                                    <span 
                                    onClick={()=> setTab(1)} 
                                    className="text-blue-700 font-bold cursor-pointer">Sign up</span></p>
                            </div>
                            <div className="text-xs">
                                <p className="">
                                    Donec id elit non mi porta gravida at eget metus. Fusce dapibus, 
                                    tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa
                                     justo sit amet risus. Etiam porta sem malesuada magna mollis euismod.
                                </p>
                            </div>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit(onSignupHandler)} className="my-10 rounded bg-white card w-[415px] shadow-lg px-8 py-5">
                        <div onClick={openHandler} className="absolute top-3 right-3 text-3xl font-bold cursor-pointer hover:text-error">
                            <MdOutlineClose />
                        </div>
                        <div className="card-body items-center text-center">
                            {/* <button className="w-full btn gap-2 bg-white text-black hover:bg-white/70 normal-case font-bold">
                                {/* <FcGoogle className='text-xl'/>
                                Signup with Google */}
                            {/* </button> */}
                            <GoogleLogin
                                    clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
                                    theme='dark'
                                    render={(renderProps) => (
                                        <GoogleButton 
                                            onClick={renderProps.onClick} 
                                            disabled={renderProps.disabled}
                                            label="SIGN UP GOOGLE" />
                                    )}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            <div className="mt-3">
                                <h1 className="text-2xl font-medium">or</h1>
                            </div>
                            <div className={`${isError ? 'block' : 'hidden'}`}>
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
                                <div onClick={() => setShowPass(!showPass)} className="absolute right-3 bottom-4 cursor-pointer">
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
                                    Already have an account? 
                                    <span 
                                    onClick={()=> setTab(2)} 
                                    className="text-blue-700 font-bold cursor-pointer pl-1">Login</span>
                                </p>
                                <p className="">
                                    Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod.
                                </p>
                            </div>
                        </div>
                    </form>
                )
            }
            </div>
        </div>
    )
}

export default Login;