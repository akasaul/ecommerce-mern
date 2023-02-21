import React from 'react'

const Breadcrumb = ({path}) => {
  return (
    <div className='bg-secondary text-white text-center p-2 mb-6'>
        {path.map((link, index) => (index === 0 ? <a href='/' key={index}>Home</a>  : <a href={`/${link}`} key={index}>{' > ' + link}</a> ))}
    </div>
  )
}

export default Breadcrumb