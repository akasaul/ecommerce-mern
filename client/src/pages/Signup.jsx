import React, { useRef } from 'react'
import { Appbar, Navbar } from '../components/header'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../app/features/user/userSlice';
import { toast } from 'react-toastify'
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer/Footer';
import useAuthStatus from '../hooks/useAuthStatus';
import Spinner from '../components/Spinner';
import Home from '../pages/Home'
import { MdAccountCircle, MdLogin, MdVisibility, MdVisibilityOff } from 'react-icons/md';


const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const location = useLocation();
    const path = location.pathname.split('/');

    const [formData, setFormData] = useState({
        name: '',
        email: '', 
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData;

    const onChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }

    const {isLoggedIn, checkingStatus} = useAuthStatus();
    const navigate = useNavigate();
    

    const dispatch = useDispatch();

    const { isLoading, isError, message, isSuccess }  = useSelector(state => state.user)

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(formData));
    }

     // Toast and Spinner
     useEffect(() => {
        if(isError) {
            toast.error(message.toUpperCase());
        }

        if(isSuccess) {
            toast.success('Successfully Signed up');
            navigate('/shop');
        }

    }, [isError, isSuccess, isLoading]);


    const handleClick = (e) => {
        e.preventDefault();
        navigate('/login')
    }

    if(isLoggedIn) {
        return <Home />
    }

    if(checkingStatus) {
        return <Spinner />
    }

    
  return (
    <>
        <Appbar />
        <Navbar />

        <Breadcrumb path={path} />
        
        <form className='grid max-w-[400px] mx-auto gap-4 px-4 md:px-0' onSubmit={onSubmit}> 
            
            <h2 className='mb-3'>Already a client?  <a href='/login' className='underline text-primary'>Login!</a></h2>

            <div className='flex flex-col gap-2'>
                <label className='text-xs '>Name</label>
                <input className='input rounded-sm' name='name' value={name} onChange={onChange} />
            </div>

            <div className='flex flex-col gap-2'>
                <label className='text-xs '>Email</label>
                <input className='input rounded-sm' name='email' value={email} onChange={onChange} />
            </div>

            <div className='flex flex-col gap-2 relative'>
                <label className='text-xs '>Password</label>
                <input className='input rounded-sm' type={!showPassword ? 'password' : 'text'} name='password' value={password} onChange={onChange} />
                <button className='absolute bottom-0 right-[10px] text-fill hover:text-[#000]' onClick={(e) => {setShowPassword(prev => !prev); e.preventDefault() }}>{showPassword ? <MdVisibility className='text-[20px] text-secondary' /> : <MdVisibilityOff className='text-[20px] text-secondary' />}</button>
            </div>

            <div className='flex flex-col gap-2 relative'>
                <label className='text-xs '>Confirm Password</label>
                <input className='input rounded-sm' type={!showConfirmPassword ? 'password' : 'text'} value={password2} name='password2' onChange={onChange} />
                <button className='absolute bottom-0 right-[10px] text-fill hover:text-[#000]' onClick={(e) => {setShowConfirmPassword(prev => !prev); e.preventDefault() }}>{showConfirmPassword ? <MdVisibility className='text-[20px] text-secondary' /> : <MdVisibilityOff className='text-[20px] text-secondary' />}</button>
            </div>

            <button className='bg-orange flex items-center gap-2 justify-center py-3 mt-3' type='submit'>
                <MdAccountCircle />
                Sign up {isLoading && '...'}
            </button>

            <h2 className='mb-3'>Already a client? </h2>

            <button onClick={handleClick} className='bg-white border-primary flex items-center gap-2 justify-center border mb-5 py-3 text-primary mt-3'>
                <MdLogin />
                Log in
            </button>    

        </form>
        
        <Footer />        
    </>
  )
}

export default Signup