import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import Viewbussiness from './pages/BussinessListing/viewbussiness';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [profileIncomplete, setProfileIncomplete] = useState<any>(false); 
  const { pathname } = useLocation();
  const role = localStorage.getItem('role');
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('uitoken');
    if (token) {
      localStorage.setItem("token", token);
    }
    const vendortoken = localStorage.getItem('token');
    if (vendortoken) {
      console.log('Token found:', vendortoken);
    } else {
      console.log('No token found');
    }
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
  
  const isVendorCreated = localStorage.getItem('isVendorCreated') === 'true';
  if (role === 'vendor' && profileIncomplete && pathname !== '/profile') {
    return <Navigate to="/profile" />;
  }
  if (role === 'vendor' && !isVendorCreated && pathname !== '/dashboard') {
    return <Navigate to="/dashboard" />;
  }
  return loading ? (
    <Loader />
  ) :   (
    <DefaultLayout>
      <Routes>
        <Route path='/dashboard'  element={<><ECommerce profileIncomplete={profileIncomplete}/></>}/>
        <Route path="/post-category" element={<> <PostCategory /></>}/>
        <Route path="/post-subcategory"  element={ <>  <PostSubcategory /></> } />
        <Route path="/vendor/create" element={ <><Vendor/></> } />
        <Route path="/category" element={<><PostingCategory /> </> }/>
        <Route path="/subcategory/:categorySlug"  element={<><Subcategory /></>}/>
        <Route path="/edit-category/:slug"  element={<> <EditCategory /> </>} />
        <Route path="/edit-subcategory/:slug" element={<> <EditSubCategory /></>}/>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/posting-product" element={ <><ProductPostPage /></>}/>
        <Route path="/posted-product"  element={<><PostedProductsPage /></>  }/>
        <Route path="/edit-product/:slug" element={ <><EditProductPage/></> } />
        {/* <Route path="/contact" element={ <><ContactDetails/></> } /> */}
        <Route path="/bussinesslisting/create" element={ <><BussniessListing/></> } />
        <Route path="/bussinesslisting" element={ <><BusinessListingTable/></> } />
        <Route path="/bussinesslisting/:slug" element={ <><Viewbussiness/></> } />
        <Route path="/vendor/create" element={ <><Vendor/></> } />
        <Route path="/vendor" element={ <><VendorTable/></> } />
        <Route path="/vendor/:slug" element={<EditVendor />} />
        <Route path='/membership' element={<Membership/>}></Route>
        <Route path="/membership-plan" element={<MembershipPlan />} />
        <Route path="/edit-membership-plan" element={<EditMembershipPlan />} /> 
        <Route path="/profile" element={<Profilepage profileIncomplete={profileIncomplete}/>} />        
      </Routes>
    </DefaultLayout>
    );
}

export default App;