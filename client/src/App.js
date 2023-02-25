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



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/add-product' element={<AddProducts />} />
        <Route path='/products/:productId' element={<Product />} />
        <Route path='/product/update/:productId' element={<UpdateProduct />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
