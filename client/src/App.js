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
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import ProfileMe from './pages/ProfileMe';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/shop' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />

        <Route path='/add-product' element={<PrivateRoute />}>
          <Route path='/add-product' element={<AddProducts />} />
        </Route>
        
        <Route path='/products/:productId' element={<Product />} />

        <Route path='/product/update/:productId' element={<PrivateRoute />}>
          <Route path='/product/update/:productId' element={<UpdateProduct />} />
        </Route>

        <Route path='/cart/payment' element={<Payment />} />
        <Route path='/cart/payment/finish' element={<FinishPayment />} />
        <Route path='/search' element={<SearchResults />} />


        <Route path='/profile/me' element={<PrivateRoute />}>
          <Route path='/profile/me' element={<ProfileMe />} />
        </Route>

        <Route path='/profiles/:userId' element={<PrivateRoute />}> 
          <Route path='/profiles/:userId' element={<Profile />} />
        </Route> 
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
