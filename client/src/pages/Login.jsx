import React from 'react'
import { Appbar, Navbar } from '../components/header'
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../app/features/user/userSlice';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const location = useLocation();
    const path = location.pathname.split('/');

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

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    }

  return (
    <>
        <Appbar />
        <Navbar />

        <div className='bg-secondary text-white text-center p-2 mb-6'>
            {path.map((link, index) => (index === 0 ? <a href='/' key={index}>Home</a>  : <a href={`/${link}`} key={index}>{' > ' + link}</a> ))}
        </div>

        <form className='grid max-w-[400px] mx-auto gap-4' onSubmit={onSubmit}> 
            
            <h2 className='mb-3'>New Here?  <a href='/signup' className='underline text-primary'>Signup!</a></h2>

            <div className='flex flex-col gap-2'>
                <label className='text-xs '>Email</label>
                <input className='input rounded-sm' name='email' value={email} onChange={onChange} />
            </div>

            <div className='flex flex-col gap-2 relative'>
                <label className='text-xs '>Password</label>
                <input className='input rounded-sm' type={!showPassword ? 'password' : 'text'} name='password' value={password} onChange={onChange} />
                <button className='absolute bottom-0 right-[10px] text-fill hover:text-[#000]' onMouseDown={() => setShowPassword(true)} onMouseUp={() => setShowPassword(false)}>SEE</button>
            </div>

            <button className='bg-orange py-3 mt-3' type='submit'>
                Log in
            </button>

            <h2 className='mb-3'>New Here? </h2>

            <button className='bg-white border-primary border mb-5 py-3 text-primary mt-3'>
                Sign up
            </button>            

        </form>
    </>
  )
}

export default Login