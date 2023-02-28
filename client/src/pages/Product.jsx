import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Appbar, Navbar } from '../components/header'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, reset, productSelector, deleteProduct } from '../app/features/products/productSlice'
import { MdAccountCircle, MdAdd, MdArrowBack, MdClose, MdDelete, MdEdit, MdImage, MdOutlineAddShoppingCart, MdOutlineVerifiedUser, MdRemove, MdRemoveCircle, MdUpdate } from 'react-icons/md'
import Spinner from '../components/Spinner'
import {Rating} from 'react-simple-star-rating' 
import Breadcrumb from '../components/Breadcrumb'
import Modal from 'react-modal';
import { addToCart } from '../app/features/cart/cartSlice'
import Footer from '../components/Footer/Footer'
import {toast} from 'react-toastify'
import ProductNotFound from './ProductNotFound'
import { rateProduct } from '../app/features/products/productSlice'
import useAuthStatus from '../hooks/useAuthStatus'

const checkMatch = (email, email2) => {
    return email === email2;
}

const Product = () => {

    const {pathname} = useLocation();
    const id = pathname.split('/')[2];


    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(reset());
    }, [])

    const [count, setCount] = useState(1);

    
    const {_id, name, description, price, imageUrl, category, postedBy, rating} = useSelector(productSelector);

   
    const {isLoading, isError, isSuccess, message} = useSelector(state => state.product.product);
    const {user} = useSelector(state => state.user);    


    const path = pathname.split('/');
    path[2] = name;
    const userId = postedBy?._id;
    const userName = postedBy?.name;
    const email = postedBy?.email;
    const [modalOpen, setModalOpen] = useState(false);
    const isLoggedIn = useAuthStatus();


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
            <ProductNotFound />
        )
    }

    const removeProduct = (id) => {
        dispatch(deleteProduct(id));
        setModalOpen(false);
        toast.error(`Successfully Deleted ${name}`)
        navigate('/shop');
    }


    const handleclick = ({id, name, count, price, imageUrl, category, description}) => {
        console.log('add to cart');
        const item = {id, name, price, imageUrl, category, desc: description, qty: count};
        dispatch(addToCart(item));
        navigate('/cart');
    }


    const handleRating = (rate) => {
        isLoggedIn ?
            dispatch(rateProduct({id, value: rate})) : 
        toast.error('You Should be logged in to rate');
        console.log(rate, id);
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

                 {
                    isSuccess &&
                        <>
                            <Rating emptyStyle={{ display: "flex" }} initialValue={rating.length !== 0 ? rating.map(rate => rate.value).reduce((total, cur) => total + cur, 0) / rating.length : 0} size={24} fillStyle={{ display: "-webkit-inline-box" }} onClick={handleRating} />
                            <p className='flex items-center gap-2 font-thin'><MdAccountCircle /> ({rating.length}) Reviews</p>
                        </>
                 }

                <div className='flex gap-2 items-center'>
                    <article className='gap-2 p-3 font-[300] w-1/2 border-fill my-2 flex items-center right-[0px]'>
                        {
                            userId  
                                ?
                                <div className='flex items-center gap-2'>
                                    <MdAccountCircle className='text-[2rem]' />
                                    <a href={`/users/${userId}`} className='h-[30px] bg-orange w-[30px] rounded-[50%] font-[500] grid place-content-center'>{userName?.slice(0, 1).toUpperCase()}</a>
                                    <a href={`/users/${checkMatch(user?.email, postedBy?.email) ? 'me' : userId}`} className='cursor-pointer hover:underline'>
                                        {
                                            checkMatch(user?.email, postedBy?.email) ?
                                                'You': 
                                                '@' +  userName 
                                        } 
                                    </a>
                                </div>
                                :
                                <div className='flex items-center gap-2'>
                                    <a href='#' className='h-[30px] bg-orange w-[30px] rounded-[50%] grid place-content-center'>u</a>
                                    <a href='#' className='cursor-pointer hover:underline'>UnknownUser</a>
                                </div>    
                        }
                    </article>
                </div>
                {
                    checkMatch(user?.email, postedBy?.email) && 
                    <div className='flex items-around gap-3 my-2'>
                        <a href={`/product/update/${_id}?name=${name}&desc=${description}&price=${price}&imgUrl=${imageUrl}&qty=${count}&category=${category}`} className='flex items-center gap-2'>Edit<MdEdit /></a>
                        <button  className='flex items-center gap-2' onClick={() => setModalOpen(true)}>Delete<MdDelete/></button>
                    </div>
                }
                <div>

                    <Modal
                        isOpen={modalOpen}
                        contentLabel='Delete Product'
                        >
                            <section className='py-2 border-b mb-5 flex justify-end'>
                                <button className='hover:bg-secondary h-[30px] rounded-[50%] w-[30px] place-content-center grid hover:text-white' 
                                onClick={() => setModalOpen(false)}>
                                    <MdClose />
                                </button>
                            </section>
                        
                        <div className='grid place-content-center min-h-[50vh]'>
                            <img src="/vecteezy_delete-icon-no-sign-cancel-wrong-and-reject_.jpg" className='h-[200px]' alt="" />
                            <h1>Are you sure to delete {name}</h1>
                            <div className='flex justify-around'>
                                <button className='flex items-center gap-2 hover:bg-orange p-1' onClick={() => removeProduct(_id)}><MdDelete /> Yes</button>
                                <button className='flex items-center gap-2 hover:bg-orange p-1' onClick={() => setModalOpen(false)}><MdArrowBack /> No</button>
                            </div>
                        </div>
                    
                    </Modal>
                    

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
                        <button className='bg-orange p-2 rounded-sm  hover:scale-110' onClick={() => handleclick({id, name, count, price, imageUrl, category, description})}>
                            <MdOutlineAddShoppingCart className='text-md' />
                        </button>
                        <p>$ {count * price}</p>
                    </div>

                </div>

            </div>
        </section>

        <Footer  />
    </>
  )
}

export default Product