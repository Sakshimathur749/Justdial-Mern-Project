import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const HowitsWork = () => {
  return (
    <div className='sp'>
      <Container>
        <Row>
          <div className="how-it-work-block">
            <div className="category-head how-it">
              <h3>How It Work</h3>
              <span></span>
            </div>
            <Row>
              <Col lg="4" sm="4" md="4">
                <div className="what-to-do">
                  <div className="f1_container-tow">
                    <div className="f1_card">
                      <div className="front face">
                        <img
                          src="https://buyphpcode.com/justdialclone/assets/front/images/how-to-img1.png"
                          alt=""
                        />{" "}
                      </div>
                    </div>
                  </div>
                  <h4>
                    <a href="#">Choose What To Do</a>
                  </h4>
                  <h6>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                  </h6>
                </div>
              </Col>
              <Col lg="4" sm="4" md="4">
                <div className="what-to-do">
                  <div className="f1_container-tow">
                    <div className="f1_card">
                      <div className="front face">
                        <img
                          src="https://buyphpcode.com/justdialclone/assets/front/images/how-to-img2.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <h4>
                    <a href="#">Find What You Want</a>
                  </h4>
                  <h6>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                  </h6>
                </div>
              </Col>
              <Col lg="4" sm="4" md="4">
                <div className="what-to-do">
                  <div className="f1_container-tow">
                    <div className="f1_card">
                      <div className="front face">
                        <img
                          src="https://buyphpcode.com/justdialclone/assets/front/images/how-to-img3.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <h4>
                    <a href="#">Explore Amazing Places</a>
                  </h4>
                  <h6>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                  </h6>
                </div>
              </Col>
            </Row>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default HowitsWork
