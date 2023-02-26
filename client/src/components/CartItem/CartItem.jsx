import React from 'react'
import { MdClose, MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../../app/features/cart/cartSlice';

const CartItem = ({item}) => {
  const {id, name, qty, price, imageUrl, category, desc} = item;

  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(deleteItem(id))
  }

  return (
    <section className='flex flex-col sm:flex-row px-5 relative items-center border-b py-2 gap-3 sm:mx-auto border-[#bec2bf] max-w-[1000px] sm:w-full min-w-[300px] '>
      <div className='flex-[0.2]'>
        <img src={imageUrl} className='max-h-full sm:rounded-sm rounded-[1rem] h-[200px] sm:h-[100px] sm:w-[100px] object-cover' alt={desc} />
      </div>
      <div className='flex-[0.3]'>
        <h1>{name.length > 15 ? name.slice(0, 12) + '...' : name}</h1>
        <p className='font-[300]'>{desc.length > 15 ? desc.slice(0, 12) + '...' : desc}</p>
        <p className='font-[300]'>{category}</p>
      </div>
      <div className='flex-1 sm:ml-auto justify-around flex gap-3'>
        <p className='text-[#2f67eb]'>$ {price}</p>  
        <p>{qty}</p>
        <p className='text-[#2f67eb]'>$ {price *  qty}</p>
      </div>
      <button className='bg-orange hover:scale-105 sm:absolute top-[5px] right-[20px] h-6 w-6 grid place-content-center rounded-[50%] cursor-pointer' 
          onClick={() => handleClick(id)}>
        <MdDelete />
      </button>
    </section>
  )
}

export default CartItem