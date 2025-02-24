
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import './App.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Homepage from './pages/homepage'
import Categories from './pages/categories'
import Subcategories from './pages/subcategories'
import Products from './pages/product'
import Productalldetails from './pages/productalldetails'
import { GoogleOAuthProvider } from '@react-oauth/google';
import PrivacyandPolicy from './pages/privacypolicy'
import TermsandCondition from './pages/termscondition'
import ResetPassword from './Components/ResetPassword'
import Aboutpage from './pages/aboutpage'
import Contactpage from './pages/contactpage'
import Vendor from '../vendorDashboard/src/App'

const YOUR_GOOGLE_CLIENT_ID =  '510164715040-lj99bre09a5co1gbelb7u3ul16kgakqo.apps.googleusercontent.com'
function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return (
    <GoogleOAuthProvider clientId={YOUR_GOOGLE_CLIENT_ID}>
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/about' element={<Aboutpage/>}/>
      <Route path='/contact' element={<Contactpage/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path="/categories/:categoryName" element={<Subcategories />}/>
      <Route path='/:category/:subcategory/products' element={<Products/>}/>
      <Route path='/products/:slug' element={<Productalldetails />} />
      <Route path='/privacy&policy' element={<PrivacyandPolicy/>}/>
      <Route path='/terms&condition' element={<TermsandCondition />} />
      <Route path='/dashboard' element={token && role === 'vendor' ? <Navigate to="http://localhost:5174/vendor/dashboard" /> : <Vendor />} />
      <Route path='/reset-password/:encryptedData' element={<ResetPassword/>}/>
      {/* <Route path='/bussiness-listing' element={<Bussinesslisting/>}> */}
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
    </GoogleOAuthProvider>
  )
}

export default App