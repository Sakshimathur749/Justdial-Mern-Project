import React from 'react'
import SearchBanner from '../Components/SearchBanner'
import Subcategory from '../Components/Subcategories'
import Breadcrumb from '../Components/Breadcrumb'
import { useParams } from 'react-router'
const Subcategories = () => {
  const { categoryName } = useParams();
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: categoryName, link: `/categories/${categoryName}` },
  ];
  return (
    <div>
      <SearchBanner/>
      <Breadcrumb breadcrumbs={breadcrumbs}/>
      <Subcategory/>
    </div>
  )
}

export default Subcategories