import React from 'react'
import { useState } from 'react';
import {MdShoppingBasket, MdExpandMore, MdSearch, MdAccountCircle, MdOutlineShoppingCart, MdMenu, MdQuestionAnswer, MdShop, MdFoodBank, MdPhoneAndroid, MdKitchen, MdChair, MdPages, MdList, MdExpandLess, MdArrowBack} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, getProducts } from '../../app/features/products/productSlice';
import { useLocation, useNavigate } from 'react-router-dom'
import useAuthStatus from '../../hooks/useAuthStatus';

const Navbar = () => {
    const [show, setShow] = useState(false);
    const [showCategoryDesktop, setShowCategoryDesktop] = useState(false);
    const [showCategoryMobile, setShowCategoryMobile] = useState(false);
    const [keyword, setKeyword] = useState('');
    const {isLoggedIn} = useAuthStatus();

    const isAuth = useAuthStatus();
    const {cart} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const onClickDesktop = async (e) => {
        const category = e.target.textContent.toLowerCase().trim();
        await dispatch(getProducts());
        dispatch(getCategory(category));
        setShowCategoryDesktop(false);
    }

    const onClickMobile = async (e) => {
        const category = e.target.textContent.toLowerCase().trim();
        await dispatch(getProducts());
        dispatch(getCategory(category));
        setShowCategoryMobile(false);
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        navigate(`/search?keyword=${keyword}`);
    }

    const handleChange = (e) => {
        setKeyword(e.target.value);
    }

    return (
        
    <nav className='max-w-[1200px] border-b border-secondary overflow-hidden mx-auto h-16 flex justify-between px-4 items-center'>
        <a href={isLoggedIn ? '/shop' : '/'} className='flex flex-[0.2] items-center gap-3 text-md text-primary'>
            <MdShoppingBasket />
            Niko's
        </a>


        {/* Desktop Menu  */}
        <ul className="center flex-[0.4] hidden md:flex items-center gap-4">
            <li className='relative'>
                <button className='flex items-end gap-1' onClick={() => setShowCategoryDesktop(prev => !prev)}>
                    Categories
                    {
                        showCategoryDesktop ? 
                        <MdExpandLess /> : 
                        <MdExpandMore />
                    }
                </button>
                {
                    showCategoryDesktop &&
                    <div className='absolute z-[10] top-[45px] flex flex-col bg-white w-[200px] p-2'>
                        <button className='border-b border-secondary p-2 flex items-center justify-between hover:bg-secondary hover:text-white text-start' onClick={onClickDesktop}>Food <MdFoodBank /> </button>
                        <button className='border-b border-secondary p-2 flex items-center justify-between hover:bg-secondary hover:text-white text-start' onClick={onClickDesktop}>Cloth <MdShop /></button>
                        <button className='border-b border-secondary p-2 flex items-center justify-between hover:bg-secondary hover:text-white text-start' onClick={onClickDesktop}>Electronics <MdPhoneAndroid /></button>
                        <button className='border-b border-secondary p-2 flex items-center justify-between hover:bg-secondary hover:text-white text-start' onClick={onClickDesktop}>Instrument <MdKitchen /></button>
                        <button className='border-b border-secondary p-2 flex items-center justify-between hover:bg-secondary hover:text-white text-start' onClick={onClickDesktop}>Furniture <MdChair /></button>
                        <button className='border-b border-secondary p-2 flex items-center justify-between hover:bg-secondary hover:text-white text-start' onClick={onClickDesktop}>Other <MdPages /></button>
                        <a href='/' className=' p-2 flex items-center justify-between hover:bg-secondary hover:text-white text-start'>All <MdList /></a>
                    </div>
                }
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

        <div className="right flex-[0.5] hidden md:flex items-center gap-4">

            <form onSubmit={onSubmit} className='bg-accent flex items-center px-2 rounded-[2rem]'>
                <input placeholder='Search Product' className='outline-none p-2 bg-accent max-w-[110px]' value={keyword} onChange={handleChange} />
                <MdSearch className='text-md mr-2' />
            </form>

            <ul className='flex items-center gap-4'>

                <li>
                    <a href='/profile/me' className='flex items-center gap-2'>
                        <MdAccountCircle className='text-md' /> Account
                    </a>
                </li>

                <li className='relative'>
                    <a href='/cart' className='flex items-center gap-2'>
                        <MdOutlineShoppingCart className='text-md' /> Cart
                    </a>
                    <span className='absolute top-[-10px] left-[10px] bg-orange text-white h-[20px] rounded-[50%] w-[20px] place-content-center grid'>{cart.length}</span>
                </li>

            </ul>

        </div>

        <button className='text-md md:hidden' onClick={() => setShow(true)}>
            <MdMenu />
        </button>


        {/* Mobile Menu  */}

        <ul className={`absolute bg-white flex flex-col gap-2 px-3 w-[250px] md:hidden top-0 bottom-0 py-5 z-10 right-0 translate-x-[500px] transition-transform duration-[0.5s] ${show && 'translate-x-[50px]'}`}>
            <button className='self-start' onClick={() => setShow(false)}>
                <MdArrowBack /> 
            </button>

            <li>
                <button className='flex items-end gap-1 py-2' onClick={() => setShowCategoryMobile(prev => !prev)}>
                    Categories
                    {
                        showCategoryMobile ? 
                        <MdExpandLess /> : 
                        <MdExpandMore /> 
                    }
                </button>
                {
                    showCategoryMobile &&
                    <div className='flex flex-col bg-white w-[200px] p-2'>
                        <button className='border-b border-secondary p-2 flex items-center justify-between hover:bg-secondary hover:text-white text-start' onClick={onClickMobile}>Food <MdFoodBank /> </button>
                        <button className='border-b border-secondary p-2 flex items-center justify-between hover:bg-secondary hover:text-white text-start' onClick={onClickMobile}>Cloth <MdShop /></button>
                        <button className='border-b border-secondary p-2 flex items-center justify-between hover:bg-secondary hover:text-white text-start' onClick={onClickMobile}>Electronics <MdPhoneAndroid /></button>
                        <button className='border-b border-secondary p-2 flex items-center justify-between hover:bg-secondary hover:text-white text-start' onClick={onClickMobile}>Instrument <MdKitchen /></button>
                        <button className='border-b border-secondary p-2 flex items-center justify-between hover:bg-secondary hover:text-white text-start' onClick={onClickMobile}>Furniture <MdChair /></button>
                        <button className='border-b border-secondary p-2 flex items-center justify-between hover:bg-secondary hover:text-white text-start' onClick={onClickMobile}>Other <MdPages /></button>
                        <a href='/' className=' p-2 flex items-center justify-between hover:bg-secondary hover:text-white text-start'>All <MdList /></a>
                    </div>
                }
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
                <a href='/profile/me' className='flex items-center gap-1 py-2'>
                    <MdAccountCircle className='text-md' /> Account
                </a>
            </li>

            <li>
                <form onSubmit={onSubmit} className='bg-accent flex items-center px-2 rounded-[2rem]'>
                    <input placeholder='Search Product' className='outline-none p-2 text-[12px] bg-accent max-w-[100px]' value={keyword} onChange={handleChange} />
                    <MdSearch className='text-md mr-2' />
                </form>
            </li>
            
            <li className='relative'>
                <a href='/cart' className='flex items-center gap-1'>
                    <MdOutlineShoppingCart className='text-md' /> Cart
                </a>
                <span className='absolute top-[-10px] left-[10px] bg-orange text-white h-[20px] rounded-[50%] w-[20px] place-content-center grid'>{cart.length}</span>
            </li>

        </ul>
    </nav>
  )
}

export default Navbar