
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Homepage from './pages/homepage'
import Categories from './pages/categories'
import Subcategories from './pages/subcategories'
import Products from './pages/product'
import Productalldetails from './pages/productalldetails'
import { GoogleOAuthProvider } from '@react-oauth/google';
const YOUR_GOOGLE_CLIENT_ID =  '510164715040-lj99bre09a5co1gbelb7u3ul16kgakqo.apps.googleusercontent.com'
function App() {
  return (
    <GoogleOAuthProvider clientId={YOUR_GOOGLE_CLIENT_ID}>
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/categories' element={<Categories/>}></Route>
      <Route path="/categories/:categoryName" element={<Subcategories />} />
      <Route path='/:category/:subcategory/products' element={<Products/>}></Route>
      <Route path='/products/:slug' element={<Productalldetails />} />
      {/* <Route path='/bussiness-listing' element={<Bussinesslisting/>}></Route> */}
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
    </GoogleOAuthProvider>
  )
}

export default App
