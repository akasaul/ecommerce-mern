import React from 'react'
import {Appbar, Navbar} from '../components/header'
import { useLocation } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Appbar />
      <Navbar />
    </div>
  )
}

export default Home