import React from 'react'
import Product from '../Components/Product'
import SearchBanner from '../Components/SearchBanner'
import Breadcrumb from '../Components/Breadcrumb';

const Products = () => {
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Category', link: '/categories' },
    { label: 'Products', link: '/categories/product' },
  ];
  return (
    <div>
      <SearchBanner/>
      <Breadcrumb breadcrumbs={breadcrumbs}/>
      <Product/>
    </div>
  )
}

export default Products