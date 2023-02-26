import React from 'react'
import { useLocation, useSearchParams} from 'react-router-dom'
import CartInfo from '../components/CartInfo';
import {Navbar, Appbar} from '../components/header';
import BreadCrumb from '../components/Breadcrumb';

const Payment = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {pathname} = useLocation();

    const total = searchParams.get('total');
    const totalWithTax = searchParams.get('withvat');

    return (
        <>
            <Navbar />
            <BreadCrumb path={pathname.split('/').slice(0, 3)} />
            <div className='flex mt-24 justify-between flex-col sm:flex-row p-4 max-w-[1000px] mx-auto'>
                <div className='flex  flex-col gap-3 font-thin'>
                    <p className='font-[500]'>Pay with: </p>
                    <div className='pl-5'>
                        <input type="radio" name="payment" /> PayPal

                    </div>

                    <div className='pl-5'>
                        <input type="radio" name="payment" /> Credit Card
                    </div>

                </div>
                <CartInfo total={Number(total)} totalWithTax={Number(totalWithTax)} payment={true} />
            </div>
        </>
  )
}

export default Payment