import React from 'react'
import {  MdClear } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { clearCart } from '../app/features/cart/cartSlice'
import Breadcrumb from '../components/Breadcrumb'
import CartItem from '../components/CartItem/CartItem'
import { Navbar, Appbar } from '../components/header'
import CartInfo from '../components/CartInfo';

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
        <div className='flex-col max-w-[1200px] mx-auto gap-5 mt-5'>

            <section className='flex flex-col sm:flex-row'>
                <div className='sm:flex-[0.75]'>
                    {
                        totalPrice > 0 &&
                        <div className='md:flex px-5 hidden'>
                            <p className='flex-[0.6]'>Products</p>
                            <p className='flex-[0.2] text-center'>Price</p>
                            <p className='flex-[0.1] text-center px-1'>Quantity</p>
                            <p className='flex-[0.1] text-center'>Total</p>
                        </div>
                    }
                    {
                        cart.length > 0 ?
                        cart.map((item) => (
                            <CartItem key={item.id} item={item}  />
                        )
                        ) : 
                        <div className='h-[300px] w-full overflow-hidden m-3'
                            style={{
                                background: `url('https://img.freepik.com/free-vector/online-shopping-concept-landing-page_23-2148250587.jpg?w=740&t=st=1677429623~exp=1677430223~hmac=14fef701948fee35e5ded21179e96c76ea2664bc0313d16fd52eab4c462761c3')`,
                                backgroundPosition: 'center center  '
                            }}>
                        </div>
                    }
                </div>

            <CartInfo total={totalPrice} totalWithTax={totalPrice *+ 0.15} />

            </section>

            <section className='sm:ml-5 flex flex-col items-center sm:items-start'>
                <p className='my-4 font-thin'>Total Price : <span className='font-bold'>$ {totalPrice}</span></p>
                <div className='flex items-center gap-3 flex-col sm:flex-row'>
                    <a href='/' className='font-thin hover:bg-orange transition-all duration-500 p-2 px-4 border border-fill rounded-sm'>Continue to Shopping</a> 
                    <button className='font-thin flex items-center gap-2 hover:bg-orange transition-all duration-500 p-2 px-4 border border-fill rounded-sm'
                        onClick={removeAllItems}>
                        Clear Cart <MdClear />
                    </button>
                </div>
            </section>
            
        </div>
    </>
  )
}

export default Cart