import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Wizard } from 'react-use-wizard';
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
import PostSubcategory from './pages/Category/postsubcategory';
import Subcategory from './pages/Category/subcategory';
import EditSubCategory from './pages/Category/editsubcategory';
import ContactDetails from './pages/contact';
import BussniessListing from './pages/BussinessListing/bussniessListing';
import Vendor from './pages/Vendor/vendor';
import VendorTable from './pages/Vendor/vendortable';
import EditVendor from './pages/Vendor/editVendor';
import BusinessListingTable from './pages/BussinessListing/bussniessListingtable';
import EditBussniessListing from './pages/BussinessListing/editBussniessListing';
import MembershipPlan from './pages/MembershipDetails/membershipPlan';
import EditMembershipPlan from './pages/MembershipDetails/editMembershipPlan';
import Membership from './pages/MembershipDetails/membership';
import Profilepage from './pages/profile/profilepage';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [profileIncomplete, setProfileIncomplete] = useState<any>(false);
  const { pathname } = useLocation();
  const token = localStorage.getItem('token');
  const isAuthRoute = pathname === '/auth/signin';
  useEffect(() => {
    const checkProfileCompletion = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setProfileIncomplete(true);
      } else {
        const data = await response.json();
        if (!data.username || !data.email || !data.mobileNumber || !data.city) {
          setProfileIncomplete(true);
        } else {
          setProfileIncomplete(false);
        }
      }
    };
    checkProfileCompletion();
    setTimeout(() => setLoading(false), 1000);
  }, []);
  if (token && pathname === '/auth/signin') {
      return <Navigate to="/dashboard" />
  }
  if (!token && pathname !== '/auth/signin') {
    return <Navigate to="/auth/signin"/>;
  }
  return loading ? (
    <Loader />
  ) : (
    isAuthRoute  ? (
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
      </Routes>
    ): (
    <DefaultLayout>
      <Routes>
        <Route path='/dashboard'  element={<><ECommerce profileIncomplete={profileIncomplete}/></>}/>
        <Route path="/post-category" element={<> <PostCategory /></>}/>
        <Route path="/post-subcategory"  element={ <>  <PostSubcategory /></> } />
        <Route path="/category" element={<><PostingCategory /> </> }/>
        <Route path="/subcategory/:categorySlug"  element={<><Subcategory /></>}/>
        <Route path="/edit-category/:slug"  element={<> <EditCategory /> </>} />
        <Route path="/edit-subcategory/:slug" element={<> <EditSubCategory /></>}/>
        <Route path="/posting-product" element={ <><ProductPostPage /></>}/>
        <Route path="/posted-product"  element={<><PostedProductsPage /></>  }/>
        <Route path="/edit-product/:slug" element={ <><EditProductPage/></> } />
        {/* <Route path="/contact" element={ <><ContactDetails/></> } /> */}
        <Route path="/bussinesslisting/create" element={ <Wizard><BussniessListing/></Wizard> } />
        <Route path="/bussinesslisting" element={ <><BusinessListingTable/></> } />
        <Route path="/bussinesslisting/:slug" element={ <><EditBussniessListing/></> } />
        <Route path="/vendor/create" element={ <><Vendor/></> } />
        <Route path="/vendor" element={ <><VendorTable/></> } />
        <Route path="/vendor/:slug" element={<EditVendor />} />
        <Route path='/membership' element={<Membership/>}></Route>
        <Route path="/membership-plan" element={<MembershipPlan />} />
        <Route path="/edit-membership-plan" element={<EditMembershipPlan />} /> 
        <Route path="/profile" element={<Profilepage />} />        
      </Routes>
    </DefaultLayout>
    )
  );
}

export default App;