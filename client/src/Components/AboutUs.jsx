import React from 'react'
import { Container, Row ,Col} from 'react-bootstrap'
import '../css/common.css';
import '../css/components.css';
const AboutUs = () => {
    return (
        <div>
            <div className="gry_container sp">
                <Container>
                    <Row>
                        <Col lg='1'>&nbsp;</Col>
                        <Col lg='10' md='12' sm='12' >
                            <div className="text_about">
                               <h5> Listable provides you with a smart set of tools to showcase your business and connect to your community.<br /> Beautiful, simple and easy to use, Listable is a fun and friendly place to hook up with your customers.</h5>
                            </div>
                            <Row>
                                <Col lg='6' md='6' sm='6' className="abot_img_l"><img src="https://buyphpcode.com/justdialclone/assets/front/images/about_us_1.png" alt="Add or Claim your Listing" /></Col>
                                <Col lg='6' md='6' sm='6'  >
                                    <div className="about_box">
                                        <div className="steps_about">1. Add or Claim your Listing</div>
                                        <div className="sub-text-about">Upload photos, add helpful links to your website or to social media, set an address and hours of operation and other informations that you may find relevant.</div>
                                        <div className="link_about"><a href="#">See How a Claimed Listings Looks <img src="https://buyphpcode.com/justdialclone/assets/front/images/arrow.png" alt="arrow" /></a></div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg='6' md='6' sm='6' >
                                    <div className="about_box">
                                        <div className="steps_about">2. Get Discovered by Visitors</div>
                                        <div className="sub-text-about">Upon confirmation, your listing will appear throughout the website and will be searchable by visitors interested on similar places. A badge will be added to your listing to mark it as official.</div>
                                        <div className="link_about"><a href="#">See How a Claimed Listings Looks <img className="abot_img" src="https://buyphpcode.com/justdialclone/assets/front/images/arrow.png" alt="arrow" /></a></div>
                                    </div>
                                </Col>
                                <Col lg='6' md='6' sm='6' className="abot_img_r"><img src="https://buyphpcode.com/justdialclone/assets/front/images/about_us_1.png" alt="2. Get Discovered by Visitors" /></Col>
                            </Row>
                            <Row>
                                <Col lg='6' md='6' sm='6' className="abot_img_l"><img src="https://buyphpcode.com/justdialclone/assets/front/images/about_us_3.png" alt="Increase your earnings" /></Col>
                                <Col lg='6' md='6' sm='6' >
                                    <div className="about_box">
                                        <div className="steps_about">3. Increase your earnings</div>
                                        <div className="sub-text-about">Upon confirmation, your listing will appear throughout the website and will be searchable by visitors interested on similar places. A badge will be added to your listing to mark it as official.</div>
                                        <div className="link_about"><a href="#">Find and Claim Your Business <img src="https://buyphpcode.com/justdialclone/assets/front/images/arrow.png" alt="arrow" /></a></div>
                                    </div>
                                </Col>
                            </Row>
                            <div className="text_a"> Ready to reach all of the people who matter most to your business?</div>
                            <div className="post_org">
                                <a data-toggle="modal" id="open_register" data-target="#reg_poup" className="btn btn-post right-flt" onclick="set_flag()">Add Your Listing Now </a>                         </div>
                        </Col>
                        <Col lg='1'>&nbsp;</Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default AboutUs