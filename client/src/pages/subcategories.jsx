import React from 'react'
import SearchBanner from '../Components/SearchBanner'
import Subcategory from '../Components/Subcategories'
import Breadcrumb from '../Components/Breadcrumb'
const Subcategories = () => {
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Auto care ', link: '/categories/subcategories' },
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