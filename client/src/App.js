import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AddProducts from './pages/AddProducts';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Product from './pages/Product';
import UpdateProduct from './pages/UpdateProduct';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import FinishPayment from './pages/FinishPayment';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/add-product' element={<AddProducts />} />
        <Route path='/products/:productId' element={<Product />} />
        <Route path='/product/update/:productId' element={<UpdateProduct />} />
        <Route path='/cart/payment' element={<Payment />} />
        <Route path='/cart/payment/finish' element={<FinishPayment />} />
        <Route path='/search' element={<SearchResults />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
