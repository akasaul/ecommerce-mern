import React from 'react'
import {MdArrowBack, MdClose, MdDelete} from 'react-icons/md'

const index = ({name, id: _id, modalOpen, setModalOpen, removeProduct }) => {
  return (
    <section className='top-[0px] bottom-[0px] fixed bg-[#2c2929a8] left-[0px] right-[0px]'>
        <div className='rounded-[1rem] p-4 bg-[white] max-w-[600px] mx-auto absolute top-[80px]  left-[20px] right-[20px]'>
            <p className='border-b p-4 border-secondary'>
                <button className='h-[35px] w-[35px] hover:bg-secondary grid place-content-center hover:text-white rounded-[50%]' onClick={() => setModalOpen(false)}>
                    <MdClose />
                </button>
            </p>
            <div className='grid place-content-center'>
              
                <img src="/vecteezy_delete-icon-no-sign-cancel-wrong-and-reject_.jpg" className='sm:h-[300px] justify-center mx-auto h-[200px] object-cover' alt="" />

                <div className='grid place-content-center max-w-[300px]'>
                    <h1 className='text-center'>Are you sure to delete {name}</h1>
                    <div className='flex justify-around'>
                        <button className='flex items-center gap-2 hover:bg-orange p-1' onClick={() => removeProduct(_id)}><MdDelete /> Yes</button>
                        <button className='flex items-center gap-2 hover:bg-orange p-1' onClick={() => setModalOpen(false)}><MdArrowBack /> No</button>
                    </div>
                </div>

            </div>
        </div>
    </section>
  )
}

export default index