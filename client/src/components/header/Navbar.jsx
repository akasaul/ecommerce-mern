import React from 'react'
import { useState } from 'react';
import {MdShoppingBasket, MdExpandMore, MdSearch, MdAccountCircle, MdOutlineShoppingCart, MdMenu, MdClose, MdQuestionAnswer, MdShop} from 'react-icons/md'
import useAuthStatus from '../../hooks/useAuthStatus';

const Navbar = () => {
    const [show, setShow] = useState(false);
    const isAuth = useAuthStatus();

    return (
        
    <div className='max-w-[1200px] border-b border-secondary  mx-auto h-16 flex justify-between px-4 items-center'>
        <a href='/' className='flex flex-[0.2] items-center gap-3 text-md text-primary'>
            <MdShoppingBasket />
            Gebeya
        </a>

        <ul className="center flex-[0.4] hidden md:flex items-center gap-4">
            <li>
                <a href="/categories" className='flex items-end gap-1'>
                    Categories
                    <MdExpandMore />
                </a>
            </li>
            <li className='flex items-end gap-1'>
                <a href="/shop" className='flex items-end gap-1'>
                    Shop
                </a>
            </li>
            <li className='flex items-end gap-1'>
                <a href="/new" className='flex items-end gap-1'>
                    What's New
                </a>
            </li>
        </ul>

        <div className="right flex-[0.4] hidden md:flex items-center gap-4">

            <div className='bg-accent flex items-center px-2 rounded-[2rem]'>
                <input placeholder='Search Product' className='outline-none p-2 bg-accent max-w-[100px]' />
                <MdSearch className='text-md mr-2' />
            </div>

            <ul className='flex items-center gap-4'>

                <li>
                    <a href={isAuth ? '/profile' : '/signup'} className='flex items-center gap-2'>
                        <MdAccountCircle className='text-md' /> Account
                    </a>
                </li>

                <li>
                    <a href='/cart' className='flex items-center gap-2'>
                        <MdOutlineShoppingCart className='text-md' /> Cart
                    </a>
                </li>

            </ul>

        </div>

        <button className='text-md md:hidden' onClick={() => setShow(true)}>
            <MdMenu />
        </button>

        <ul className={`absolute bg-white flex flex-col gap-2 px-3 w-[250px] md:hidden top-0 bottom-0 py-5 z-10 right-0 translate-x-[500px] transition-transform duration-[0.5s] ${show && 'translate-x-[50px]'}`}>
            
            <button className='self-start' onClick={() => setShow(false)}>
                <MdClose /> 
            </button>

            <li>
                <a href='#' className='flex items-end gap-1 py-2'>
                    Categories
                    <MdExpandMore />
                </a>
            </li>

            <li>
                <a href='#' className='flex items-end gap-1 py-2'>
                    <MdShop className='text-md' /> Shop
                </a>
            </li>

            <li>
                <a href='#' className='flex items-end gap-1 py-2'>
                    <MdQuestionAnswer className='text-md' /> What's New
                </a>    
            </li>

            <li>
                <a href={isAuth ? '/profile' : '/signup'} className='flex items-center gap-1 py-2'>
                    <MdAccountCircle className='text-md' /> Account
                </a>
            </li>
            
            <li>
                <a href='#' className='flex items-center gap-1'>
                    <MdOutlineShoppingCart className='text-md' /> Cart
                </a>
            </li>

        </ul>
    </div>
  )
}

export default Navbar