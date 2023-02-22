import React, { useEffect } from 'react'
import {Appbar, Navbar} from '../components/header'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, reset } from '../app/features/products/productSlice';
import Card from '../components/Card';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';

const Home = () => {
  
  const dispatch = useDispatch();

  const {products, isError, isSuccess, isLoading, message} = useSelector(state => state.product);

  console.log(products);

  useEffect(() => {
    dispatch(reset());
    if(isLoading) {
      return (
        <Spinner />
      )
    }
  }, [])
  
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div>
      <Appbar />
      <Navbar />
      
      <Layout>
        {
          products.map(({_id, name, description, price, imageUrl}) => (
            <Card key={_id} name={name} price={price} desc={description} imageUrl={imageUrl} />
          ))
        }
      </Layout>

    </div>
  )
}

export default Home