import React from 'react'
import { MdClear } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { clearCart } from '../app/features/cart/cartSlice'
import Breadcrumb from '../components/Breadcrumb'
import CartItem from '../components/CartItem/CartItem'
import { Navbar, Appbar } from '../components/header'

const Cart = () => {

    const {cart} = useSelector(state => state.cart);
    let path = useLocation();
    const dispatch = useDispatch();

    const totalPrice = cart.reduce((total, cur) => total + (cur.qty *  cur.price), 0);

    const removeAllItems = () => {
        dispatch(clearCart());
    }

  return (
    <>
        <Navbar />
        <Appbar />
        <Breadcrumb path={path.pathname.split('/')} />
        <div className='flex-col max-w-[1000px] mx-auto gap-5 mt-5'>
            <div className='hidden py-3 sm:flex  w-full px-5'>
                <p className='flex-[0.2]'>Products</p>
                <p className='flex-[0.3] text-end'>Price</p>
                <p className='flex-[0.3] text-end'>Quantity</p>
                <p className='flex-[0.3] text-center'>Total</p>
            </div>
            {
                cart.map((item) => (
                    <CartItem key={item.id} item={item}  />
                )
                )
            }

            <div className='sm:ml-5 flex flex-col items-center sm:items-start'>
                <p className='my-4 font-thin'>Total Price : <span className='font-bold'>$ {totalPrice}</span></p>
                <div className='flex items-center gap-3 flex-col sm:flex-row'>
                    <a href='/' className='font-thin hover:bg-orange transition-all duration-500 p-2 px-4 border border-fill rounded-sm'>Continue to Shopping</a>
                    <button className='font-thin flex items-center gap-2 hover:bg-orange transition-all duration-500 p-2 px-4 border border-fill rounded-sm'
                        onClick={removeAllItems}>
                        Clear Cart <MdClear />
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Cart