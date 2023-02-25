import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Appbar, Navbar } from '../components/header'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, reset } from '../app/features/products/productSlice'
import { MdAccountCircle, MdAdd, MdDelete, MdEdit, MdImage, MdOutlineAddShoppingCart, MdOutlineVerifiedUser, MdRemove, MdUpdate } from 'react-icons/md'
import Spinner from '../components/Spinner'
import {Rating} from 'react-simple-star-rating' 
import Breadcrumb from '../components/Breadcrumb'
import { productSelector } from '../app/features/products/productSlice'

const checkMatch = (email, email2) => {
    return email === email2;
}

const Product = () => {

    const {pathname} = useLocation();
    const id = pathname.split('/')[2];


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reset());
    }, [])

    const [count, setCount] = useState(1);

    
    const {_id, name, description, price, rating, imageUrl, category, postedBy} = useSelector(productSelector);

   
    const {isLoading, isError, isSuccess, message} = useSelector(state => state.product.product);
    const {user} = useSelector(state => state.user);    


    const path = pathname.split('/');
    path[2] = name;
    const userId = postedBy?._id;
    const userName = postedBy?.name;
    const email = postedBy?.email;


    useEffect(() => {
        dispatch(getProduct(id))
    }, [])

    if(isLoading) {
        return (
            <Spinner />
        )
    }

    if(isError) {
        return (
            <h1>Product Not Found</h1>
        )
    }

    return (
    <>
        <Appbar />
        <Navbar />
        <Breadcrumb path={path} />
        <section className='flex flex-col gap-6 md:gap-8 mt-5 items-start sm:flex-row max-w-[1000px] mx-auto px-5 '>
            <div style={{
                flex: 0.5
            }}>
                <img className='h-[300px] sm:h-[500px] rounded-[10px] object-cover w-[100%]' src={imageUrl}/>
            </div>

            <div
                 className='w-full overflow-hidden flex flex-col gap-3 sm:pt-5'
                 style={{
                    flex: 0.5
                 }}>
                <h2>{ name }</h2>
                <p className='text-sm font-[300] '>
                    {description}
                </p>

                <p className='flex items-center gap-2'>Category <MdImage /> {category?.slice(0, 1)?.toUpperCase() + category?.slice(1)} </p>

                <Rating emptyStyle={{ display: "flex" }} size={24} fillStyle={{ display: "-webkit-inline-box" }} />

                <div className='flex gap-2 items-center'>
                    <article className='gap-2 p-3 font-[300] w-1/2 border-fill my-2 flex items-center right-[0px]'>
                        {
                            userId  
                                ?
                                <div className='flex items-center gap-2'>
                                    <MdAccountCircle className='text-[2rem]' />
                                    <a href={`/users/${userId}`} className='h-[30px] bg-orange w-[30px] rounded-[50%] font-[500] grid place-content-center'>{userName?.slice(0, 1).toUpperCase()}</a>
                                    <button className='cursor-pointer hover:underline'>
                                        {
                                            checkMatch(user?.email, postedBy?.email) ?
                                                'You': 
                                                '@' +  userName 
                                        } 
                                    </button>
                                </div>
                                :
                                <div className='flex items-center gap-2'>
                                    <a href={`/users/${userId}`} className='h-[30px] bg-orange w-[30px] rounded-[50%] grid place-content-center'>u</a>
                                    <a href={`/users/${userId}`} className='cursor-pointer hover:underline'>UnknownUser</a>
                                </div>    
                        }
                    </article>
                </div>
                {
                    checkMatch(user?.email, postedBy?.email) && 
                    <div className='flex items-around gap-3 my-2'>
                        <a href={`/product/update/${_id}`} className='flex items-center gap-2'>Edit<MdEdit /></a>
                        <a href={`/product/delete/${_id}`} className='flex items-center gap-2'>Delete<MdDelete /></a>
                    </div>
                }
                <div>

                    <div className='flex items-center justify-between max-w-[300px] bg-orange p-2 rounded-sm'>
                        <button className='hover:scale-110 rounded-[50%]' onClick={() => {count > 1 && setCount(prev => prev - 1)}}>
                            <MdRemove />
                        </button>
                            {count}
                        <button className='hover:scale-110 rounded-[50%]' onClick={() => {setCount(prev => prev + 1)}}>
                            <MdAdd />
                        </button>
                    </div>

                    <div className='flex item-center justify-between p-3 mt-3'>
                        <button className='bg-orange p-2 rounded-sm  hover:scale-110'>
                            <MdOutlineAddShoppingCart className='text-md' />
                        </button>
                        <p>$ {count * price}</p>
                    </div>

                </div>

            </div>
        </section>
    </>
  )
}

export default Product