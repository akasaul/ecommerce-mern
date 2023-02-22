import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='grid justify-center gap-12 mt-8 grid-layout max-w-[900px] mx-auto px-2'>
        {children}
    </div>
  )
}

export default Layout