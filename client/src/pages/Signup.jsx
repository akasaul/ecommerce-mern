import React from 'react'
import { Appbar, Navbar } from '../components/header'
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../app/features/user/userSlice';

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

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(formData));
    }

  return (
    <>
        <Appbar />
        <Navbar />

        <div className='bg-secondary text-white text-center p-2 mb-6'>
            {path.map((link, index) => (index === 0 ? <a href='/' key={index}>Home</a>  : <a href={`/${link}`} key={index}>{' > ' + link}</a> ))}
        </div>

        <form className='grid max-w-[400px] mx-auto gap-4' onSubmit={onSubmit}> 
            
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
                <button className='absolute bottom-0 right-[10px] text-fill hover:text-[#000]' onMouseDown={() => setShowPassword(true)} onMouseUp={() => setShowPassword(false)}>SEE</button>
            </div>

            <div className='flex flex-col gap-2 relative'>
                <label className='text-xs '>ConfirmPassword</label>
                <input className='input rounded-sm' type={!showConfirmPassword ? 'password' : 'text'} value={password2} name='password2' onChange={onChange} />
                <button className='absolute bottom-0 right-[10px] text-fill hover:text-[#000]' onMouseDown={() => setShowConfirmPassword(true)} onMouseUp={() => setShowConfirmPassword(false)}>SEE</button>
            </div>

            <button className='bg-orange py-3 mt-3' type='submit'>
                Sign up
            </button>

            <h2 className='mb-3'>Already a client? </h2>

            <button className='bg-white border-primary border mb-5 py-3 text-primary mt-3'>
                Log in
            </button>            

        </form>
    </>
  )
}

export default Signup