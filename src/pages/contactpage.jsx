import React from 'react'
import SearchBanner from '../Components/SearchBanner';
import ContactUs from '../Components/ContactUs';
import Breadcrumb from '../Components/Breadcrumb';

const Contactpage = () => {
    const breadcrumbs = [
        { label: 'Home', link: '/' },
        { label: 'Contact', link: '/contact' },
      ];
  return (
    <div>
        <SearchBanner/>
        <Breadcrumb breadcrumbs={breadcrumbs}/>
        <ContactUs/>
    </div>
  )
}

export default Contactpage
