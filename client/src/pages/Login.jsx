import React, { useEffect } from 'react'
import { Appbar, Navbar } from '../components/header'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../app/features/user/userSlice';
import { toast } from 'react-toastify'
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer/Footer';
import useAuthStatus from '../hooks/useAuthStatus';
import Spinner from '../components/Spinner';
import Home from '../pages/Home'
import { MdAccountCircle, MdLogin, MdVisibility, MdVisibilityOff } from 'react-icons/md';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const location = useLocation();
    const path = location.pathname.split('/');
    const {isLoggedIn, checkingStatus} = useAuthStatus();;

    const [formData, setFormData] = useState({
        email: '', 
        password: '',
    })

    const {email, password} = formData;

    const onChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }

    const dispatch = useDispatch();

    const { isLoading, isError, message, isSuccess }  = useSelector(state => state.user)

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    }

    // Toast and Spinner
    useEffect(() => {
        if(isError) {
            toast.error(message.toUpperCase());
        }

        if(isSuccess) {
            toast.success('Successfully Logged In');
            navigate('/shop');
        }

    }, [isError, isSuccess]);

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/signup')
    }

    if(checkingStatus) {
        return <Spinner />
    }

    if(isLoggedIn) {
        return <Home />
    }

  return (
    <>
        <Appbar />
        <Navbar />

        <Breadcrumb path={path} />

        <form className='grid max-w-[400px] mx-auto gap-4 px-4 md:px-0' onSubmit={onSubmit}> 
            
            <h2 className='mb-3'>New Here?  <a href='/signup' className='underline text-primary'>Signup!</a></h2>

            <div className='flex flex-col gap-2'>
                <label className='text-xs '>Email</label>
                <input className='input rounded-sm' name='email' value={email} onChange={onChange} />
            </div>

            <div className='flex flex-col gap-2 relative'>
                <label className='text-xs '>Password</label>
                <input className='input rounded-sm' type={!showPassword ? 'password' : 'text'} name='password' value={password} onChange={onChange} />
                <span className='absolute bottom-0 right-[10px] cursor-pointer text-fill hover:text-[#000]' onClick={e => {setShowPassword(prev => !prev); e.preventDefault()}}>{
                    showPassword ? <MdVisibility className='text-md' /> :
                    <MdVisibilityOff className='text-md' />
                }</span>
            </div>

            <button className='bg-orange py-3 mt-3 relative flex items-center gap-2 justify-center' type='submit'>
                <MdLogin />
                Log in {isLoading && '...'}
            </button>

            <h2 className='mb-3'>New Here? </h2>

            <button onClick={handleClick} className='bg-white border-primary flex items-center gap-2 justify-center border mb-5 py-3 text-primary mt-3'>
                <MdAccountCircle /> Sign up
            </button>            

        </form>
        <Footer />
    </>
  )
}

export default Login