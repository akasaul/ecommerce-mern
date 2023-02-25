import { MdCollections, MdDescription, MdDetails, MdMore, MdOutlineFavorite, MdOutlineFavoriteBorder, MdOutlineShoppingCart, MdTitle } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Card = ({id, name, price, desc, imageUrl, category}) => {
  const [like, setLike] = useState(false);

  const handleClick = (e) => {
    setLike(like => !like)
    e.stopPropagation();
  }

  const handleAddToCart = (e) => {
    e.stopPropagation();
  }

  const navigate = useNavigate();

  return (
    <section className='shadow-md rounded-sm cursor-pointer hover:scale-110 duration-300 transition-transform relative' onClick={(e) => {navigate(`/products/${id}`); e.stopPropagation()} }>
        
        <img className='h-[200px] w-full object-cover rounded-t-sm' src={imageUrl} alt={desc} />

        <button className='bg-white shadow-lg absolute h-10 w-10 text-[20px] grid place-content-center rounded-[50%] right-[20px] top-[185px] hover:scale-110' 
            onClick={handleClick}>
          {
            like ? <MdOutlineFavorite className='text-orange' /> : 
              <MdOutlineFavoriteBorder /> 
          }
        </button>
        
        <div className='p-2 py-5 flex flex-col gap-3'>
            <a href={`/products/${id}`} className='text-xs underline capitalize text-primary'>{name?.length < 15 ? name : name?.slice(0, 15) + '...'}</a>
            <p className='text-xs font-[300]'>description: {desc?.length < 25 ? desc : desc?.slice(0, 25) + '...'}</p>   
            <p className="text-xs font-[300] flex items-center gap-2">Category: <MdCollections /> {category } </p>
        </div>
               
        <div className='flex items-center px-3 pb-4 justify-between'>
            <p className='text-[#0891b2]'>$ {price}</p>
            <a href='/cart/sth' className='bg-orange grid place-content-center h-[40px] rounded-sm w-[40px]' onClick={handleAddToCart}>
                <MdOutlineShoppingCart className='text-[20px]' />
            </a>
        </div>      
    </section>
  )
}

export default Card