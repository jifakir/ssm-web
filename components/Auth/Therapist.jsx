import React, { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';
import { useSignupMutation, useLoginMutation, useGoogleLoginMutation } from '../../store/api/ssmApi';
import TextInput from '../UI/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../store/reducers/authReducer';
import { useRouter } from 'next/router';
import Modal from '../UI/Modal';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';


const Therapist = ({ showSignup, open, setOpen, defaultTab }) => {
    const [google, setGoogle] = React.useState(0);
    const [showPass, setShowPass] = React.useState(false);
    const [tab, setTab] = React.useState(defaultTab || 0 );
    const { isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { reset, control, handleSubmit } = useForm({
        defaultValues: {
            full_name: '',
            email: '',
            password: '',
        }
    });

    const [login, { data, isError, isSuccess, isLoading, error }] = useLoginMutation();
    const [signup, {data:signupData, isSuccess:signupSuccess, isLoading:signupLoading, isError:signupError, error:serror }] = useSignupMutation();
    const [googleLogin, { data:googleData, isSuccess:googleSuccess }] = useGoogleLoginMutation();
    const router = useRouter();


    const onSubmitHandler = async (data) => {
        await login(data);
        reset();
    };

    const onSignupHandler = async (data) => {
        await signup(data);
        reset();
    };

    const openHandler = () => {
        setOpen(false);
        setTab(0);
        reset();
    };

    const tabHandler = (num) => {
        setTab(num);
        reset();
    };

    const redirectHandler = () => {
        setOpen(false);
        router.push('/therapist');
    };

    useEffect(() => {
        
        if(isSuccess){
            reset();
            const { token, user } = data;
            dispatch(logIn({ token, ...user, role: 1 }));
            router.push("/therapist/profile");
        }

        // eslint-disable-next-line 
    },[isSuccess]);

    useEffect(()=> {
        if(signupSuccess){
            reset();
            const { user, token } = signupData;
            dispatch(logIn({ ...user, token, role: 1}));
            setOpen(false);
            router.push('/therapist/questionnaire');
        }
        // eslint-disable-next-line 
    },[signupSuccess]);

    useEffect(()=> {
        if(googleSuccess){
            const { user, token } = googleData;
            dispatch(logIn({ ...user, token, role: 2}));
            setOpen(false);
            if(google === 0){
                router.push('/patient/profile');
            }else{
                router.push('/patient/questionnaire');
            }
        }
        // eslint-disable-next-line 
    },[googleSuccess]);

    useEffect(()=> {
        if(isLoggedIn){
            setOpen(false);
        }
        // eslint-disable-next-line 
    },[isLoggedIn]);

    return (<Modal open={open}>
        {
            (isLoading && !isError) &&
            <div className="bg-white">
                <div className="px-10 py-5">
                    <p className="text-center text-sm font-bold">
                        Thank you for logging!<br/>
                    </p>
                    <p className="mt-5 text-center">
                        You will now be redirected to<br/>
                        your profile
                    </p>
                </div>
            </div> 
        }
        {
            (signupLoading && !signupError) &&
                <div className="bg-white">
                    <div className="px-10 py-5 text-center">
                        <p className="text-center text-sm font-bold">
                            Thank you for creating your account!<br/>
                        </p>
                        <p className="mt-5">
                            You will now be redirected to<br/> 
                            complete our questionnaire.
                        </p>
                    </div>
                </div>
        }
        {(tab === 0 && !isLoading) && (
            <form onSubmit={handleSubmit(onSubmitHandler)} className="sm:my-10 rounded-none sm:rounded bg-white card sm:w-[415px] shadow-lg px-8 py-5">
                <div onClick={openHandler} className="absolute top-3 right-3 text-3xl font-bold cursor-pointer hover:text-error">
                    <MdOutlineClose />
                </div>
                <div className="card-body items-center text-center">
                    <GoogleLogin
                            theme='filled_blue'
                            logo_alignment='left'
                            text='signin_with'
                            onSuccess={ async (res) => {
                                setGoogle(0);
                                await googleLogin({token: res.credential})
                            }}
                            onError={() => {
                            console.log('Login Failed');
                            }}
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
                        <h1 className="text-left pb-2">Email</h1>
                        <TextInput
                            control={control}
                            pHolder={'startsayingmore@gmail.com'}
                            name={'email'}
                            rules={{
                                required: 'Email is required', 
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Please, enter a valid email"
                                }}}
                            />
                    </div>
                    <div className="mt-6 relative form-control w-full max-w-xs">
                        <h1 className="text-left pb-2">Password</h1>
                        <TextInput
                            type={showPass ? 'text' : 'password'}
                            pHolder="Password"
                            name={'password'}
                            control={control}
                            rules={{
                                required: 'Password required', 
                                minLength: {
                                    value: 8,
                                    message: "Password must be 8 characters long"}}} />
                        <div 
                            onClick={() => setShowPass(!showPass)} 
                            className="absolute right-3 top-[52px] sm:top-[44px] cursor-pointer">
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
                        <p className="font-medium">
                            Don&apos;t have an account? 
                            <span 
                            onClick={()=> showSignup ? tabHandler(1) : redirectHandler()} 
                            className="text-blue-700 font-bold cursor-pointer pl-1">Sign up</span></p>
                    </div>
                </div>
            </form>
        )}

        {(tab === 1 && !signupLoading) && (
            <div  className="sm:my-10 sm:rounded bg-white card w-full sm:w-[415px] shadow-lg px-8 py-5">
                        <div onClick={openHandler} className="absolute top-3 right-3 text-3xl font-bold cursor-pointer hover:text-error">
                            <MdOutlineClose />
                        </div>
                        <div className="card-body items-center text-center">
                            {/* <button className="w-full btn gap-2 bg-white text-black hover:bg-white/70 normal-case font-bold">
                                {/* <FcGoogle className='text-xl'/>
                                Signup with Google */}
                            {/* </button> */}
                            <GoogleLogin
                                theme='filled_blue'
                                logo_alignment='left'
                                text='signup_with'
                                onSuccess={ async (res) => {
                                    setGoogle(0);
                                    await googleLogin({token: res.credential})
                                }}
                                onError={() => {
                                console.log('Login Failed');
                                }}
                            />
                            <div className="mt-3">
                                <h1 className="text-2xl font-medium">or</h1>
                            </div>
                            <div className={`${signupError ? 'block' : 'hidden'}`}>
                                {
                                    signupError && <p className="text-xs text-accent font-bold">{serror.data?.message}</p>
                                }
                            </div>
                            <form onSubmit={handleSubmit(onSignupHandler)}>
                                <div className="form-control w-full max-w-xs">
                                    <h1 className="text-left pb-2">Name</h1>
                                    <TextInput
                                        control={control}
                                        pHolder={'startsayingmore'}
                                        name={'full_name'}
                                        rules={{ required: 'Name is required' }}
                                        />
                                </div>
                                <div className="mt-6 form-control w-full max-w-xs">
                                    <h1 className="text-left pb-2">Email</h1>
                                    <TextInput
                                        control={control}
                                        pHolder={'startsayingmore@gmail.com'}
                                        name={'email'}
                                        rules={{
                                            required: 'Email is required', 
                                            pattern: {
                                                value:  /^\S+@\S+$/i,
                                                message: 'Please, enter a valid email'
                                            }}}
                                        />
                                </div>
                                <div className="mt-6 relative form-control w-full max-w-xs">
                                    <h1 className="text-left pb-2">Password</h1>
                                    <TextInput
                                        type={showPass ? 'text' : 'password'}
                                        pHolder="Password"
                                        name={'password'}
                                        control={control}
                                        rules={{
                                            required: 'Password required', 
                                            minLength: {
                                                value: 8,
                                                message: "Password must be 8 characters long"}
                                            }} />
                                    <div 
                                        onClick={() => setShowPass(!showPass)} 
                                        className="absolute right-3 top-[44px] cursor-pointer">
                                        {
                                            showPass ? <BsEye /> : <BsEyeSlash />
                                        }
                                    </div>
                                </div>
                                <div className="w-full card-actions pt-6">
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
                            </form>
                            {/* <div className="text-sm">
                                <p className="">Do not have an account? <a className="text-blue-700 font-bold cursor-pointer">Sign up</a></p>
                            </div> */}
                            <div className="text-xs mt-5">
                                <p className="text-sm font-medium mb-2">
                                    Already have an account? 
                                    <span 
                                    onClick={()=> tabHandler(0)}
                                    className="text-blue-700 font-bold cursor-pointer pl-1">Login</span>
                                </p>
                            </div>
                        </div>
                    </div>
        )}
    </Modal>
    )
}

export default Therapist;