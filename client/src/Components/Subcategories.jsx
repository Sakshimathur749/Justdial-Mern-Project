import React, { useEffect, useState } from 'react'
import '../css/common.css'
import '../css/components.css'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router'

const Subcategories = () => {
  const { categoryName } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();

        const category = data.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
        if (category) {
          setSubcategories(category.subcategories);
        } else {
          setError('Category not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [categoryName]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="gry_container mb-5" >
      <Container>
        <Row>
          <Col lg='1'>&nbsp;</Col>
          <Col lg='10' md='12' sm='12'>
            <div className="my_whit_bg">
              <div className="title_acc">
                {" "}
                Refine your search by clicking any of the links below{" "}
              </div>
              <div className="categories_sect sidebar-nav slide_m">
                <div className="sidebar-brand">
                  <img
                    src="https://buyphpcode.com/justdialclone/assets/front/images/shapes.png"
                    alt=""
                  />
                  {categoryName}
                </div>
                <div className="bor_head">&nbsp;</div>
                <ul className="">{subcategories.length > 0 ? (
                    subcategories.map((subcategory, index) => (
                      <li key={index} className="brdr has-sub">
                        <a href={`/categories/product`}>
                      <img
                        src="https://buyphpcode.com/justdialclone/assets/front/images/shape.png"
                        alt=""
                      />
                      <span>{subcategory.name}</span>
                    </a>
                  </li> ))
                  ) : (
                    <li>No subcategories available</li>
                  )}
                  <hr className="nn" />
                  
                </ul>
                <div className="clearfix"></div>
              </div>
            </div>
          </Col>
          <div className="col-lg-1">&nbsp;</div>
        </Row>
      </Container>
    </div>
  );
}

export default Subcategories