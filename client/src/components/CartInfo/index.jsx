import React from 'react'
import { MdAddCircle } from 'react-icons/md'
import { Link } from 'react-router-dom'

const index = ({total, totalWithTax, payment}) => {
  return (
    <div className='p-6 mt-6 sm:mt-0 flex flex-col gap-4 h-[300px] justify-center font-thin flex-[0.3] bg-[#F0F0F0]'>
    <div className='flex justify-between min-w-[250px]'>
        <p>Subtotal</p>
        <p>${total.toFixed(2)}</p>
    </div>
    
    <div className='flex justify-between min-w-[250px]'>
        <p>VAT included</p>
        <p>$ {totalWithTax.toFixed(2)}</p>
    </div>

    <p className='flex items-center gap-2'>Add Promo code
        <MdAddCircle />
    </p>    
    
    <div className='flex items-center justify-between'>
        <h2 className='font-[500] text-md'>Total</h2>
        <h2 className='font-[500] text-md'>$ {(total + totalWithTax).toFixed(2)}</h2>
    </div>

    <div className='flex items-center justify-between'>You Save <p>0.00</p> </div>
    {
        total === 0  ?
        <></> : 
        payment ? 
        <Link to={`/cart/payment/finish`} className='bg-orange p-2 font-[500]'>Finish Payment</Link> : 
        <Link to={`/cart/payment`} className='bg-orange p-2 font-[500]'>Continue to Payment</Link> 
    }
</div>

  )
}

export default index