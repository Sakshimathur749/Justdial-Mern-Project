import React from 'react'
import '../css/common.css'
import '../css/components.css'
import { Container, Row ,Col, Carousel} from 'react-bootstrap'

const Product = () => {
  return (
    <div className="gry_container">
      <Container>
        <Row>
          <Col lg="12" md="12" sm="12">
            <ol className="breadcrumb">
              <span>You are here:{""}</span>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/categories">Category</a>
              </li>
              <li className="active">Products</li>
            </ol>
          </Col>
        </Row>
      </Container>
      <hr />
      <Container>
        <Row>
          <h1>Best Deals - Top Hotels in Dwarka Sector 11, Delhi</h1>          
        </Row>
        <Row>
          <Col lg='8'>
          <div>
            <Col lg='3'>
            <Carousel>
              <Carousel.Item><img src="" alt="" /></Carousel.Item>
            </Carousel>
            </Col>
            <Col lg='5'>
            <h3></h3>
            <p></p>
            </Col>
          </div>
          </Col>
          <Col lg='4'></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Product