import React, { useEffect } from 'react'
import Footer from '../components/Footer/Footer'
import { Appbar, Navbar } from '../components/header'
import Hero from '../components/Hero'
import useAuthStatus from '../hooks/useAuthStatus'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner';
import Home from './Home';

const LandingPage = () => {

  const {isLoggedIn, checkingStatus} = useAuthStatus();

  if(checkingStatus) {
    return <Spinner />
  }

  if(isLoggedIn) {
    return <Home />
  }
  
  return (
    <>
        <Appbar />
        <Navbar />
        <Hero />
        <Footer />
    </>
  )
}

export default LandingPage