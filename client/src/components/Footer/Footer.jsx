import React from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='bg-primary'>
        <div className='min-w-[1000px] mx-auto p-4 text-white'>
            <div>
                <a href='/' className='flex flex-[0.2] items-center gap-3 text-md'>
                    <MdShoppingBasket />
                    Niko's
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer