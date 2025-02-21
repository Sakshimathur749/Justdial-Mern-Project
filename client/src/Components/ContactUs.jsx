import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../css/common.css';
import '../css/components.css';
const ContactUs = () => {
    return (
        <div>
            <div class="gry_container sp">
                <Container>
                    <Row>
                        <Col lg='12' md='12' sm='12'>
                            <Row>
                                <Col lg='6' md='6' sm='6'>
                                    <div class="box_contact">
                                        <form class="form-horizontal" id="contact_form" method="POST">
                                            <input type="hidden" name="_token" value="MRKg7NWMzLsGW5vf1h2VkSWVdRfk6GsLNufEQaoY" />
                                            <div class="gren_bor_title">GET IN TOUCH</div>
                                            <div class="bor_grn">&nbsp;</div>
                                            <div class="user_box">
                                                <input class="input_acct " type="text" name="name" id="name" value="Admin" placeholder="Name" />
                                                <div class="error_msg" id="err_name"></div>
                                            </div>
                                            <div class="user_box">
                                                <input class="input_acct" type="text" name="mobile_no" id="mobile_no" value="1111111111" placeholder="Mobile No" />
                                                <div class="error_msg" id="err_mobile_no"></div>
                                            </div>
                                            <div class="user_box">
                                                <input class="input_acct" type="text" name="email" id="email" value="admin@gmail.com" placeholder="Email" />
                                                <div class="error_msg" id="err_email"></div>
                                            </div>
                                            <div class="user_box">
                                                <textarea class="textarea_box" name="message" id="message" placeholder="Message" type=""></textarea>
                                                <div class="error_msg" id="err_message"></div></div>
                                            <br />
                                            <button class="pull-left btn btn-post" id="contact_submit" type="submit" name="contact_submit">Submit now</button>
                                        </form>
                                        <div class="clr"></div>
                                    </div>

                                </Col>
                                <Col lg='6' md='6' sm='6'>
                                    <div class="box_contact">
                                        <div class="row">
                                            <div class="col-sm-12 col-md-12 col-lg-6">
                                                <div class="gren_bor_title">Locate us</div>
                                                <div class="bor_grn">&nbsp;</div>
                                                <div class="user_box">
                                                    <span><img src="https://buyphpcode.com/justdialclone/assets/front/images/map.png" alt="contcat us map" /></span>
                                                    <div class="addrsss">16, Officers Colony, Adambakkam, Chennai 600088.</div>
                                                    <input type="hidden" id="site_address" value="16, Officers Colony, Adambakkam, Chennai 600088." />             </div>
                                                <div class="user_box">
                                                    <span><img src="https://buyphpcode.com/justdialclone/assets/front/images/msg.png" alt="message" /></span>
                                                    <div class="addrsss">info@yellowpagesclone.com</div>
                                                </div>

                                            </div>
                                            <Col lg='6' md='12' sm='12'>
                                                <div class="gren_bor_title">Contact Info</div>
                                                <div class="bor_grn">&nbsp;</div>
                                                <div class="user_box">
                                                    <span><img src="https://buyphpcode.com/justdialclone/assets/front/images/phone.png" alt="contcat us map" /></span>
                                                    <div class="phone-number">1236547988</div>
                                                </div>

                                                <div class="user_box">
                                                    <span><img src="https://buyphpcode.com/justdialclone/assets/front/images/ph.png" alt="contcat us map" /></span>
                                                    <div class="phone-number">1236547988</div>
                                                </div>
                                            </Col>
                                        </div>

                                        <div class="whit_box">
                                            <div class="any_q">Have Any Question?</div>
                                            <div class="get_tuch">Getting in touch? If You have any more Question Not Listed in.</div>
                                            <div class="btn_gren"><a href="https://buyphpcode.com/justdialclone/faqs">Any Question?</a></div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <div class="gren_bor_title">Map and Location</div>
                            <div class="bor_grn">&nbsp;</div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default ContactUs