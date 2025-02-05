import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import '../css/common.css'
import '../css/components.css'
import { Link } from 'react-router'

const Service = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null); 
  const limitedCategories = categories.slice(0, 10);
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
    <div className="catetory-block sp">
      <Container>
        <div className="category-head">
          <h3>Most Popular Categories</h3>
          <span></span>
        </div>
        <div className="cate-count-block">
          <ul className="category_list">
          {limitedCategories.length > 0 ? (
              limitedCategories.map((category) => (
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
                <span className="cate-count"></span>
              </a>
            </li>
              ))
            ) : (
              <li>No categories available</li>
            )}
          </ul>
          <div className="clearfix"></div>
        </div>
        <div className="all-cate-btn browse_all_cat btns-widt">
          <Link to='/categories'>
          <button> Browse All Popular Categories</button>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default Service