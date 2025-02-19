import React, { useEffect, useState } from 'react'
import '../css/common.css'
import '../css/components.css'
import { Col, Container, Row } from 'react-bootstrap'
const Category = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null); 
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/categories'); 
          if (!response.ok) {
            throw new Error('Failed to fetch categories');
          }
          const data = await response.json();
          setCategories(data); 
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false); 
        }
      };
      
      fetchCategories();
    }, []); 
    if (loading) {
      return <div>Loading...</div>; 
    }
    if (error) {
      return <div>Error: {error}</div>; 
    }
  return (
    <div className="gry_container mb-5">
      <Container>
        <Row>
          <div className="category-head">
            <h3>All Categories</h3>
            <span></span>
          </div>
          <div className="cate-count-block">
            <ul className="category_list">
            {categories.length > 0 ? (
              categories.map((category) => (
            <li key={category._id}>
                <a href={`/categories/${category.slug}`}>
                  <span className="cate-img">
                    <img
                      src={`http://localhost:5173/src/images/category_uploads/${category.image}`}
                      alt=""
                      height="30px"
                      width="30px"
                    />
                  </span>
                  <span className="cate-txt">{category.name}</span>
                </a>
              </li>
               ))
              ) : (
                <li>No categories available</li>
              )}
            </ul>
            <div className="clearfix"></div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Category