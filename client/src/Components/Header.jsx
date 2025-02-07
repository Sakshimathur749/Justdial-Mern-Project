import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useState } from "react";
import { Accordion, Button, Form, Modal, Offcanvas } from "react-bootstrap";
import ReactLanguageSelect from "react-languages-select";
import "react-languages-select/css/react-languages-select.css";
import "../css/header.css";
import '../css/common.css';
import logo from '../assets/logo.png'

function Header() {
  const [show, setShow] = useState(false);
  const [loginShow, setLoginShow] = useState(false); 
  const [contactData, setContactData] = useState({name: '',  email: '', password: '',  mobilenumber: '', message: '',  });
  const [loading, setLoading] = useState(false); 
  const [successModalShow, setSuccessModalShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorModalShow, setErrorModalShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    window.scrollTo(0, 0.5);
  }, [location]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLoginClose = () => setLoginShow(false); 
  const handleLoginOpen = () => setLoginShow(true);  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.password || !contactData.mobilenumber || !contactData.message) {
      alert('All fields are required');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/contact/post', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      const result = await response.json();
      if (response.ok) {
        setSuccessMessage(result.message || 'Contact message saved successfully!');
        setSuccessModalShow(true); // Show success modal
        setContactData({ name: '', email: '', password: '', mobilenumber: '', message: '' }); // Reset form
      } else {
        // Show error modal if the response is not ok
        setErrorMessage(result.message || 'Error sending message. Please try again later.');
        setErrorModalShow(true); // Show error modal
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('There was an error submitting the form. Please try again later.');
      setErrorModalShow(true); // Show error modal
    } finally {
      setLoading(false); 
    }
  };

  const handleSuccessModalClose = () => setSuccessModalShow(false);
  const handleErrorModalClose = () => setErrorModalShow(false); 

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
            <div className="nav-link" onClick={handleLoginOpen}>
              Login/Register{" "}
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
      <Modal show={successModalShow} onHide={handleSuccessModalClose}>
        <Modal.Header className="bg-white" closeButton>
          <Modal.Title className="text-green">Success</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white">
          <p className="text-green">{successMessage}</p>
          <Button className="bg-green"  onClick={handleSuccessModalClose}>Close</Button>
        </Modal.Body>
      </Modal>

      <Modal show={errorModalShow} onHide={handleErrorModalClose}>
        <Modal.Header className="bg-white" closeButton>
          <Modal.Title className="text-red">Error</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white">
          <p className="text-red">{errorMessage}</p>
          <Button className="bg-red" onClick={handleErrorModalClose}>Close</Button>
        </Modal.Body>
      </Modal>

      <Modal show={loginShow} onHide={handleLoginClose}>
        <Modal.Header className="bg-white" closeButton>
          <Modal.Title>Login / Register</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white">
          <Form onSubmit={handleSubmitContact}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                style={{ padding: "20px", fontWeight: "500" }}
                placeholder="Enter email"
                value={contactData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                style={{ padding: "20px", fontWeight: "500" }}
                placeholder="Password"
                value={contactData.password}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Add other fields for contact data */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                style={{ padding: "20px", fontWeight: "500" }}
                placeholder="Enter your name"
                value={contactData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobilenumber"
                style={{ padding: "20px", fontWeight: "500" }}
                placeholder="Enter mobile number"
                value={contactData.mobilenumber}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                style={{ padding: "20px", fontWeight: "500" }}
                placeholder="Enter your message"
                value={contactData.message}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button style={{background:'#e6ab2a', borderRadius:'20px'}} className="px-2 px-4" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;