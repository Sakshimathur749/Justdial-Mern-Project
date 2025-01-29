import React from 'react'
import { Container, Row } from 'react-bootstrap'
import '../css/common.css'
import '../css/components.css'
import { Link } from 'react-router'

const Service = () => {
  return (
    <div className="catetory-block sp">
      <Container>
        <div className="category-head">
          <h3>Most Popular Categories</h3>
          <span></span>
        </div>
        <div className="cate-count-block">
          <ul className="category_list">
            <li>
              <a href="/categories/subcategories">
                <span className="cate-img">
                  <img
                    src="https://buyphpcode.com/justdialclone/uploads/category/75455afac4846c5e9add1dd2dc33c8d669fb52b6.png"
                    alt=""
                    height="30px"
                    width="30px"
                  />
                </span>
                <span className="cate-txt">Restaurants</span>
                <span className="cate-count"></span>
              </a>
            </li>
            {/* <li>
              <a href="/categories/subcategories">
                <span className="cate-img">
                  <img
                    src="https://buyphpcode.com/justdialclone/uploads/category/113e444d7f3aafaf0dc4e18fd5caff3b770430db.png"
                    alt=""
                    height="30px"
                    width="30px"
                  />
                </span>
                <span className="cate-txt">Industrial Products</span>
                <span className="cate-count"></span>
              </a>
            </li> */}
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