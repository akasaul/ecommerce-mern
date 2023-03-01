import React, { useEffect } from 'react'
import { MdTextFormat, MdAttachMoney, MdProductionQuantityLimits, MdCategory, MdLink, MdCreate, MdDescription, MdImage, MdCamera, MdCameraAlt } from 'react-icons/md'
import { useNavigate, useLocation } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import {Appbar, Navbar} from '../components/header'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, reset } from '../app/features/products/productSlice';
import {toast} from 'react-toastify'
import Footer from '../components/Footer/Footer'


const AddProduct = () => {
    const {pathname} = useLocation();
    const path = pathname.split('/');

    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        price: '',
        qty: 0,
        category: 'other',
        imageUrl: ''
    })

    const onChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }
    
    const {name, desc, price, qty, category, imageUrl} = formData;
    
    const dispatch = useDispatch();
    const {isLoading, isError, isSuccess, message} = useSelector(state => state.product);
 
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addProduct(formData));
    }

    useEffect(() => {
        dispatch(reset());
    }, [])

    useEffect(() => {
        if(isError) {
            toast.error(message);
            dispatch(reset());
        }

        if(isSuccess) {
            toast.success('Added the product successfully')
            dispatch(reset());
            navigate('/shop');
        }
        
    }, [isError, isSuccess])
    

    const navigate = useNavigate();

  return (
    <>
        <Appbar />
        <Navbar />

        <Breadcrumb path={path} />

        <h2 className='flex items-center gap-3 max-w-[800px] mx-auto my-5'>Post Product <MdCreate /></h2>
        
        <form onSubmit={onSubmit} noValidate encType='multipart'>
            
            <div className='grid sm:grid-cols-2 px-4 gap-5 max-w-[800px] mx-auto'>
                <div className='flex flex-col gap-2'>
                    <label className='text-xs gap-2 text-secondary cursor-pointer hover:text-[#000] items-center flex'>Title <MdTextFormat /></label>
                    <input value={name} className='input focus:border focus:border-primary rounded-sm' onChange={onChange} name='name' type='text' />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs gap-2 text-secondary cursor-pointer hover:text-[#000] items-center flex'>Description <MdDescription /></label>
                    <textarea onChange={onChange} value={desc} className='rounded-sm p-2 outline-none border focus:border focus:border-primary border-[#C9C9C9]' name='desc' rows='2' cols='3' />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs gap-2 text-secondary cursor-pointer hover:text-[#000] items-center flex'>Price <MdAttachMoney /></label>
                    <input className='input focus:border focus:border-primary rounded-sm' value={price} onChange={onChange} name='price' type='number' min={0} />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs gap-2 text-secondary cursor-pointer hover:text-[#000] items-center flex'>ImageUrl <MdLink /></label>
                    <input className='input focus:border focus:border-primary rounded-sm' value={imageUrl} onChange={onChange} name='imageUrl' type='url' />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs gap-2 text-secondary cursor-pointer hover:text-[#000] items-center flex'>Quantity <MdProductionQuantityLimits /></label>
                    <input className='input focus:border focus:border-primary rounded-sm' value={qty} onChange={onChange} name='qty' type='number' min={0} />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs gap-2 text-secondary cursor-pointer hover:text-[#000] items-center flex'>Category <MdCategory /></label>
                    <select
                        name='category'
                        className='input focus:border focus:border-primary'
                        onChange={onChange}
                        value={category}
                    >
                    <option value='food'>Food</option>
                    <option value='cloth'>Cloth</option>
                    <option value='electronics'>Electronics</option>
                    <option value='furniture'> Furniture</option>
                    <option value='instrument'>Instrument</option>
                    <option value='other'>Other</option>
                </select>
                </div>
            </div>

            <button type="submit" className='bg-orange block mx-auto w-full text-fill p-2 rounded-sm mt-12 max-w-[400px]'>Submit {isLoading && '...'}</button>
       
        </form>

        <Footer />
    </>
  )
}

export default AddProduct