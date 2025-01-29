import React from 'react'
import SearchBanner from '../Components/SearchBanner'
import Category from '../Components/Category'
import Breadcrumb from '../Components/Breadcrumb';

const Categories = () => {
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'All Categories', link: '/categories' },
  ];
  return (
    <div>
        <SearchBanner/>   
        <Breadcrumb breadcrumbs={breadcrumbs}/>
        <Category/>   
    </div>
  )
}

export default Categories