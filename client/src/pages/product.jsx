import React, { useEffect, useState } from 'react'
import Product from '../Components/Product'
import SearchBanner from '../Components/SearchBanner'
import Breadcrumb from '../Components/Breadcrumb';
import { useParams } from 'react-router';

const Products = () => {
  const { category, subcategory } = useParams();
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: category, link: `/categories` },
    { label: subcategory, link: `/categories/${category}` },
    { label: 'Products', link: `/categories/${category}/${subcategory}/products` },
  ];

  return (
    <div>
      <SearchBanner/>
      <Breadcrumb breadcrumbs={breadcrumbs}/>
      <Product category={category} subcategory={subcategory}/>
    </div>
  )
}

export default Products