import React from 'react'
import '../css/common.css'
import '../css/components.css'
import { Col, Container, Row } from 'react-bootstrap'

const Subcategories = () => {
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
                  Popular Categories
                </div>
                <div className="bor_head">&nbsp;</div>
                <ul className="">
                  <li className="brdr has-sub">
                    <a href="/categories/product">
                      <img
                        src="https://buyphpcode.com/justdialclone/assets/front/images/shape.png"
                        alt=""
                      />
                      <span>Car Repair</span>
                    </a>
                  </li>
                  <hr className="nn" />
                </ul>
                <ul className="">
                  <li className="brdr has-sub">
                    <a href="/categories/product">
                      <img
                        src="https://buyphpcode.com/justdialclone/assets/front/images/shape.png"
                        alt=""
                      />
                      <span>Car Tyres</span>
                    </a>
                  </li>
                  <hr className="nn" />
                </ul>
                <ul className="">
                  <li className="brdr has-sub">
                    <a href="/categories/product">
                      <img
                        src="https://buyphpcode.com/justdialclone/assets/front/images/shape.png"
                        alt=""
                      />
                      <span>Car Batteries</span>
                    </a>
                  </li>
                  <hr className="nn" />
                </ul>
                <ul className="">
                  <li className="brdr has-sub">
                    <a href="/categories/product">
                      <img
                        src="https://buyphpcode.com/justdialclone/assets/front/images/shape.png"
                        alt=""
                      />
                      <span>Car Accessories</span>
                    </a>
                  </li>
                  <hr className="nn" />
                </ul>
                <ul className="">
                  <li className="brdr has-sub">
                    <a href="/categories/product">
                      <img
                        src="https://buyphpcode.com/justdialclone/assets/front/images/shape.png"
                        alt=""
                      />
                      <span>Car Wash</span>
                    </a>
                  </li>
                  <hr className="nn" />
                </ul>
                <ul className="">
                  <li className="brdr has-sub">
                    <a href="/categories/product">
                      <img
                        src="https://buyphpcode.com/justdialclone/assets/front/images/shape.png"
                        alt=""
                      />
                      <span>Motorcycle Repair</span>
                    </a>
                  </li>
                  <hr className="nn" />
                </ul>
                <ul className="">
                  <li className="brdr has-sub">
                    <a href="/categories/product">
                      <img
                        src="https://buyphpcode.com/justdialclone/assets/front/images/shape.png"
                        alt=""
                      />
                      <span>Scooter Repair</span>
                    </a>
                  </li>
                  <hr className="nn" />
                </ul>
                <ul className="">
                  <li className="brdr has-sub">
                    <a href="/categories/product">
                      <img
                        src="https://buyphpcode.com/justdialclone/assets/front/images/shape.png"
                        alt=""
                      />
                      <span>Two Wheeler Tyres</span>
                    </a>
                  </li>
                  <hr className="nn" />
                </ul>
                <ul className="">
                  <li className="brdr has-sub">
                    <a href="/categories/product">
                      <img
                        src="https://buyphpcode.com/justdialclone/assets/front/images/shape.png"
                        alt=""
                      />
                      <span>Two Wheeler Batteries</span>
                    </a>
                  </li>
                  <hr className="nn" />
                </ul>
                <ul className="">
                  <li className="brdr has-sub">
                    <a href="/categories/product">
                      <img
                        src="https://buyphpcode.com/justdialclone/assets/front/images/shape.png"
                        alt=""
                      />
                      <span>Two Wheeler Accessories</span>
                    </a>
                  </li>
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