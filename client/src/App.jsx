
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Homepage from './pages/homepage'
import Categories from './pages/categories'
import Subcategories from './pages/subcategories'
import Products from './pages/product'
import Productalldetails from './pages/productalldetails'

function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/categories' element={<Categories/>}></Route>
      <Route path="/categories/:categoryName" element={<Subcategories />} />
      <Route path='/:category/:subcategory/products' element={<Products/>}></Route>
      <Route path='/products/:slug' element={<Productalldetails />} />
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
