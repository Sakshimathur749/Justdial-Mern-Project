import React, { useEffect, useState } from 'react'
import Product from '../Components/Product'
import SearchBanner from '../Components/SearchBanner'
import Breadcrumb from '../Components/Breadcrumb';
import { useParams } from 'react-router';

const Products = () => {
  const { category, subcategory } = useParams();  
  const [products, setProducts] = useState([]);   
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState('');         
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Category', link: `/categories` },
    { label: 'Subcategory', link: `/categories/${category}` },
    { label: 'Products', link: `/categories/${category}/${subcategory}/products` },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);  
      }
    };
   fetchProducts();
  }, []); 
  if (loading) {
    return <div>Loading...</div>;  
  }
  if (error) {
    return <div>Error: {error}</div>;  
  }
  return (
    <div>
      <SearchBanner/>
      <Breadcrumb breadcrumbs={breadcrumbs}/>
      <Product category={category} subcategory={subcategory}/>
    </div>
  )
}

export default Products