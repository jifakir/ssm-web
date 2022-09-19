import React, { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';
import { useSignupMutation, useLoginMutation, useGoogleLoginMutation } from '../../store/api/ssmApi';
import { GoogleLogin } from 'react-google-login';
import TextInput from '../UI/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../store/reducers/authReducer';
import { useRouter } from 'next/router';
import Therapist from './Therapist';

const Login = ({open, setOpen, redirectTo}) => {

    const [showPass, setShowPass] = React.useState(false);
    const [tab, setTab] = React.useState(0);
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
        reset();
    };

    const openHandler = () => {
        setOpen(!open);
        reset();
    };

    const tabHandler = (num) => {
        setTab(num);
        reset();
    };

    useEffect(() => {
        
        if(isSuccess){
            reset();
            const { token, user } = data;
            dispatch(logIn({ token, ...user }));
            router.push(redirectTo);
        }
        // eslint-disable-next-line 
    },[isSuccess]);

    useEffect(()=> {
        if(signupSuccess){
            dispatch(logIn({...signupData}));
            if(redirectTo==='/therapist/profile'){
                router.push('/therapist')
            }else{
                router.push(redirectTo);
            }
        }
        // eslint-disable-next-line 
    },[signupSuccess]);

    useEffect(()=> {
        if(isLoggedIn){
            setOpen(false);
        }
        // eslint-disable-next-line 
    },[isLoggedIn])
    
    return (
        <div className={`${open ? 'block' : 'hidden'} sm:fixed bottom-0 sm:h-screen sm:min-h-screen transition-all duration-500 ease-in-out top-0 left-0 z-50 bg-primary/60 w-full`}>
            <div className="overflow-y-scroll h-full w-full flex justify-center items-center">
            {
                (isLoading && !isError) &&
                <div className="bg-white">
                    <div className="px-10 py-5">
                        <p className="text-center text-sm font-bold">
                            Thank you for logging!<br/>
                        </p>
                        <p className="mt-5 text-center">
                            You will now be redirected to<br/>
                            {
                                redirectTo === '/therapist/profile' ? 
                                'your profile':
                                'complete our questionnaire.'
                            }
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
                                You will now be redirected to<br/> complete our questionnaire.
                            </p>
                        </div>
                    </div>
            }

            {
                (tab === 0 && !isLoading) ? 
                <div className=""><Therapist showSignup /></div> : 
                (tab === 1 && !signupLoading) ?
                (
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
                                    clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
                                    theme='dark'
                                    render={(renderProps) => (
                                        <GoogleButton 
                                            onClick={renderProps.onClick}
                                            label="SIGN UP GOOGLE" />
                                    )}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
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
                                    <TextInput
                                        control={control}
                                        pHolder={'startsayingmore'}
                                        name={'full_name'}
                                        title={'Name'}
                                        rules={{ required: 'Name is required' }}
                                        />
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <TextInput
                                        control={control}
                                        pHolder={'startsayingmore@gmail.com'}
                                        name={'email'}
                                        title={'Email'}
                                        rules={{
                                            required: 'Email is required', 
                                            pattern: {
                                                value:  /^\S+@\S+$/i,
                                                message: 'Please, enter a valid email'
                                            }}}
                                        />
                                </div>
                                <div className="relative form-control w-full max-w-xs">
                                    <TextInput
                                        type={showPass ? 'text' : 'password'}
                                        pHolder="Password"
                                        title={'Password'}
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
                                        className="absolute right-3 top-16 cursor-pointer">
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
                                <p className="">
                                    Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : 
                ''
            }
            </div>
        </div>
    )
}

export default Login;