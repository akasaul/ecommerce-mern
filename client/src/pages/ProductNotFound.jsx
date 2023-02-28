import React from 'react'
import { MdHome } from 'react-icons/md'
import Footer from '../components/Footer/Footer'
import {Appbar, Navbar} from '../components/header'

const ProductNotFound = () => {
  return (
    <>
        <Appbar />
        <Navbar />
        <div className='grid place-content-center'>
            <h1 className='text-center mt-10 text-secondary'>Product Not Found</h1>
            <img src="https://img.freepik.com/free-vector/404-error-with-tired-person-concept-illustration_114360-7889.jpg?w=740&t=st=1677535046~exp=1677535646~hmac=0cdea72fceeaf716117dd164725c026d40a00420dd1006c4773492afb5d2b462" alt="" />
            <a href='/' className='bg-orange p-2 max-w-[200px] px-4 flex mx-auto items-center gap-2'>Go to homepage <MdHome /></a>
        </div>
        <Footer />
    </>
  )
}

export default ProductNotFound