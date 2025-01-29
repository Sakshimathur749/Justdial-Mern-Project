import React from "react";
import {Row,Col,Container,} from "react-bootstrap";
import "../css/common.css";
import "../css/card.css";
const Cards = () => {
  return (
    <div className="sp">
      <Container>
        <Row className="justify-content-between">
          <Col lg="5" md='12' className="card-container">
            <h3>Catering</h3><hr/>
            <Row className="card-grid">
              <Col lg="5" className="card-box">
                <img
                  src="https://techxen-react.vercel.app/assets/img/icons/work-iocn1.png"
                  alt=""
                />
                <h5>Heading 1</h5>
              </Col>
              <Col lg="5" className="card-box">
                <img
                  src="https://techxen-react.vercel.app/assets/img/icons/work-iocn1.png"
                  alt=""
                />
                <h5>Heading 1</h5>
              </Col>
              <Col lg="5" className="card-box">
                <img
                  src="https://techxen-react.vercel.app/assets/img/icons/work-iocn1.png"
                  alt=""
                />
                <h5>Heading 1</h5>
              </Col>
              <Col lg="5" className="card-box">
                <img
                  src="https://techxen-react.vercel.app/assets/img/icons/work-iocn1.png"
                  alt=""
                />
                <h5>Heading 1</h5>
              </Col>
            </Row>
          </Col>
          {/* <Col lg="5" className="card-container">
            <h3>Catering</h3><hr/>
            <Row className="card-grid">
              <Col lg="5" className="card-box">
                <img
                  src="https://techxen-react.vercel.app/assets/img/icons/work-iocn1.png"
                  alt=""
                />
                <h5>Heading 1</h5>
              </Col>
              <Col lg="5" className="card-box">
                <img
                  src="https://techxen-react.vercel.app/assets/img/icons/work-iocn1.png"
                  alt=""
                />
                <h5>Heading 1</h5>
              </Col>
              <Col lg="5" className="card-box">
                <img
                  src="https://techxen-react.vercel.app/assets/img/icons/work-iocn1.png"
                  alt=""
                />
                <h5>Heading 1</h5>
              </Col>
              <Col lg="5" className="card-box">
                <img
                  src="https://techxen-react.vercel.app/assets/img/icons/work-iocn1.png"
                  alt=""
                />
                <h5>Heading 1</h5>
              </Col>
            </Row>
          </Col> */}
        </Row>
      </Container>
    </div>
  );
};
export default Cards;