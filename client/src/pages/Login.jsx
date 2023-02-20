import React from 'react'
import { Appbar, Navbar } from '../components/header'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const path = location.pathname.split('/');


  return (
    <>
        <Appbar />
        <Navbar />

        <div className='bg-secondary text-white text-center p-2 mb-6'>
            {path.map((link, index) => (index === 0 ? 'Home ' : ' > ' + link ))}
        </div>


        <div className='grid max-w-[400px] mx-auto gap-4 mt-16'> 
            
            <h2 className='mb-3'>New here?  <a href='/signup' className='underline text-primary'>Signup!</a></h2>
            
            <div className='flex flex-col gap-2'>
                <label className='text-xs '>Email</label>
                <input className='input rounded-sm' />
            </div>

            <div className='flex flex-col gap-2 relative'>
                <label className='text-xs '>Password</label>
                <input className='input rounded-sm' type={!showPassword ? 'password' : 'text'} />
                <button className='absolute bottom-0 right-[10px] text-fill hover:text-[#000]' onClick={() => setShowPassword(prevState => !prevState)}>SEE</button>
            </div>

            <button className='bg-primary py-3 text-white mt-3'>
                Login
            </button>

            <h2 className='mb-3'>New Here? </h2>

            <button className='bg-white border-primary border mb-5 py-3 text-primary mt-3'>
                Sign up
            </button>            

        </div>
    </>
  )
}

export default Login