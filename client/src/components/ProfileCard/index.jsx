import { MdAccountCircle, MdCollections, MdDescription, MdDetails, MdMore, MdOutlineFavorite, MdOutlineFavoriteBorder, MdOutlineShoppingCart, MdTitle } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFav } from '../../app/features/favs/favSlice'
import { addToCart } from '../../app/features/cart/cartSlice'
import useAuthStatus from '../../hooks/useAuthStatus'
import { toast } from 'react-toastify'
import { Rating } from 'react-simple-star-rating'

const Card = ({id, name, price, desc, imageUrl, category, favs, rating}) => {
  const [like, setLike] = useState(false);
  
  const isLoggedIn = useAuthStatus();

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.stopPropagation();
    if(isLoggedIn) {
      setLike(like => !like) 
      dispatch(toggleFav(id));
    } else {
      toast.error('Login to add to favorites')
    }
  }

  const handleAddToCart = (e, id, name, qty, price, imageUrl, category, desc) => {
    e.stopPropagation();
    const item = {id, name, qty, price, imageUrl, category, desc};

    dispatch(addToCart(item));
    toast.success(name + ' Successfully added to cart');
  }


  const navigate = useNavigate();

  return (
    <section className='shadow-md max-w-[400px] rounded-sm cursor-pointer hover:scale-105 duration-300 transition-transform relative'>
        
        <img className='h-[200px] w-full object-cover rounded-t-sm' src={imageUrl} alt={desc} />
        
        <div className='p-2 py-5 flex flex-col gap-3'>
            <a href={`/products/${id}`} className='text-xs underline capitalize text-primary'>{name?.length < 15 ? name : name?.slice(0, 15) + '...'}</a>
            <p className='text-xs md:hidden font-[300]'>description: {desc?.length < 25 ? desc : desc?.slice(0, 25) + '...'}</p>   
            <p className='text-xs hidden md:block font-[300]'>description: {desc?.length < 12 ? desc : desc?.slice(0, 12) + '...'}</p>   
            <p className="text-xs font-[300] flex items-center gap-2">Category: <MdCollections /> {category } </p>
        </div>

        <div className='flex items-center gap-2'>
          <Rating emptyStyle={{ display: "flex" }} initialValue={rating.length !== 0 ? rating.map(rate => rate.value).reduce((total, cur) => total + cur, 0) / rating.length : 0} size={20} fillStyle={{ display: "-webkit-inline-box" }} readonly={true} />
          <p className='flex items-center gap-2 font-thin'>({rating.length})</p>
        </div>

        <div className='flex items-center px-3 pb-4 justify-between'>
            <p className='text-[#0891b2]'>$ {price}</p>
        </div>      
    </section>
  )
}

export default Card