import React, { useEffect } from 'react'
import Footer from '../components/Footer/Footer'
import { Appbar, Navbar } from '../components/header'
import Hero from '../components/Hero'
import useAuthStatus from '../hooks/useAuthStatus'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const isLoggedIn = useAuthStatus();
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn &&
      navigate('/shop');
  }, [isLoggedIn]);
  
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