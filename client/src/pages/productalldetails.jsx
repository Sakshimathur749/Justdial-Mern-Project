import React, { useEffect, useState } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import SearchBanner from '../Components/SearchBanner';
import ContactDetail from '../Components/ContactDetail';
import ProductDetail from '../Components/ProductDetail';
import Relatedproduct from '../Components/Relatedproduct';
import '../css/components.css'
import { useParams } from 'react-router';
import Map from '../Components/Map';
const Productalldetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
 
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Category', link: '/categories' },
    { label: 'Restaurent', link: '/categories/subcategories' },
    { label: 'Berris Pizza Cafe', link: '/state/location' },
  ];
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/products/slug/${slug}`); 
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        console.log(data)
        setProduct(data);
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchProductData();
  }, [slug]); 
  return (
    <div>
      <SearchBanner/>
      <Breadcrumb breadcrumbs={breadcrumbs}/>
      <div className="d-flex p-5 gap-4 justify-content-center flex-wrap">
      <div className="col-3 col-md-12 product-right">
      <ContactDetail/>
      </div>
      <div className="col-8 col-md-12 product-left">
      <ProductDetail slug={slug}/>
      {/* <Relatedproduct/> */}
      </div>
      </div>
      <div>
    </div>
    <Map location={product?.mapEmbedLink} />
    </div>
  )
}

export default Productalldetails