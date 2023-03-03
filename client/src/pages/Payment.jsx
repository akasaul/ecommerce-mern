import React, { useState } from 'react'
import { useLocation, useSearchParams} from 'react-router-dom'
import CartInfo from '../components/CartInfo';
import {Navbar, Appbar} from '../components/header';
import BreadCrumb from '../components/Breadcrumb';
import Footer from '../components/Footer/Footer';
import { useSelector } from 'react-redux';

const Payment = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selected, setSelected] = useState(false);
    const {pathname} = useLocation();
    const {cart} = useSelector(state => state.cart);

    const total = cart.reduce((total, cur) => total + (cur.qty *  cur.price), 0);
    const totalWithTax = total + total * 0.15;

    return (
        <>
            <Appbar />
            <Navbar />
            <BreadCrumb path={pathname.split('/').slice(0, 3)} />

            <div className='flex mt-24 min-h-[70vh] justify-between flex-col sm:flex-row p-4 max-w-[1000px] mx-auto'>
                <div className='flex  flex-col gap-3 font-thin'>
                    <p className='font-[500]'>Pay with: </p>
                    <div className='pl-5'>
                        <input type="radio" name="payment" onChange={() => setSelected(true)} /> PayPal
                    </div>

                    <div className='pl-5'>
                        <input type="radio" name="payment" onChange={() => setSelected(true)} /> Credit Card
                    </div>

                </div>
                {
                    selected &&
                    <CartInfo total={Number(total)} totalWithTax={Number(totalWithTax)} payment={true} />

                }


            </div>

            <Footer />
        </>
  )
}

export default Payment