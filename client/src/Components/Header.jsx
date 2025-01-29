import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useState } from "react";
import { Accordion, Offcanvas } from "react-bootstrap";
import ReactLanguageSelect from "react-languages-select";
import "react-languages-select/css/react-languages-select.css";
import "../css/header.css";
import '../css/common.css';
import logo from '../assets/logo.png'

function Header() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0.5);
  }, [location]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar
        expand="xl"
        style={{
          backgroundColor: "#ffff",
          position: "sticky",
          top: "-1px",
          zIndex: "10",
        }}
      >
        <Container fluid style={{ height: "70px" }}>
          <Navbar.Brand href="/" onClick={() => window.location.reload()}>
            <img
              src={logo}
              alt=""
            />
          </Navbar.Brand>
          <div
            className="nav-right"
            style={{ display: "flex", gap: "20px" }}
            onClick={() => window.location.reload()}
          >
            <Nav
            className="my-2 my-lg-0 navbar-nav"
            style={{ maxHeight: "100px", left: "340px", gap: "25px",justifyItems: 'center', alignSelf: 'center'}}
          >
           <div className="nav-link">
           {/* <ReactLanguageSelect defaultLanguage='en'  /> */}
           </div>
            <div className="nav-link" onClick={() => window.location.reload()}>
              We are hiring
            </div>
            <div className="nav-link" onClick={() => window.location.reload()}>
              Investor Relationship
            </div>
            <div className="nav-link" onClick={() => window.location.reload()}>
              Product{" "}
            </div>
            <div className="nav-link" onClick={() => window.location.reload()}>
              Contact{" "}
            </div>
          </Nav>
            <div className="button">
              <a className="theme-btn1" href="/contact">
                Get A Quote{" "}
                <svg height={20} width={20} fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
              </a>
            </div>
          </div>
          <Navbar.Toggle onClick={handleShow} />
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img
              src={logo}
              alt=""
            />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body id="offcanvas">
          <Accordion>
            <div style={{ padding: "1rem 1.3rem" }}>
              <a href="/" style={{ border: "none", color: "darkslategray" }}>
                Home
              </a>
            </div>
            <div style={{ padding: "1rem 1.3rem" }}>
              <a
                href=""
                style={{ border: "none", color: "darkslategray" }}
              >
                  We are hiring
              </a>
            </div>
            <div style={{ padding: "1rem 1.3rem" }}>
              <a
                href=""
                style={{ border: "none", color: "darkslategray" }}
              >
                Investor Relationship
              </a>
            </div>
            <div style={{ padding: "1rem 1.3rem" }}>
              <a
                href=""
                style={{ border: "none", color: "darkslategray" }}
              >
                {" "}
                Product{" "}
              </a>
            </div>
            <div style={{ padding: "1rem 1.3rem" }}>
              <a
                href=""
                style={{ border: "none", color: "darkslategray" }}
              >
               Contact{" "}
              </a>
            </div>
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;