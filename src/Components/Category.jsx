import React from 'react'
import '../css/common.css'
import '../css/components.css'
import { Col, Container, Row } from 'react-bootstrap'

const Category = () => {
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
              <li>
                <a href="/categories/subcategories">
                  <span className="cate-img">
                    <img
                      src="https://buyphpcode.com/justdialclone/uploads/category/10287d42b8708f70144942dd8cc82f12762ce9bb.jpeg"
                      alt=""
                      height="30px"
                      width="30px"
                    />
                  </span>
                  <span className="cate-txt">Shopping</span>
                </a>
              </li>
              {/* <li>
                <a href="/categories/subcategories">
                  <span className="cate-img">
                    <img
                      src="https://buyphpcode.com/justdialclone/uploads/category/1625817f150972bb60d9c15cab3106484308cb46.png"
                      alt=""
                      height="30px"
                      width="30px"
                    />
                  </span>
                  <span className="cate-txt">Security Services</span>
                </a>
              </li> */}
              {/* <li>
                <a href="/categories/subcategories">
                  <span className="cate-img">
                    <img
                      src="https://buyphpcode.com/justdialclone/uploads/category/default_category.png"
                      alt=""
                      height="30px"
                      width="30px"
                    />
                  </span>
                  <span className="cate-txt">Choclates</span>
                </a>
              </li>
              <li>
                <a href="/categories/subcategories">
                  <span className="cate-img">
                    <img
                      src="https://buyphpcode.com/justdialclone/uploads/category/default_category.png"
                      alt=""
                      height="30px"
                      width="30px"
                    />
                  </span>
                  <span className="cate-txt">TestCat</span>
                </a>
              </li> */}
            </ul>
            <div className="clearfix"></div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Category