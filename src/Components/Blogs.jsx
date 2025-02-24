import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../css/common.css'
import '../css/components.css'

const Blogs = () => {
  return (
    <div className='blog blog-page sp '>
      <Container>
        <Row>
          <Col lg="4">
            <div
              className="blog-box"
              data-aos="zoom-in-up"
              data-aos-duration="1100"
            >
              <div className="image image-anime">
                <img src="https://techxen-react.vercel.app/assets/img/blog/blog-img1.png" alt="" />
              </div>
              <div className="heading">
                <div className="tags">
                  <a href="#">
                    <img src="https://techxen-react.vercel.app/assets/img/icons/blog-icon1.png" alt="" /> John
                    William
                  </a>
                  <a href="#">
                    <img src="https://techxen-react.vercel.app/assets/img/icons/blog-icon2.png" alt="" /> Feb
                    25, 24
                  </a>
                </div>
                <h4>
                  <a href="/blog/blog-details">
                    Demystifying Blockchain: How It is Revolutionising
                    Industries.
                  </a>
                </h4>
                <a className="learn" href="/blog/blog-details">
                  Learn More{" "}
                  <span>
                    <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                  </span>
                </a>
              </div>
            </div>
          </Col>
          {/* <Col lg="4">
            <div
              className="blog-box"
              data-aos="zoom-in-up"
              data-aos-duration="1100"
            >
              <div className="image image-anime">
                <img src="https://techxen-react.vercel.app/assets/img/blog/blog-img1.png" alt="" />
              </div>
              <div className="heading">
                <div className="tags">
                  <a href="#">
                    <img src="https://techxen-react.vercel.app/assets/img/icons/blog-icon1.png" alt="" /> John
                    William
                  </a>
                  <a href="#">
                    <img src="https://techxen-react.vercel.app/assets/img/icons/blog-icon2.png" alt="" /> Feb
                    25, 24
                  </a>
                </div>
                <h4>
                  <a href="/blog/blog-details">
                    Demystifying Blockchain: How It is Revolutionising
                    Industries.
                  </a>
                </h4>
                <a className="learn" href="/blog/blog-details">
                  Learn More{" "}
                  <span>
                    <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                  </span>
                </a>
              </div>
            </div>
          </Col>
          <Col lg="4">
            <div
              className="blog-box"
              data-aos="zoom-in-up"
              data-aos-duration="1100"
            >
              <div className="image image-anime">
                <img src="https://techxen-react.vercel.app/assets/img/blog/blog-img1.png" alt="" />
              </div>
              <div className="heading">
                <div className="tags">
                  <a href="#">
                    <img src="https://techxen-react.vercel.app/assets/img/icons/blog-icon1.png" alt="" /> John
                    William
                  </a>
                  <a href="#">
                    <img src="https://techxen-react.vercel.app/assets/img/icons/blog-icon2.png" alt="" /> Feb
                    25, 24
                  </a>
                </div>
                <h4>
                  <a href="/blog/blog-details">
                    Demystifying Blockchain: How It is Revolutionising
                    Industries.
                  </a>
                </h4>
                <a className="learn" href="/blog/blog-details">
                  Learn More{" "}
                  <span>
                    <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                  </span>
                </a>
              </div>
            </div>
          </Col> */}
        </Row>
      </Container>
    </div>
  );
}

export default Blogs