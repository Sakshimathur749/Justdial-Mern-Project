
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
import PrivacyandPolicy from './pages/privacypolicy'
import TermsandCondition from './pages/termscondition'
import ProtectedRoute from './pages/protectedRoute'
import Vendor from '../../admin/src/pages/Vendor/vendor';
import ResetPassword from './Components/ResetPassword'
import Aboutpage from './pages/aboutpage'
import Contactpage from './pages/contactpage'
const YOUR_GOOGLE_CLIENT_ID =  '510164715040-lj99bre09a5co1gbelb7u3ul16kgakqo.apps.googleusercontent.com'
function App() {
 
  return (
    <GoogleOAuthProvider clientId={YOUR_GOOGLE_CLIENT_ID}>
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/about' element={<Aboutpage/>}></Route>
      <Route path='/contact' element={<Contactpage/>}></Route>
      <Route path='/categories' element={<Categories/>}></Route>
      <Route path="/categories/:categoryName" element={<Subcategories />} />
      <Route path='/:category/:subcategory/products' element={<Products/>}></Route>
      <Route path='/products/:slug' element={<Productalldetails />} />
      <Route path='/privacy&policy' element={<PrivacyandPolicy/>}></Route>
      <Route path='/terms&condition' element={<TermsandCondition />} />
      <Route path="/vendor/create" element={<ProtectedRoute><Vendor/></ProtectedRoute>} />
      <Route path='/reset-password' element={<ResetPassword/>}/>
      {/* <Route path='/bussiness-listing' element={<Bussinesslisting/>}></Route> */}
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
    </GoogleOAuthProvider>
  )
}

export default App
