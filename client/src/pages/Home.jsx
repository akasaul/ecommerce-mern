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

  const isAuth = useAuthStatus();

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
      <Appbar />
      <Navbar />
       {
        isLoading && <Spinner />
       }
      
      <Layout>
        {
          products.map(({_id, name, description, price, imageUrl, category}) => (
            <Card key={_id} name={name} favs={favs} id={_id} price={price} category={category} desc={description} imageUrl={imageUrl} />
          ))
        }
      </Layout>

    </div>
  )
}

export default Home