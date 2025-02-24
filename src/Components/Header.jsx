import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useState } from "react";
import { Accordion, Alert, Button, Form, Modal, Offcanvas } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactLanguageSelect from "react-languages-select";
import { GoogleLogin } from '@react-oauth/google';
import "react-languages-select/css/react-languages-select.css";
import "../css/header.css";
import '../css/common.css';
import '../css/components.css';
import logo from '../assets/logo.png'
import InvisibleEye from '../assets/Icons/icon-invisible.png'
import Eye from '../assets/Icons/icon-eye.png'
import { Navigate } from "react-router";
function Header() {
  const [show, setShow] = useState(false);
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const [user, setUser] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    mobileNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetModal, setResetModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [email, setEmail] = useState("");
  const handleForgotPasswordOpen = () => {setForgotPasswordModal(true) ; 
    setLoginShow(false);
  }
  const handleForgotPasswordClose = () => setForgotPasswordModal(false);
  const handleSendLink = async () => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }) 
      });
      const data = await response.json();
      console.log(data)
      if (response.ok) { 
        setSuccessMessage('Password reset link has been sent to your email!');
        const reset= `Password reset link has been sent to your email! ${data.email}`
        setResetMessage(reset);
        setResetModal(true);
      } else {
        setErrorMessage('Failed to send password reset link.');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('An error occurred while sending the link.');
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    window.scrollTo(0, 0.5);
  }, [location]);
  useEffect(() => {
    const token = localStorage.getItem('token'); 
    const username = localStorage.getItem('username');
    console.log(username) 
    if (token && username) {
      setUser(username)
      console.log('Token found:', token,username);
    } else {
      setUser(null);
      console.log('No token found');
    }
  });  
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
      console.log(result)
      if (response.ok) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('role', result.role);
        localStorage.setItem('username', result.user.username);
        const token = localStorage.getItem('token')
        setUser(result.user.username);
        setSuccessMessage('Login successful!');
        if (result.role === 'vendor') {
          const redirectUrl = `http://localhost:5174/dashboard?uitoken=${token}`;
          console.log(redirectUrl, "hey am i here")
          window.location.href = redirectUrl;
        } else if (result.user.role === 'user') {
          Navigate('/');
        }
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
    localStorage.removeItem('username');
    localStorage.removeItem('role');
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
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('username', data.user.username);
        const token = localStorage.getItem('token');
        setSuccessMessage('Login successful!');
        setUser(data.user.username)
        setLoginShow(false)
        if (result.role === 'vendor') {
          const redirectUrl = `http://localhost:5174/dashboard?uitoken=${token}`;
          console.log(redirectUrl, "hey am i here")
          window.location.href = redirectUrl;
        } else if (result.user.role === 'user') {
          Navigate('/');
        }
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
                    <NavDropdown className="nav-link"
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
          </div>
          <Navbar.Toggle onClick={handleShow} />
        </Container>
      </Navbar>
      {resetMessage && (
      <Alert variant="info" className="mt-3">
        <strong>{resetMessage}</strong>
      </Alert>
    )}
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src={logo} alt="" height={80} width={150} className="object-fit-content" />
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
            <div style={{ padding: "1rem 1.3rem" }}>
              <a onClick={handleLoginOpen} style={{ border: "none", color: "darkslategray" }}>
                Login
              </a>
            </div>
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
      <div id="login_poup" role="dialog" className='d-block p-0'>
        <Modal show={loginShow} onHide={handleLoginClose}>
          <Modal.Header closeButton>
            <Modal.Title className="category-head"> <h4 className="fw-bold"><img src={logo} height={60} width={60} className="object-fit-cover" alt="login logo" />Login</h4></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {successMessage && (
              <Alert id="error_div"
                variant="success"
                className="mb-3 p-3 rounded-3 text-success shadow-sm fade show"
                role="alert"
              >
                <strong className="text-success">Success!</strong> {successMessage}
              </Alert>
            )} {errorMessage && (
              <Alert variant="danger"
                className="mb-3 p-3 rounded-3 text-danger shadow-sm fade show alert alert-danger alert-dismissible"
                role="alert"
              >
                <strong className="text-danger">Error!</strong> {errorMessage}
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
                  <input type={showPassword ? 'text' : 'password'} name="password" id="password_login" data-rule-required="true" className="input_box" value={formData.password} onChange={handleInputChange} placeholder="Enter password" />
                  <img src={showPassword ? Eye : InvisibleEye} height={20} width={20} className="eye object-fit-contain" onClick={togglePasswordVisibility} alt="Toggle Password Visibility" />
                </div>
                
                <div className="login_box">
                <Button type="subit" id="login_submit"  className="yellow ui button"> Login</Button>
                  <div className="left_bar">
                    <a className="forgt" onClick={()=>handleForgotPasswordOpen()} >Forget your password?</a>
                    <a id="open_register" onClick={handleRegisterOpen} className="sign_up  text-decoration-underline ">Register</a>
                  </div>
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
      <div id="login_poup" role="dialog" className='d-block'>
        <Modal show={registerShow} onHide={handleRegisterClose}>
          <Modal.Header closeButton>
            <Modal.Title className="category-head"> <h4 className="fw-bold"><img src={logo} height={60} width={60} className="object-fit-cover" alt="login logo" />Register</h4></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {successMessage && (
              <Alert id="error_div"
                variant="success"
                className="mb-3 p-3 rounded-3 text-success shadow-sm fade show"
                role="alert"
              >
                <strong className="text-success">Success!</strong> {successMessage}
              </Alert>
            )} {errorMessage && (
              <Alert
                variant="danger"
                className="mb-3 p-3 rounded-3 text-danger shadow-sm fade show alert alert-danger alert-dismissible"
                role="alert"
              >
                <strong className="text-danger">Error!</strong> {errorMessage}
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
                  <input type={showPassword ? 'text' : 'password'} name="password" id="password_login" data-rule-required="true" className="input_box" value={formData.password} onChange={handleInputChange} placeholder="Enter password" />
                  <img src={showPassword ? Eye : InvisibleEye} height={20} width={20} className="eye object-fit-contain" onClick={togglePasswordVisibility} alt="Toggle Password Visibility" />
                </div>
                <div className="login_box">
                <Button type="submit" id="login_submit"  className=" yellow ui button">Submit</Button>
                  <div className="left_bar">
                    <a className="forgt" >Already Have Account?</a>
                    <a id="open_register" className="sign_up text-decoration-underline " onClick={() => (handleLoginOpen(), handleRegisterClose())}>Login</a>
                  </div>
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
      <div
        id="login_poup"
        role="dialog"
        className="d-block"
      >
        <Modal show={forgotPasswordModal} onHide={handleForgotPasswordClose}>
          <Modal.Header closeButton>
            <Modal.Title className="category-head"> <h4 className="fw-bold"><img src={logo} height={60} width={60} className="object-fit-cover" alt="login logo" />Forgot Password</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {successMessage && (
              <Alert
                id="error_div"
                variant="success"
                className="mb-3 p-3 rounded-3 text-success shadow-sm fade show"
                role="alert"
              >
                <strong className="text-success">Success!</strong> {successMessage}
              </Alert>
            )}{" "}
            {errorMessage && (
              <Alert
                variant="danger"
                className="mb-3 p-3 rounded-3 text-danger shadow-sm fade show alert alert-danger alert-dismissible"
                role="alert"
              >
                <strong className="text-danger">Error!</strong> {errorMessage}
              </Alert>
            )}
            <Form className="form-horizontal" id="login_form ">
              <div className="login_box">
                <div className="title_login">Enter email For Reset Password </div>
                <div className="user_box">
                  <div className="label_form">
                    Email<span style={{ color: "red" }}>*</span>
                  </div>
                  <input
                    type="text"
                    name="email"
                    id="email_login"
                    className="input_box"
                    data-rule-required="true"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email Address"
                  />
                </div>
              </div>
              <div className="login_box">
                <Button type="subit" id="login_submit" className=" yellow ui button" onClick={handleSendLink}>Send Link</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Header;