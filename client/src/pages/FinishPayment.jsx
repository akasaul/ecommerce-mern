import React, { useEffect, useState } from 'react'
import { Appbar, Navbar } from '../components/header'
import BreadCrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import { MdCheck, MdHome } from 'react-icons/md';
import { AiFillGithub } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { clearCart } from '../app/features/cart/cartSlice';
import Footer from '../components/Footer/Footer';

const FinishPayment = () => {
    const {pathname} = useLocation();

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(clearCart());    
    }, [])

  return (
    <>
        <Navbar />
        <BreadCrumb path={pathname.split('/')} />
        <section className='h-[70vh] justify-center flex flex-col gap-5 items-center'>
            <div className='h-[100px] w-[100px] border grid place-content-center rounded-[50%] text-orange'>
                <MdCheck className='text-xl text-[#72D0A1]' />
            </div>
            <h1 className='sm:text-lg text-md text-center'>Confirmed Purchase</h1>
            <a href='/' className='bg-orange p-2 px-4 flex items-center gap-2'>Go to homepage <MdHome /></a>
            <p>or</p>
            <a href='https://github.com/akasaul' className='border p-2 px-4 flex hover:bg-fill hover:text-white items-center gap-2'>Visit Code in Github<AiFillGithub /> </a>
        </section>
        <Footer />
    </>
  )
}

export default FinishPayment