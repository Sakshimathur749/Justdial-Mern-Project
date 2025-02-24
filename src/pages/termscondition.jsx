import React, { useEffect, useState } from 'react'
import SearchBanner from '../Components/SearchBanner'
import Breadcrumb from '../Components/Breadcrumb';
import { useParams } from 'react-router';
import TermsAndConditions from '../Components/terms&condition';

const TermsandCondition = () => {
    const { category, subcategory } = useParams();
    const breadcrumbs = [
        { label: 'Home', link: '/' },
        { label: 'Terms & Condition', link: `/terms&condition` },
    ];

    return (
        <div>
            <SearchBanner />
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <TermsAndConditions />
        </div>
    )
}

export default TermsandCondition