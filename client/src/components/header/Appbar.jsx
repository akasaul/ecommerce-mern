import React from 'react'
import { MdExpandMore, MdPhone} from 'react-icons/md'

const Appbar = () => {
  return (
    <div className='bg-primary hidden sm:block px-4'>
        <div className='flex items-center justify-between max-w-[1200px] p-2 mx-auto'>
            <p className='flex items-center gap-2 text-white text-xs'><MdPhone /> +251968600496</p>
            <p className='flex items-center gap-2 text-white text-xs'>Get 50% of the selected Items | Shop now</p>
            <div className='flex items-center gap-5'>
                <p className='flex items-center gap-2 text-white text-xs'>Eng <MdExpandMore /></p>
                <p className='flex items-center gap-2 text-white text-xs'>Location <MdExpandMore /></p>
            </div>
        </div>
    </div>
  )
}

export default Appbar