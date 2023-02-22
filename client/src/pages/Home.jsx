import React, { useEffect } from 'react'
import {Appbar, Navbar} from '../components/header'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, reset } from '../app/features/products/productSlice';


const Home = () => {
  
  const dispatch = useDispatch();

  const {products, isError, isSuccess, message} = useSelector(state => state.product);

  console.log(products);

  useEffect(() => {
    dispatch(reset());
  }, [])

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div>
      <Appbar />
      <Navbar />
    </div>
  )
}

export default Home