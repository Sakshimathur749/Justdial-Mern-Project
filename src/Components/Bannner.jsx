import React from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import "../css/common.css";
import '../css/components.css'

const Bannner = () => {
  return (
    <div className="intro-header">
      <Container>
        <Row>
          <Col lg="12">
            <div className="intro-message">
              <h1>
                Discover Your City
                <br />
                <span></span>
              </h1>
              <ul className="list-inline">
                <li>
                  <div className="form-group form-control">
                    <input
                      type="text"
                      className="search-txt city_finder ui-autocomplete-input"
                      id="city_search"
                      placeholder="Enter City "
                      value="Delhi"
                    />
                    <div className="has-feedback">
                      <input
                        type="text"
                        className="search-txt ui-autocomplete-input"
                        placeholder="Search Any Things Like Business ,Category &amp; Deals"
                        id="category_search"
                        name="category_search"
                        value=""
                      />
                      <button
                        className="form-control-feedback search_home_buisness"
                        aria-hidden="true"
                        type="submit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 512 512"><path fill="#e6ab2a" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                      </button>
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