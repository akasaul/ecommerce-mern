import React from 'react'
import { useState } from 'react';
import {MdShoppingBasket, MdExpandMore, MdSearch, MdAccountCircle, MdOutlineShoppingCart, MdMenu, MdClose, MdQuestionAnswer, MdShop} from 'react-icons/md'

const Navbar = () => {
    const [show, setShow] = useState(false);

    return (
    <div className='max-w-[1200px] mx-auto h-16 flex justify-between px-4 items-center'>
        <h2 className='flex flex-[0.2] items-center gap-3 text-md text-primary'>
            <MdShoppingBasket />
            Shopcart
        </h2>

        <div className="center flex-[0.4] hidden md:flex items-center gap-4">
            <span className='flex items-end gap-1'>
                Categories
                <MdExpandMore />
            </span>
            <span className='flex items-end gap-1'>
                Shop
            </span>
            <span className='flex items-end gap-1'>
                What's New
            </span>
        </div>

        <div className="right flex-[0.4] hidden md:flex items-center gap-4">

            <div className='bg-accent flex items-center px-2 rounded-[2rem]'>
                <input placeholder='Search Product' className='outline-none p-2 bg-accent max-w-[100px]' />
                <MdSearch className='text-md mr-2' />
            </div>

            <div className='flex items-center gap-4'>
                <p className='flex items-center gap-2'>
                    <MdAccountCircle className='text-md' /> Account
                </p>
                <p className='flex items-center gap-2'>
                    <MdOutlineShoppingCart className='text-md' /> Cart
                </p>
            </div>

        </div>

        <button className='text-md md:hidden' onClick={() => setShow(true)}>
            <MdMenu />
        </button>

        <div className={`absolute bg-white flex flex-col gap-2 px-3 w-[250px] md:hidden top-0 bottom-0 py-5 z-10 right-0 translate-x-[500px] transition-transform duration-[0.5s] ${show && 'translate-x-[0px]'}`}>
            
            <button className='self-start' onClick={() => setShow(false)}>
                <MdClose /> 
            </button>

            <a href='#' className='flex items-end gap-1 py-2'>
                Categories
                <MdExpandMore />
            </a>
            <a href='#' className='flex items-end gap-1 py-2'>
                <MdShop className='text-md' /> Shop
            </a>
            <a href='#' className='flex items-end gap-1 py-2'>
                <MdQuestionAnswer className='text-md' /> What's New
            </a>
            <a href='/signup' className='flex items-center gap-1 py-2'>
                <MdAccountCircle className='text-md' /> Account
            </a>
            <a href='#' className='flex items-center gap-1'>
                <MdOutlineShoppingCart className='text-md' /> Cart
            </a>

        </div>
    </div>
  )
}

export default Navbar