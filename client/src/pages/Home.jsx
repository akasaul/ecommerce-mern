import React, { useEffect, useState } from 'react'
import {Appbar, Navbar} from '../components/header'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, reset } from '../app/features/products/productSlice';
import Card from '../components/Card';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import { favSelector, getFavs } from '../app/features/favs/favSlice';
import { MdOutlineFavoriteBorder, MdOutlineFormatListNumberedRtl, MdOutlineShoppingCart, MdShoppingCart, MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import Footer from '../components/Footer/Footer';

const Home = () => {

  const dispatch = useDispatch();

  const {products, isError, isSuccess, isLoading, message} = useSelector(state => state.product);
  const {cart} = useSelector(state => state.cart)

  const [priceRange, setPriceRange] = useState(0);
  const [inCart, setInCart] = useState(false);
  const [liked, setLiked] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(reset());
  }, [])
  
  useEffect(() => {
    dispatch(getProducts(page));
    dispatch(getFavs());
  }, [page]);

  const favs = useSelector(favSelector);


  const paginateForward = () => {
    setPage(prev => prev + 1)
  }
  
  const paginateBackward = () => {
    setPage(prev => prev - 1)
  }

  return (
    <>

      <Appbar />
      <Navbar />

      {/* Filter        */}

      <section className='max-w-[1000px] flex-col sm:flex-row font-thin flex items-center justify-center gap-3 bg-accent p-2 px-5 mt-3 mx-auto'>
   
        <div className='flex items-center gap-3'>
          <p className='flex items-center gap-1'>Filters <MdOutlineFormatListNumberedRtl /> </p>
          <p>Price</p>
          <input type="range" name="price" value={priceRange} onChange={e => setPriceRange(e.target.value)} id="priceRange" min={0} step={50} max={1000} className='text-orange' />
          &lt; {priceRange}
        </div>
       
        <div className='flex items-center gap-3'>
          <p className='flex items-center gap-1'>In Cart <MdOutlineShoppingCart /> </p>
          <input type="checkbox" name="incart" value={inCart} onChange={() => setInCart(prev => !prev)} />
          <p className='flex items-center gap-1'>Liked <MdOutlineFavoriteBorder /> </p>
          <input type="checkbox" name="liked" value={liked} onChange={() => setLiked(prev => !prev)} />
        </div>
    
      </section>
      
       {
        isLoading ? <Spinner />
        :
        <Layout>
         
          {
            products.length > 0 &&
            products.filter(({_id, name, description, price, imageUrl, category}) => {
              return priceRange < price && 
                      (inCart ? cart?.map(item => item.id)?.includes(_id) : true) &&
                      (liked ? favs?.includes(_id) : true) 
            }).length > 0 ? 

            products.filter(({_id, name, description, price, imageUrl, category}) => {
              return priceRange < price && 
                      (inCart ? cart?.map(item => item.id)?.includes(_id) : true) &&
                      (liked ? favs?.includes(_id) : true) 
            })
            .map(({_id, name, description, price, imageUrl, category, rating}) => (
              <Card key={_id} name={name} favs={favs} id={_id} price={price} category={category} desc={description} imageUrl={imageUrl} rating={rating} />
            )) : 
            !isLoading &&
            <div className='grid place-content-center'>
              <img src="/33.png" className='max-h-[300px]' alt="" />
              <h2 className='text-center font-thin'>Not Items Found</h2>
              <a href='/' className='bg-orange text-center p-2 px-4 my-4 rounded-sm'>Back Home</a>
            </div>
          }
        
        </Layout>

       }


        <div className='max-w-[300px] mt-9 items-center justify-around mx-auto flex '>
          <button onClick={paginateBackward} disabled={page < 2} className='flex items-center gap-2 border border-primary p-2 px-4 hover:bg-primary hover:text-white'><MdSkipPrevious /> Prev </button>
          <button className='flex items-center gap-2'> {page} </button>
          <button onClick={paginateForward} disabled={products.length === 0} className='flex items-center gap-2 border border-primary p-2 px-4 hover:bg-primary hover:text-white'>Next <MdSkipNext /></button>
        </div>

        <Footer />

      </>
  )
}

export default Home