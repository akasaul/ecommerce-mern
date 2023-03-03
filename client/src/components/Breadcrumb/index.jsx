import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumb = ({path}) => {
  return (
    <div className='bg-secondary text-white text-center p-2 mb-6'>
        {path.map((link, index) => (index === 0 ? <Link to='/' key={index}>Home</Link>  : <Link key={index}>{' > ' + link}</Link> ))}
    </div>
  )
}

export default Breadcrumb