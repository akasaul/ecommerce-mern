import React from 'react'

const index = () => {
  return (
    <section>
        <div className='flex max-w-[1200px] flex-col px-5  mx-auto relative'>
            <img className='h-[500px] object-cover' src="https://images.pexels.com/photos/4050345/pexels-photo-4050345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <div className='absolute bg-white sm:left-[2rem] sm:right-[30%] sm:bottom-[30%]  flex flex-col sm:justify-between gap-3  top-10 left-[20%] right-[20%] p-4 sm:p-12 rounded-[0.5rem]'>             
              <h1 className='text-md'>Everything You Need In One Place, One Shop</h1>
              <p className='font-thin'>
                Lorem, ipsum dolor sit amet consectetur
                 adipisicing elit. Quo, quibusdam ullam.
                  Quam unde minus provident autem voluptas iste laborum
                   cum.
                </p>
              <div className='flex items-center justify-center'>
                <a href='/shop' className='bg-orange px-5 py-2'>Shop Now</a>
              </div>
            </div>
        </div>
    </section>
  )
}

export default index