import React, { useEffect } from 'react'
import { MdTextFormat, MdAttachMoney, MdProductionQuantityLimits, MdCategory, MdLink, MdCreate, MdDescription } from 'react-icons/md'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import {Appbar, Navbar} from '../components/header'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, getOneProduct, getProduct, productSelector, productStateSelector, reset, updateProduct } from '../app/features/products/productSlice';
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner';
import Footer from '../components/Footer/Footer'
import {useSearchParams} from 'react-router-dom'


const UpdateProduct = () => {
    const {pathname} = useLocation();
    const path = pathname.split('/').slice(0, 3);

    const [query, setQuery] = useSearchParams();

    const prodName = query.get('name');
    const prodDesc = query.get('desc');
    const prodPrice = query.get('price');
    const prodImgUrl = query.get('imgUrl');
    const prodQty = query.get('qty');
    const prodCategory = query.get('category');

    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const id = pathname.split('/')[3];

    const {isLoading, isError, isSuccess, message} = useSelector(state => state.product.product);

    useEffect(() => {
        dispatch(getProduct(id));
    }, [])

    const [formData, setFormData] = useState({
        name: prodName, 
        desc: prodDesc,
        price: prodPrice,
        qty: prodQty,
        category: prodCategory,
        imageUrl: prodImgUrl,
    })

    const onChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }


    const {name, desc, price, qty, category, imageUrl} = formData;

    const onSubmit = async (e) => {
        e.preventDefault();
        
        await dispatch(updateProduct({id, ...formData}));

        navigate('/shop');
    }

    useEffect(() => {
        if(isError) {
            toast.error(message);
        }

    }, [isError])
    

  return (
    <>
        <Appbar />
        <Navbar />
        <Breadcrumb path={path} />     

        {
            isLoading && 
            <Spinner />
        }

        <h2 className='flex items-center gap-3 max-w-[800px] mx-auto my-5'>Edit Product <MdCreate /></h2>
        
        <form onSubmit={onSubmit}>
            
            <div className='grid sm:grid-cols-2 px-4 gap-5 max-w-[800px] mx-auto'>
                <div className='flex flex-col gap-2'>
                    <label className='text-xs gap-2 text-secondary cursor-pointer hover:text-[#000] items-center flex'>Name <MdTextFormat /></label>
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

            <button type="submit" className='bg-orange block mx-auto w-full text-fill p-2 rounded-sm mt-12 max-w-[400px]'>Submit</button>
       
        </form>

        <Footer />
    </>
  )
}

export default UpdateProduct