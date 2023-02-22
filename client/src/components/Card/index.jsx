import React from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'

const Card = ({name, price, desc, imageUrl}) => {
  return (
    <section className='shadow-md rounded-sm'>
        
        <img className='h-[250px] w-full object-cover rounded-t-sm' src={imageUrl} alt={desc} />
        
        <div className='p-2 py-5 flex flex-col gap-3'>
            <p className='text-xs'>{name}</p>
            <p className='text-xs'>{desc}</p>   
        </div>
               
        <div className='flex items-center px-3 pb-4 justify-between'>
            <p className='text-[#0891b2]'>$ {price}</p>
            <button className='bg-orange grid place-content-center h-[40px] rounded-sm w-[40px]'>
                <MdOutlineShoppingCart className='text-[20px]' />
            </button>
        </div>      
    </section>
  )
}

export default Card