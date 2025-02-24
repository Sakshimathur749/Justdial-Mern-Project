import React from 'react'
import SearchBanner from '../Components/SearchBanner'
import Breadcrumb from '../Components/Breadcrumb';
import AboutUs from '../Components/AboutUs';

const Aboutpage = () => {
    const breadcrumbs = [
        { label: 'Home', link: '/' },
        { label: 'About', link: '/about' },
      ];
  return (
    <div>
        <SearchBanner/>
        <Breadcrumb breadcrumbs={breadcrumbs}/>
        <AboutUs/>
    </div>
  )
}

export default Aboutpage
