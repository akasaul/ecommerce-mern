import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Appbar, Navbar } from '../components/header'
import Footer from '../components/Footer/Footer';
import { MdAccountCircle, MdAddBusiness, MdEmail, MdExpandLess, MdExpandMore, MdLogout } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {getMe, logout} from '../app/features/user/userSlice';
import Spinner from '../components/Spinner'
import ProfileCard from '../components/ProfileCard';
import BreadCrumb from '../components/Breadcrumb';

const ProfileMe = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  
  useEffect(() => {
    dispatch(getMe())
  }, []);
  
  const {user: {user, products}, isLoading, isSuccess} = useSelector(state => state.user);

  const [showAll, setShowAll] = useState(products?.length < 3);

  if(isLoading) {
    return <Spinner />
  }

  const onClick = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <Appbar /> 
      <Navbar />
      <BreadCrumb path={pathname.split('/').slice(0, 3)} />

      <section className='min-h-[50vh] max-w-[500px] mx-auto'>
  
        <div className='bg-accent gap-5 shadow-lg pt-5 rounded-[10px] flex mt-9 p-5 flex-col items-center'>
       
          <p className='flex justify-end w-full'> 
            <button onClick={onClick} className='flex items-center gap-2 hover:bg-orange p-2 px-4 rounded-sm border border-primary'>Logout <MdLogout /> </button>
          </p>
       
          <h1 className='mt-5 text-md text-secondary'>Me</h1>
       
          <div className='h-[50px] w-[50px] grid rounded-[50%] place-content-center bg-orange'>{user?.name?.slice(0, 1)}</div>
             <div className='mt-5'>
              <p className='font-thin flex items-center gap-3'><MdAccountCircle className='text-md' />{user?.name}</p>
              <a href={`mailto:${user?.email}`} className='font-thin flex items-center gap-3'><MdEmail className='text-md' /> {user?.email} </a>
            </div>

            {
              products?.length > 0 ? 
                <p>Your Products ({products?.length})</p> : 
                <p>You Haven't Posted Any Products</p>
            }

            <div className='w-full profile-grid grid gap-5' style={{
            }}>
              {
                showAll ?
                products?.map(({_id, name, description, price, imageUrl, category, rating}) => (
                  <ProfileCard key={_id} name={name} id={_id} price={price} category={category} desc={description} imageUrl={imageUrl} rating={rating} />
                )) : 
                products?.slice(0, 3).map(({_id, name, description, price, imageUrl, category, rating}) => (
                  <ProfileCard key={_id} name={name} id={_id} price={price} category={category} desc={description} imageUrl={imageUrl} rating={rating} />
                ))
              }
            </div>
            {
              products?.length > 3 &&
              <button className='p-2 px-4 border mt-5' onClick={() => setShowAll(prev => !prev)}>{!showAll ? <span className='flex items-center gap-2'>Show All <MdExpandMore /></span>  : <span className='flex items-center gap-2'>Show Less <MdExpandLess /></span>}</button>
            }

          <a href="/add-product" className='border px-4 p-2 flex items-center gap-2 hover:bg-orange transition-all duration-100'>Post Product <MdAddBusiness /> </a>

        </div> 
      </section>

      <Footer />

    </>
  )
}

export default ProfileMe