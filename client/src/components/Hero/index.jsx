import React from 'react'
import { MdDeliveryDining, MdLogin, MdOutlineAccountCircle, MdShoppingCart } from 'react-icons/md'


const index = () => {
  return (
    <section className='max-w-[1200px] mx-auto'>
        
      <div className='flex-col px-5 mx-auto relative'>
          
          <img className='h-[500px] w-[100%] object-cover' src="https://images.pexels.com/photos/4050345/pexels-photo-4050345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
          <div className='absolute bg-white sm:left-[2rem] sm:right-[30%] sm:bottom-[30%]  flex flex-col sm:justify-between gap-3  top-10 left-[2rem] right-[2rem] min-w-[220px] p-4 sm:p-12 rounded-[0.5rem]'>             
            <h1 className='text-md'>Everything You Need In One Place, One Shop</h1>
            <p className='font-thin'>
              NikoShop is an online platform that any one can post products and get customers RIGHT AWAY.

              Customers are also able to browse products with unmatched shopping experience and Buy as they LIKE. 
              </p>
            <div className='flex items-center justify-center'>
              <a href='/shop' className='bg-orange px-5 py-2 hover:scale-110 transition-all duration-100'>Shop Now</a>
            </div>
          </div>
      
      </div>

        <div>
        
          <h1 className='my-7 text-md text-center'>Why Shop With Us?</h1>
        
          <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4'>
        
            <article className='border cursor-pointer hover:border-none hover:scale-110 hover:bg-orange article-card transition-transform duration-200 max-w-[400px] mx-auto p-3 shadow-lg rounded-[1rem]'>
              <header className='text-center flex flex-col items-center gap-4 justify-center'>
                  <MdShoppingCart className='text-lg bg-orange h-[60px] p-2 rounded-[50%] w-[60px]' /> 
                  <p className='text-md'>UX</p>
              </header>
                  <p className='font-thin'>
                  We deliver an amazing Shopping Experience and Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, blanditiis!
                  </p>
            </article>          
         
            <article className='border cursor-pointer hover:border-none hover:scale-110 hover:bg-orange article-card transition-transform duration-200 max-w-[400px] mx-auto p-3 shadow-lg rounded-[1rem]'>
              <header className='text-center flex flex-col items-center gap-4 justify-center'>
                  <MdDeliveryDining className='text-lg bg-orange h-[60px] p-2 rounded-[50%] w-[60px]' /> 
                  <p className='text-md'>Fast Delivery</p>
              </header>
                  <p className='font-thin'>
                    Our Offers include a FAST delivery with a safety pushed to it's max and Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, blanditiis!
                  </p>
            </article>       

             <article className='border cursor-pointer hover:border-none hover:scale-110 hover:bg-orange article-card transition-transform duration-200 max-w-[400px] mx-auto p-3 shadow-lg rounded-[1rem]'>
              <header className='text-center flex flex-col items-center gap-4 justify-center'>
                  <MdShoppingCart className='text-lg bg-orange h-[60px] p-2 rounded-[50%] w-[60px]' /> 
                  <p className='text-md'>Secure Payment</p>
              </header>
                    <p className='font-thin'>
                      We handle All Transactions and Make Sure that Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, blanditiis!
                  </p>
            </article>          
        
        </section>

        <h1 className='text-center my-7'>Not Joined Us Yet?</h1>
        <a href='/signup' className='flex rounded-[0.2rem ] transform-all duration-200 gap-2 max-w-[300px] mx-auto mb-4 px-4 p-2 border justify-center hover:scale-110 items-center'>Sign Up <MdOutlineAccountCircle /> </a>

        <h1 className='text-center my-7'>Already Joined Us?</h1>
        <a href='/login' className='flex rounded-[0.2rem  ] transform-all duration-200 gap-2 max-w-[300px] mx-auto mb-4 px-4 p-2 border justify-center hover:scale-110 items-center'>Log In <MdLogin /> </a>

      </div>

    </section>
  )
}

export default index