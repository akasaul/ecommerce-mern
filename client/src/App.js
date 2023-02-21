import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AddProducts from './pages/AddProducts';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/add-product' element={<AddProducts />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
