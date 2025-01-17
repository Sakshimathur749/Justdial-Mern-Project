import React from "react";
import '../css/common.css'
import '../css/components.css'
import { Container ,Row,Col} from "react-bootstrap";
const 
Footer = () => {
  return (
<footer id="footer" className="footer dark-background">
<Container fluid className="footer-top ">
  <Row className="gy-4 d-inline-grid grid-columns">
    <Col className="footer-about">
      <a href="index.html" className="logo d-flex align-items-center">
        <span className="sitename">Shuffle</span>
      </a>
      <p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.</p>
      <div className="social-links d-flex mt-4">
        <a href=""><i className="bi bi-twitter-x"></i></a>
        <a href=""><i className="bi bi-facebook"></i></a>
        <a href=""><i className="bi bi-instagram"></i></a>
        <a href=""><i className="bi bi-linkedin"></i></a>
      </div>
    </Col>

    <Col className="footer-links">
      <h3 className="fw-600 py-2">Useful Links</h3>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About us</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Terms of service</a></li>
        <li><a href="#">Privacy policy</a></li>
      </ul>
    </Col>

    <Col  className="footer-links">
      <h3 className="fw-600 py-2">Our Services</h3>
      <ul>
        <li><a href="#">Web Design</a></li>
        <li><a href="#">Web Development</a></li>
        <li><a href="#">Product Management</a></li>
        <li><a href="#">Marketing</a></li>
        <li><a href="#">Graphic Design</a></li>
      </ul>
    </Col>

    <Col className=" footer-contact">
      <h3 className="fw-600 py-2">Contact Us</h3>
      <p>A108 Adam Street</p>
      <p>New York, NY 535022</p>
      <p>United States</p>
      <p className="mt-4"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
      <p><strong>Email:</strong> <span>info@example.com</span></p>
    </Col>

  </Row>
</Container>

<Container fluid className="copyright text-center">
  <p>© <span>Copyright</span> <strong className="px-1 sitename">Shuffle</strong> <span>All Rights Reserved</span></p>
  <div className="credits">
    Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
  </div>
</Container>

</footer>
  );
};

export default Footer;