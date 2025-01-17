import React from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import "../css/common.css";
import '../css/components.css'

const Bannner = () => {
  return (
    <div className="intro-header">
      <Container>
        <Row>
          <Col lg='12'>
            <div className="intro-message">
              <h1>
                Discover Your City
                <br />
                <span></span>
              </h1>
              <ul>
                  <li>
                    <div  style={{ display: "flex", padding: "0px 20px", justifyContent:'center' }}>
                      <div className="form-group flex-wrap form-control">
                      <Col lg='3' md='12' className="d-flex justify-content-center align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft:'20px'}} viewBox="0 0 384 512" height={20} width={20} fill=""><path fill="" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                        <label htmlFor=""></label>
                        <select name="" id="" className="select">
                          <option value="">Delhi</option>
                          <option value="">Punjab</option>
                          <option value="">Rajasthan</option>
                          <option value="">Harayana</option>
                          <option value="">Rajasthan</option>
                          <option value="">Harayana</option>
                        </select>
                      </Col>
                      <Col lg='9' md='12' className="d-flex" >
                        <input
                          type="text"
                          placeholder="Search Any Things Like Business ,Category & Deals"
                          className="search-txt"
                        />
                        <button className="form-control-feedback search_home_buisness" aria-hidden="true" type="submit"><img src="https://buyphpcode.com/justdialclone/assets/front/images/home_search.png" alt=""/></button>
                      </Col>
                      </div>
                    </div>
                  </li>
                </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Bannner;