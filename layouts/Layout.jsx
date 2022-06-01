import Image from 'next/image';
import Link from 'next/link';
import TextInput from '../components/UI/TextInput';
import RadioInput from '../components/UI/Radio';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useForm } from 'react-hook-form';
import Button from '../components/UI/Button';
import Checkbox from '../components/UI/Checkbox';



const Layout = ({children}) => {

    const auth = useSelector(state => state);

    const { register, watch, formState: {errors}} = useForm();

    return (
        <div className="">
            <Header />
            <div className="">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;