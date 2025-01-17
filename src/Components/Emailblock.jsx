import React from 'react'
import '../css/common.css'
import '../css/components.css'
import { Container, Row } from 'react-bootstrap';

const Emailblock = () => {
  return (
    <div className='sp'>
      <Container fluid>
         <Row>
         <div className="email-block">
        <div className="email-content">
          Be A Part Of Our Family &amp; Get Everything In Your Email Address
        </div>
        <div
          style={{
            position: "fixed",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundColor: "#ccc",
            opacity: "0.5",
            display: "none",
          }}
          id="subscribr_loader"
        >
          <img
            src="https://buyphpcode.com/justdialclone/assets/front/images/ajax-loader.gif"
            style={{
              height: "100px",
              width: "100px",
              position: "absolute",
              top: "35%",
              left: "45%",
            }}
          />
        </div>

        <form
          className="form-horizontal"
          id="newsletter_form"
          method="POST"
          action="https://buyphpcode.com/justdialclone/newsletter"
          enctype="multipart/form-data"
        >
          <input
            type="hidden"
            name="_token"
            value="S16SNZX6VGXb8GjkpdSD0pCmWSLxPN1AOOKiv3C6"
          />

          <div className="email-textbox">
            <img
              src="https://buyphpcode.com/justdialclone/assets/front/images/email-image.png"
              alt=""
            />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
            />
            <div className="error_msg" id="err_email"></div>
            <div
              className="alert alert-success fade in  "
              id="contact_succ_info"
              style={{ display: "none" }}
            >
              <a
                href="#"
                className="close"
                data-dismiss="alert"
                aria-label="close"
              >
                ×
              </a>
              <strong>Info!</strong> Already Subscribe For This Email ID..
            </div>
            <div
              className="alert alert-success fade in "
              id="contact_succ"
              style={{ display: "none" }}
            >
              <a
                href="#"
                className="close"
                data-dismiss="alert"
                aria-label="close"
              >
                ×
              </a>
              <strong>Success!</strong> Thank You ,Your are Subscribe
              Successfully..
            </div>
            <div
              className="alert alert-danger"
              style={{ display: "none" }}
              id="contact_err"
            >
              <a
                href="#"
                className="close"
                data-dismiss="alert"
                aria-label="close"
              >
                ×
              </a>
              <strong>Error!</strong>While Subscribing Email .
            </div>

            <button
              type="button"
              id="submit_subscriber"
              name="submit_subscriber"
            >
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
         </Row>
      </Container>
    </div>
  );
}

export default Emailblock
