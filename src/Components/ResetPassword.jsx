import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, Button, Alert, Form } from 'react-bootstrap';
import InvisibleEye from '../assets/Icons/icon-invisible.png';
import Eye from '../assets/Icons/icon-eye.png';
import logo from '../assets/logo.png'
const ResetPassword = () => {
  const { encryptedData } = useParams(); 
  const [newpassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetPasswordModal, setResetPasswordModal] = useState(false)
  const [user, setuser] = useState('')
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleResetPassword = async () => {
    if (newpassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/reset-password/${encodeURIComponent(encryptedData)}` , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newpassword, confirmPassword })
      });
      const data = await response.json();
     if (data.token) {
        setuser(data);
        localStorage.setItem("authToken", data.token);
      window.location.href = "/";
        setSuccessMessage(data.message);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error)
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <div style={{height:'65vh'}}>
      <div show={resetPasswordModal} onHide={() => setResetPasswordModal(false)}>
          <div className="category-head"><h4 className="fw-bold"><img src={logo} height={60} width={60} className="object-fit-cover" alt="login logo" />Reset Account Password</h4></div>
        <div style={{width:'400px', justifySelf:'center' }}>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form className="form-horizontal">
            <div className="login_box">
              <div className="title_login">Reset Password</div>
              <div>{user.username}</div>
              <div className="user_box">
                <div className="label_form">
                  New Password <span style={{ color: "red" }}>*</span>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="newpassword"
                  className="input_box"
                  value={newpassword} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter New password"
                />
                <img
                  src={showPassword ? Eye : InvisibleEye}
                  height={20}
                  width={20}
                  className="eye object-fit-contain"
                  onClick={togglePasswordVisibility}
                  alt="Toggle Password Visibility"
                />
              </div>
              <div className="user_box">
                <div className="label_form">
                  Confirm Password <span style={{ color: "red" }}>*</span>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmpassword"
                  className="input_box"
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter New password"
                />
                <img
                  src={showPassword ? Eye : InvisibleEye}
                  height={20}
                  width={20}
                  className="eye object-fit-contain"
                  onClick={togglePasswordVisibility}
                  alt="Toggle Password Visibility"
                />
              </div>
            </div>
            <div className="login_box">
              <Button onClick={handleResetPassword} 
                className="yellow ui button"
              >
                Change Password
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;