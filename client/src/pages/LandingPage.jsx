import React, { useEffect } from 'react'
import Footer from '../components/Footer/Footer'
import { Appbar, Navbar } from '../components/header'
import Hero from '../components/Hero'
import useAuthStatus from '../hooks/useAuthStatus'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  
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