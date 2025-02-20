import React, { useEffect, useState } from 'react'
import SearchBanner from '../Components/SearchBanner'
import Breadcrumb from '../Components/Breadcrumb';
import { useParams } from 'react-router';
import PrivacyPolicy from '../Components/privacy&policy';

const PrivacyandPolicy = () => {
    const { category, subcategory } = useParams();
    const breadcrumbs = [
        { label: 'Home', link: '/' },
        { label: 'Privacy & Policy', link: `/privacy&policy` },
    ];

    return (
        <div>
            <SearchBanner />
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <PrivacyPolicy />
        </div>
    )
}

export default PrivacyandPolicy