import React from 'react'
import { Container , Row, Col} from 'react-bootstrap'
import '../css/common.css'
import '../css/components.css'

const ContactDetail = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col lg ='12' md='12' sm='12'>
            <div className="categories_sect sidebar-nav">
              <div className="sidebar-brand">
                <img
                  src="https://buyphpcode.com/justdialclone/assets/front/images/also-listed.png"
                  alt="also listed"
                />
                Also Listed in
                <span className="spe_mobile1">
                  <a href="#"></a>
                </span>
              </div>
              <div className="bor_head">&nbsp;</div>
              <ul className="spe_submobile1">
                <li className="brdr">
                  <a href="https://buyphpcode.com/justdialclone/389/all-options/ct-11">
                    Trending
                  </a>
                </li>
                <li className="brdr">
                  <a href="https://buyphpcode.com/justdialclone/389/all-options/ct-12">
                    Home Delivery
                  </a>
                </li>
              </ul>
              <div className="clearfix"></div>
            </div>
            <div className="categories_sect sidebar-nav" id="business_times_div">
              <div className="sidebar-brand">
                <img
                  src="https://buyphpcode.com/justdialclone/assets/front/images/hours-of-operation.png"
                  alt="Hours of Operation"
                />
                Hours of Operation
                <span className="spe_mobile2">
                  <a href="#"></a>
                </span>
              </div>
              <div className="bor_head">&nbsp;</div>
              <ul className="spe_submobile2">
                <li className="brdr">
                  <a href="#">
                    {" "}
                    <span className="days-cat">Monday</span> <span> :</span>{" "}
                    <span className="time-cat"> 8:00 AM - 9:00 PM </span>
                  </a>
                </li>

                <li className="brdr">
                  <a href="#">
                    <span className="days-cat">Tuesday </span> <span> :</span>{" "}
                    <span className="time-cat"> 8:00 AM - 9:00 PM </span>
                  </a>
                </li>

                <li className="brdr">
                  <a href="#">
                    <span className="days-cat">Wednesday </span> <span> :</span>{" "}
                    <span className="time-cat"> 8:00 AM - 9:00 PM </span>
                  </a>
                </li>

                <li className="brdr">
                  <a href="#">
                    <span className="days-cat"> Thursday</span> <span> :</span>{" "}
                    <span className="time-cat">8:00 AM - 9:00 PM </span>
                  </a>
                </li>

                <li className="brdr">
                  <a href="#">
                    <span className="days-cat">Friday</span> <span> :</span>{" "}
                    <span className="time-cat">8:00 AM - 9:00 PM </span>
                  </a>
                </li>

                <li className="brdr">
                  <a href="#">
                    <span className="days-cat">Saturday</span> <span> :</span>{" "}
                    <span className="time-cat">8:00 AM - 9:00 PM </span>
                  </a>
                </li>

                <li className="brdr">
                  <a href="#">
                    <span className="days-cat">Sunday </span> <span> :</span>
                    <span className="time-cat"> 8:00 AM - 9:00 PM</span>
                  </a>
                </li>
              </ul>
              <div className="clearfix"></div>
            </div>

            <div className="categories_sect sidebar-nav">
              <div className="sidebar-brand">
                <img
                  src="https://buyphpcode.com/justdialclone/assets/front/images/services.png"
                  alt="services"
                />
                Services
                <span className="spe_mobile3">
                  <a href="#"></a>
                </span>
              </div>
              <div className="bor_head">&nbsp;</div>
              <ul className="spe_submobile3">
                <span className="col-sm-3 col-md-3 col-lg-12 px-4">
                  No Service Available.
                </span>
              </ul>

              <div className="clearfix"></div>
            </div>
            <div className="categories_sect sidebar-nav">
              <div className="sidebar-brand">
                <img
                  src="https://buyphpcode.com/justdialclone/assets/front/images/money.png"
                  alt="services"
                />
                Modes Of Payment
                <span className="spe_mobile3">
                  <a href="#"></a>
                </span>
              </div>
              <div className="bor_head">&nbsp;</div>
              <ul className="spe_submobile3">
                <span className="col-sm-3 col-md-3 col-lg-12  px-4">
                  No Payment Mode Available.
                </span>
              </ul>

              <div className="clearfix"></div>
            </div>
            <div className="categories_sect sidebar-nav">
              <div className="sidebar-brand">
                <img
                  src="https://buyphpcode.com/justdialclone/assets/front/images/info-icns.png"
                  alt="services"
                />
                About Me
                <span className="spe_mobile3">
                  <a href="#"></a>
                </span>
              </div>
              <div className="bor_head">&nbsp;</div>
              <ul className="spe_submobile3"></ul>
              <div className="clearfix"></div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactDetail
