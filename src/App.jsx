
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Homepage from './pages/Homepage'
import Categories from './pages/categories'
import Subcategories from './pages/subcategories'

function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/categories' element={<Categories/>}></Route>
      <Route path='/categories/subcategories' element={<Subcategories/>}></Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
