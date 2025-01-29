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
              <ul class="list-inline">
                <li>
                  <div class="form-group form-control">
                    <input
                      type="hidden"
                      name="_token"
                      value="k90CgGLurJz55qzyHp5Wu2g0DzxV83KxnKfSNYp9"
                    />
                    <input
                      type="text"
                      class="search-txt city_finder ui-autocomplete-input"
                      id="city_search"
                      placeholder="Enter City "
                      value="Delhi"
                    />
                    <input
                      type="hidden"
                      id="city_id"
                      name="city_id"
                      value="/"
                    />
                    <div class="has-feedback">
                      <input
                        type="text"
                        class="search-txt ui-autocomplete-input"
                        placeholder="Search Any Things Like Business ,Category &amp; Deals"
                        id="category_search"
                        name="category_search"
                        value=""
                      />
                      <input
                        type="hidden"
                        id="category_id"
                        name="category_id"
                        value="0"
                      />

                      <button
                        class="form-control-feedback search_home_buisness"
                        aria-hidden="true"
                        type="submit"
                      >
                        <img
                          src="https://buyphpcode.com/justdialclone/assets/front/images/home_search.png"
                          alt=""
                        />
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