import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import ECommerce from './pages/Dashboard/ECommerce';
import PostCategory from './pages/Category/postcategory';
import PostingCategory from './pages/Category/postingcategory';
import DefaultLayout from './layout/DefaultLayout';
import EditCategory from './pages/Category/editcategory';
import ProductPostPage from './pages/Product/postproduct';
import PostedProductsPage from './pages/Product/product';
import EditProductPage from './pages/Product/editproduct';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const token = localStorage.getItem('token');
  const isAuthRoute = pathname === '/auth/signin';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  if (token && pathname === '/auth/signin') {
    return <Navigate to="/" />;
  }
  if (!token && pathname !== '/auth/signin') {
    return <Navigate to="/auth/signin"/>;
  }
  return loading ? (
    <Loader />
  ) : (
    isAuthRoute ? (
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
      </Routes>
    ): (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <ECommerce />
            </>
          }
        />
        <Route
          path="/posting-category"
          element={
            <>
              <PostCategory />
            </>
          }
        />
        <Route
          path="/posted-category"
          element={
            <>
              <PostingCategory />
            </>
          }
        />
        <Route
          path="/edit-category/:id"
          element={
            <>
              <EditCategory />
            </>
          }
        />
        <Route
          path="/posting-product"
          element={
            <>
              <ProductPostPage />
            </>          }
        />
        <Route
          path="/posted-product"
          element={
            <>
              <PostedProductsPage />
            </>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <>
              <EditProductPage/>
            </>
          }
        />
      </Routes>
    </DefaultLayout>
    )
  );
}

export default App;