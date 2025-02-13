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
  const [registerShow, setRegisterShow] = useState(false);
  const [user, setUser] = useState(null); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    mobilenumber: '',
    confirmPassword: '',
  });
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLoginOpen = () => {
    setLoginShow(true);
    setErrorMessage('');
    setShow(false)
  };
  const handleRegisterOpen = () => {
    setRegisterShow(true);
    setLoginShow(false);
};
  const handleLoginClose = () => setLoginShow(false);
  const handleRegisterClose = () => setRegisterShow(false);
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('token', result.token); 
        setUser(result.user);
        console.log(user,"user")
        setLoginShow(false);
      } else {
        setErrorMessage(result.message); 
        console.log(result.message)
        setShow(false)
        setLoginShow(false);
      }
    } catch (error) {
      setLoginShow(false);
      setShow(false)
      setErrorMessage('An error occurred while logging in');
    } finally {
      setLoading(false);
    }
  };
const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          mobilenumber: formData.mobilenumber,
          confirmPassword: formData.confirmPassword,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setRegisterShow(false);
        handleLoginOpen();         
      } else {
        setErrorMessage(result.message); 
      }
    } catch (error) {
      setErrorMessage('An error occurred while registering');
    } finally {
      setLoading(false);
    }
  };
 const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  console.log(user,"user")
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
            <img src={logo} alt="" />
          </Navbar.Brand>
          <div className="nav-right" style={{ display: "flex", gap: "20px" }}>
            <Nav
              className="my-2 my-lg-0 navbar-nav"
              style={{
                maxHeight: "100px",
                left: "340px",
                gap: "25px",
                justifyItems: "center",
                alignSelf: "center",
              }}
            >
              <div className="nav-link">
                {/* <ReactLanguageSelect defaultLanguage='en'  /> */}
              </div>
              <div
                className="nav-link"
                onClick={() => window.location.reload()}
              >
                We are hiring
              </div>
              <div
                className="nav-link"
                onClick={() => window.location.reload()}
              >
                Investor Relationship
              </div>
              <div
                className="nav-link"
                onClick={() => window.location.reload()}
              >
                Product{" "}
              </div>
            </Nav>
            <div>
              <a>
                {user ? (
                  <div>
                    <NavDropdown
                      title={`Hello, ${user.name}`}
                      id="user-dropdown"
                    >
                      <NavDropdown.Item as="a" onClick={handleLogout}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                ) : (
                  <div className="button">
                    <a className="theme-btn1" onClick={handleLoginOpen}>
                      Login
                    </a>
                  </div>
                )}
              </a>
            </div>
          </div>
          <Navbar.Toggle onClick={handleShow} />
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src={logo} alt="" />
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
              <a href="" style={{ border: "none", color: "darkslategray" }}>
                We are hiring
              </a>
            </div>
            <div style={{ padding: "1rem 1.3rem" }}>
              <a href="" style={{ border: "none", color: "darkslategray" }}>
                Investor Relationship
              </a>
            </div>
            <div style={{ padding: "1rem 1.3rem" }}>
              <a href="" style={{ border: "none", color: "darkslategray" }}>
                {" "}
                Product{" "}
              </a>
            </div>
            <div>
              <a href="" style={{ border: "none", color: "darkslategray" }}>
                {user ? (
                  <div>
                    <NavDropdown
                      title={`Hello, ${user.name}`}
                      id="user-dropdown"
                    >
                      <NavDropdown.Item
                        style={{ padding: "10px 20px", cursor: "pointer" }}
                        as="a"
                        onClick={handleLogout}
                      >
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                ) : (
                  <div>
                    <Button
                      as="a"
                      style={{ padding: "1rem 1.3rem" }}
                      variant="none"
                      onClick={handleLoginOpen}
                    >
                      Login
                    </Button>
                  </div>
                )}
              </a>
            </div>
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
      {/* <Modal show={successModalShow} onHide={handleSuccessModalClose}>
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
      </Modal> */}
      {/* Login Modal */}
      <Modal show={loginShow} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <h2>Login</h2>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                style={{ padding: "20px", fontWeight: "500" }}
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                style={{ padding: "20px", fontWeight: "500" }}
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
           <Form.Group  className="mb-3">
           <Form.Text className="mb-3">
              Don't have an account?{" "}
              <a variant="primary" onClick={handleRegisterOpen}>
                Register here
              </a>
            </Form.Text>
           </Form.Group>
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
            <Button
              style={{ background: "#e6ab2a", borderRadius: "20px" }}
              className="px-2 px-4"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={registerShow} onHide={handleRegisterClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                style={{ padding: "20px", fontWeight: "500" }}
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                style={{ padding: "20px", fontWeight: "500" }}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMobileNumber">
              <Form.Label>MobileNumber</Form.Label>
              <Form.Control
                type="tel"
                name="mobilenumber"
                placeholder="Enter your mobilenumber"
                value={formData.mobilenumber}
                style={{ padding: "20px", fontWeight: "500" }}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                style={{ padding: "20px", fontWeight: "500" }}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                style={{ padding: "20px", fontWeight: "500" }}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </Form.Group>
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
            <Button
              style={{ background: "#e6ab2a", borderRadius: "20px" }}
              className="px-2 px-4"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;