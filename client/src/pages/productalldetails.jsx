import React from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import SearchBanner from '../Components/SearchBanner';
import ContactDetail from '../Components/ContactDetail';
import ProductDetail from '../Components/ProductDetail';
import Relatedproduct from '../Components/Relatedproduct';
import '../css/components.css'
const Productalldetails = () => {
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Category', link: '/categories' },
    { label: 'Restaurent', link: '/categories/subcategories' },
    { label: 'Berris Pizza Cafe', link: '/state/location' },
  ];
  return (
    <div>
      <SearchBanner/>
      <Breadcrumb breadcrumbs={breadcrumbs}/>
      <div className="d-flex p-5 gap-4 justify-content-center mb-5 flex-wrap">
      <div className="col-3 col-md-12 product-right">
      <ContactDetail/>
      </div>
      <div className="col-8 col-md-12 product-left">
      <ProductDetail/>
      <Relatedproduct/>
      </div>
      </div>
    </div>
  )
}

export default Productalldetails
