import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Appbar, Navbar } from '../components/header'
import Footer from '../components/Footer/Footer';
import { MdAccountCircle, MdEmail, MdExpandLess, MdExpandMore, MdLogout } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {getUser} from '../app/features/user/userSlice';
import Spinner from '../components/Spinner'
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';

const Profile = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];  

  useEffect(() => {
    dispatch(getUser(id))
  }, [id]);
  
  const {user: {products, user}, isLoading, isSuccess, isError} = useSelector(state => state.user);


  const [showAll, setShowAll] = useState(products?.length < 3);

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Appbar /> 
      <Navbar />

      <section className='min-h-[50vh] max-w-[500px] mx-auto'>
        <div className='bg-accent gap-5 shadow-lg pt-5 rounded-[10px] flex mt-9 p-5 flex-col items-center'>
          <h1 className='mt-5 text-md text-secondary'>Profile</h1>
          <div className='h-[50px] w-[50px] grid rounded-[50%] place-content-center border-2 border-primary bg-orange'>{user?.name?.slice(0, 1)}</div>
          
            <div className='mt-5'>
              <p className='font-thin flex items-center gap-3'><MdAccountCircle className='text-md' />{user?.name}</p>
              <a href={`mailto:${user?.email}`} className='font-thin flex items-center gap-3'><MdEmail className='text-md' /> {user?.email} </a>
            </div>

            <p>Posted Products ({products?.length})</p>

            <div className='w-full profile-grid grid gap-5' style={{
            }}>
              {
                showAll ?
                products?.map(({_id, name, description, price, imageUrl, category, rating}) => (
                  <Card key={_id} name={name} id={_id} price={price} category={category} desc={description} imageUrl={imageUrl} rating={rating} />
                )) : 
                products?.slice(0, 3).map(({_id, name, description, price, imageUrl, category, rating}) => (
                  <Card key={_id} name={name} id={_id} price={price} category={category} desc={description} imageUrl={imageUrl} rating={rating} />
                ))
              }
            </div>

            {
              products?.length > 3 &&
              <button className='p-2 px-4 border mt-5' onClick={() => setShowAll(prev => !prev)}>{!showAll ? <span className='flex items-center gap-2'>Show All <MdExpandMore /></span>  : <span className='flex items-center gap-2'>Show Less <MdExpandLess /></span>}</button>
            }

        </div>
      </section>

      <Footer />

    </>
  )
}

export default Profile