import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useState } from "react";
import { Accordion, Alert, Button, Form, Modal, Offcanvas } from "react-bootstrap";
import ReactLanguageSelect from "react-languages-select";
import { GoogleLogin } from '@react-oauth/google';
import "react-languages-select/css/react-languages-select.css";
import "../css/header.css";
import '../css/common.css';
import '../css/components.css';
import logo from '../assets/logo.png'

function Header() {
  const [show, setShow] = useState(false);
  const [loginShow, setLoginShow] = useState(false); 
  const [registerShow, setRegisterShow] = useState(false);
  const [user, setUser] = useState(null); 
  const [formData, setFormData] = useState({
    email:'',
    password:'',
    username:'',
    mobileNumber:'',
  });
  const [loading, setLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};
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
    setSuccessMessage(''); 
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
    setSuccessMessage(''); 
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
        setUser(result.user.username);
        setSuccessMessage('Login successful!');
        setLoginShow(false);
      } else {
        setErrorMessage(result.message);
        console.log(result.message)
        setShow(false)
        if (result.message === 'User not Register') {
          setLoginShow(false); 
          setRegisterShow(true);
        } else if (result.message === 'Invalid password') {
          setRegisterShow(false);
          setLoginShow(true); 
        }
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
    setSuccessMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          mobileNumber: formData.mobileNumber,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setRegisterShow(false);
        handleLoginOpen();     
        setSuccessMessage('Login successful!');    
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
    localStorage.removeItem('user'); 
    setUser(null);
  };
  const handleGoogleLoginSuccess = async (response) => {
    const { credential } = response;
    console.log('Google login credential:', credential);  
    try {
      const res = await fetch('http://localhost:5000/api/user/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credential }),
      });
      const data = await res.json();
      console.log(data)
      if (res.ok) {
        console.log('User authenticated:', data);
        setSuccessMessage('Login successful!');
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        setErrorMessage('An error occurred while registering');
        console.error('Failed to authenticate with Google');
      }
    } catch (error) {
      setErrorMessage('An error occurred while registering');
      console.error('Error with Google login:', error);
    }
  };  
  const handleGoogleLoginFailure = (error) => {
    console.error("Google login error:", error);
    setErrorMessage("Failed to login with Google.");
  };
  
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
          <div className="nav-right d-flex gap-4">
            <Nav
              className="my-2 my-lg-0 navbar-nav justify-content-center align-items-center"
              style={{
                maxHeight: "100px",
                left: "340px",
                gap: "25px",
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
            <div className="align-self-center">
              <a>
                {user ? (
                  <div>
                    <NavDropdown
                      title={`Hello, ${user}`}
                      id="user-dropdown"
                    >
                      <NavDropdown.Item as="a" onClick={handleLogout}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                ) : (
                  <div className="button">
                    <a className="theme-btn1"onClick={handleLoginOpen}>
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
                      title={`Hello, ${user}`}
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
      <div  id="login_poup" role="dialog" style={{display: 'block', paddingLeft: '0px'}}>
    <Modal show={loginShow}  onHide={handleLoginClose}>
        <Modal.Header closeButton>
            <Modal.Title className="category-head"> <h4 className="fw-bold"><img src={logo} height={60} width={60} className="object-fit-cover" alt="login logo" />Login</h4></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {successMessage && (
                <Alert id="error_div"
                    variant="success"
                    className="mb-3 p-3 rounded-3 text-white shadow-sm fade show"
                    role="alert"
                >
                    <strong>Success!</strong> {successMessage}
                </Alert>
            )} {errorMessage && (
                <Alert variant="danger"
                    className="mb-3 p-3 rounded-3 text-white shadow-sm fade show alert alert-danger alert-dismissible"
                    role="alert"
                >
                    <strong>Error!</strong> {errorMessage}
                </Alert>
            )}
                  <Form className="form-horizontal" id="login_form " onSubmit={handleLoginSubmit}>
            <div className="login_box">
                <div className="title_login">Login with your email and password</div>
                <div className="user_box">
                    <div className="label_form">Email<span style={{ color: 'red' }}>*</span></div>
                    <input type="text" name="email" id="email_login" className="input_box" data-rule-required="true" value={formData.email} onChange={handleInputChange} placeholder="Enter Email Address" />
                </div>
                <div className="user_box">
                    <div className="label_form">Password <span style={{ color: 'red' }}>*</span></div>
                    <input type={showPassword ? 'text' : 'password'}  name="password" id="password_login" data-rule-required="true" className="input_box" value={formData.password} onChange={handleInputChange} placeholder="Enter password" /><i  className={`eye-icon ${showPassword ? 'visible' : 'hidden'}`} onClick={togglePasswordVisibility}> 👁️ </i>
                </div>
                <div className="login_box">
                    <div className="left_bar">
                        <a className="forgt" >Forget your password?</a>
                        <a id="open_register" onClick={handleRegisterOpen} className="sign_up">Register</a>
                    </div>
                    <Button type="subit" id="login_submit" disabled={loading} className=" yellow ui button"> {loading ? "Logging in..." : "Login"}</Button>
                    <img src="https://buyphpcode.com/justdialclone/assets/front/images/or1.png" alt="facebook login" />
                </div>
            </div>
            <div className="text-center d-flex flex-wrap justify-content-center align-content-center">
                <GoogleLogin 
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginFailure}
                    useOneTap
                />
                </div>
        </Form>
        </Modal.Body>
        
    </Modal>
      </div>
      <div id="login_poup" role="dialog" style={{ display: 'block', paddingLeft: '0px' }}>
    <Modal show={registerShow} onHide={handleRegisterClose}>
        <Modal.Header closeButton>
            <Modal.Title className="category-head"> <h4 className="fw-bold"><img src={logo} height={60} width={60} className="object-fit-cover" alt="login logo" />Register</h4></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {successMessage && (
                <Alert id="error_div"
                    variant="success"
                    className="mb-3 p-3 rounded-3 text-white shadow-sm fade show"
                    role="alert"
                >
                    <strong>Success!</strong> {successMessage}
                </Alert>
            )} {errorMessage && (
                <Alert
                    variant="danger"
                    className="mb-3 p-3 rounded-3 text-white shadow-sm fade show alert alert-danger alert-dismissible"
                    role="alert"
                >
                    <strong>Error!</strong> {errorMessage}
                </Alert>
            )}
            <Form className="form-horizontal" id="login_form " onSubmit={handleRegisterSubmit}>
                <div className="login_box">
                    <div className="user_box">
                        <div className="label_form">UserName<span style={{ color: 'red' }}>*</span></div>
                        <input type="text" name="username" id="email_login" className="input_box" data-rule-required="true" value={formData.username} onChange={handleInputChange} placeholder="Enter UserName" />
                    </div>
                    <div className="user_box">
                        <div className="label_form">MobileNumber<span style={{ color: 'red' }}>*</span></div>
                        <input id="email_login" className="input_box" type="tel" name="mobileNumber" placeholder="Enter your mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} />
                    </div>
                    <div className="user_box">
                        <div className="label_form">Email<span style={{ color: 'red' }}>*</span></div>
                        <input type="text" name="email" id="email_login" className="input_box" data-rule-required="true" value={formData.email} onChange={handleInputChange} placeholder="Enter Email Address" />
                    </div>
                    <div className="user_box">
                        <div className="label_form">Password <span style={{ color: 'red' }}>*</span></div>
                        <input type="password" name="password" id="password_login" data-rule-required="true" className="input_box" value={formData.password} onChange={handleInputChange} placeholder="Enter password" />
                    </div>
                    <div className="login_box">
                        <div className="left_bar">
                            <a id="open_register" onClick={()=>(handleLoginOpen(),handleRegisterClose())}>Login</a>
                        </div>
                        <Button type="subit" id="login_submit" disabled={loading} className=" yellow ui button">Submit</Button>
                        <img src="https://buyphpcode.com/justdialclone/assets/front/images/or1.png" alt="facebook login" />
                    </div>
                </div>
                <div className="text-center d-flex flex-wrap justify-content-center align-content-center">
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginFailure}
                        useOneTap
                    />
                </div>
            </Form>
        </Modal.Body>
    </Modal>
</div>
    </>
  );
}

export default Header;