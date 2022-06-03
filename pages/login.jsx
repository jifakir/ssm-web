import React from 'react';
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';
import { useSignupMutation, useLoginMutation, useGoogleLoginMutation } from '../store/api/ssmApi';
import { GoogleLogin } from 'react-google-login';
import Button from '../components/UI/Button';
import TextInput from '../components/UI/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../store/reducers/authReducer';
import { useRouter } from 'next/router';
import Link from 'next/link';


const Login = () => {

    const [showPass, setShowPass] = React.useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { register, reset, handleSubmit, watch, formState: {errors}} = useForm();
    const [login, { data, isError, isSuccess, isLoading, error }] = useLoginMutation();
    const [googleLogin, result] = useGoogleLoginMutation();
    const router = useRouter();
    const responseGoogle = async (data) => {
        const {accessToken} = data;
        console.log(accessToken);
        await googleLogin({token: accessToken});
    };
    console.log("Google Login: ", result);
    const onSubmitHandler = async (data) => {
        await login(data);
        reset();
    };

    if(isLoggedIn){
        router.push('/therapist/questionnaire');
    }

    if(isLoading){
        return (
            <div className="">
                Brave Facebook
            </div>
        )
    }

    if(isSuccess){
        console.log(data);
        dispatch(logIn(data));
        router.push('/therapist/questionnaire');
    }

    return (
        <div className="w-full flex justify-center items-center">
            
            <form onSubmit={handleSubmit(onSubmitHandler)} className="my-10 card w-[415px] shadow-lg px-5 py-3">
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
                            buttonText="Login with Google"
                            // render={renderProps => (
                            //     <button onClick={renderProps.onClick} style={{backgroundColor: 'blue'}}>This is my custom Google button</button>
                            //   )}
                            theme='dark'
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            className="w-full rounded-lg cursor-pointer text-center"
                        />
                    <div className="">
                        <h1 className="text-2xl mt-5 font-medium">or</h1>
                    </div>
                    <div className="">
                        {
                            isError && <p className="text-xs text-accent font-bold">{error.data?.message}</p>
                        }
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
                        <Button title={'Continue'} className="btn-secondary text-2xl w-full" />
                    </div>
                    <div className="text-sm mt-4">
                        <p className="">Do not have an account? <Link href={'/signup'}><a className="text-blue-700 font-bold cursor-pointer">Sign up</a></Link></p>
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

export default Login;