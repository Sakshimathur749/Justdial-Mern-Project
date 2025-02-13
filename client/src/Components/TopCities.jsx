import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../css/common.css'
import '../css/components.css'

const TopCities = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="explore-category sp">
      <Container>
        <Row>
          <div className="exp-category-head text-align-center">
            <h3>Explore Directory Category</h3>
            <span></span>
          </div>
        </Row>
        <Row>
          <div className="resp-tabs-container resp-tab-content-active">
              {products.map((product) => (
                <Col lg="3" md="4" sm="4" className='pb-30'>
                  <a href={`/categories/product/${product.slug}`}>
                    <div className="col-bott-mar blog-box">
                      <div className="first-cate-img image-anime image">
                        <img
                          className="over-img"
                          alt={product.title}
                          style={{ objectFit: "contain", width: "100%" }}
                          src={`http://localhost:5173/src/images/uploads/image/${product.image}`}
                        />
                      </div>
                      <div className="first-cate-white">
                        <div className="f1_container">
                          <div className="f1_card shadow"></div>
                        </div>
                        <div className="resta-name">
                          <h6>
                            <a href={`/categories/product/${product.slug}`}>
                              {product.title}
                            </a>
                          </h6>
                          <span></span>
                        </div>
                        <div className="resta-content">{product.location}</div>
                        <div className="resta-rating-block">
                        {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        height={17}
                        width={17}
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill={index < product.rating ? "#FFD700" : "#7f7f7f"}
                          d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                        />
                      </svg>
                    ))}
                        </div>
                      </div>
                    </div>
                  </a>
                </Col>
              ))}
            </div>
        </Row>
      </Container>
    </div>
  );
}

export default TopCities