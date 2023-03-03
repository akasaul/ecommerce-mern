import React from 'react'
import { MdAccountBox, MdAccountCircle, MdComputer, MdEmail, MdHome, MdOutlineShoppingCart, MdPhone, MdSend, MdShoppingBasket, MdSupervisorAccount } from 'react-icons/md'
import { FaGithub } from 'react-icons/fa'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const [message, setMessage] = useState('');
  return (
    <footer className='bg-primary py-4 mt-10'>
        
        <div className='max-w-[1000px] mx-auto flex flex-col sm:flex-row     items-center sm:items-start gap-5 p-4 justify-around text-white'>
           
            <div className='flex flex-col'>
              
                <a href='/' className='flex flex-[0.2] bg-secondary p-2 text-primary mb-5 items-center gap-3 text-md'>
                    <MdShoppingBasket />
                    Niko's
                </a>
                <p>Contact Me</p>
                <Link to="#" className='flex items-center font-[300] gap-3 text-[12px]'> <MdComputer /> Nikodimos Jemaneh</Link>
                <Link to="mailto: nikodimosjemaneh40@gmail.com"  className='flex items-center font-[300] gap-3 text-[12px]'> <MdEmail /> nikodimosjemaneh40@gmail.com </Link>
                <Link to="mailto: nikodimosjemaneh40@gmail.com"  className='flex items-center font-[300] gap-3 text-[12px]'> <MdSend /> Telegram </Link>
                <Link to="tel: 0968600496"  className='flex items-center font-[300] gap-3 text-[12px]'> <MdPhone /> +251968600496 </Link>
                <Link to="https://github.com/akasaul"  className='flex items-center font-[300] gap-3 text-[12px]'> <FaGithub /> Github </Link>
           
            </div>

            <div className='text-white'>
                <p className='font-[300]'>Send Email</p>
               
                <form className='flex items-center gap-2'>
                    <input type="text" name="email" id="email" value={message} className='p-2 text-primary focus:outline-none' onChange={e => setMessage(e.target.value)} />
                    <a href={`mailto:nikodimosjemaneh40@gmail.com?subject = Greetings&body = ${message}`} className="send p-2 bg-orange text-primary focus:outline-none flex items-center gap-2" type='submit'>Send <MdSend /></a>
                </form>

                <div className='flex items-start justify-between mt-5'>

                    <div>
                        <p>Site Map</p>
                        <div className='font-thin text-[12px]'>
                            <a href="/shop" className='flex items-center gap-2'><MdHome /> Shop</a>
                            <a href="/cart" className='flex items-center gap-2'><MdOutlineShoppingCart /> Cart</a>
                            <a href="/login" className='flex items-center gap-2'><MdAccountBox /> Login</a>
                            <a href="/signup" className='flex items-center gap-2'><MdAccountCircle /> Signup</a>
                            <a href="/profile/me" className='flex items-center gap-2'><MdSupervisorAccount /> Account</a>
                        </div>
                    </div>

                    <div>
                        <p>Links</p>

                        <div className='font-thin text-[12px]'>
                            <a href="#" className='flex items-center gap-2'>Privacy Policy</a>
                            <a href="#" className='flex items-center gap-2'>Legal issues</a>
                            <a href="#" className='flex items-center gap-2'>Delivery and Services</a>
                            <a href="#" className='flex items-center gap-2'>Rules</a>
                            <a href="#" className='flex items-center gap-2'>About us</a>
                        </div>

                    </div>


                </div>

            </div>
        </div>

        <p className='text-white text-center'>&copy; {new Date().toLocaleDateString().split('/')[2]} All rights reserved</p>

    </footer>
  )
}

export default Footer