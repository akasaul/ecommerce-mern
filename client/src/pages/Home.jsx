import React, { useEffect } from 'react'
import {Appbar, Navbar} from '../components/header'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, reset } from '../app/features/products/productSlice';
import Card from '../components/Card';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import useAuthStatus from '../hooks/useAuthStatus';
import { favSelector, getFavs } from '../app/features/favs/favSlice';

const Home = () => {

  const dispatch = useDispatch();

  const {products, isError, isSuccess, isLoading, message} = useSelector(state => state.product);

  useEffect(() => {
    dispatch(reset());
  }, [])
  
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getFavs());
  }, []);

  const favs = useSelector(favSelector);

  return (
    <div>
      <Navbar />
      <Appbar />
       {
        isLoading && <Spinner />
       }
       
        <Layout>
          {
            products.length > 0 ? 
            products.map(({_id, name, description, price, imageUrl, category}) => (
              <Card key={_id} name={name} favs={favs} id={_id} price={price} category={category} desc={description} imageUrl={imageUrl} />
            )) : 
            <div className='grid place-content-center'>
              <img src="/33.png" className='max-h-[300px]' alt="" />
              <h2 className='text-center font-thin'>Not Items Found in this category</h2>
              <a href='/' className='bg-orange text-center p-2 px-4 my-4 rounded-sm'>Back Home</a>
            </div>
          }
        </Layout>
        
      </div>
  )
}

export default Home