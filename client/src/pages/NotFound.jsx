import Footer from '../components/Footer/Footer'
import {Appbar, Navbar} from '../components/header'

const NotFound = () => {
  return (
    <>
        <Appbar />
        <Navbar />
        <h1 className='text-center mt-3 text-lg text-secondary'>Page Not Found</h1>
        <img src="/15.png" alt="" className='max-h-[500px] mx-auto object-contain' />
        <Footer />
    </>
  )
}

export default NotFound