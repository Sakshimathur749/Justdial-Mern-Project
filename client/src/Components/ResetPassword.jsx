import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal, Button, Alert, Form } from 'react-bootstrap';
import InvisibleEye from '../assets/Icons/icon-invisible.png';
import Eye from '../assets/Icons/icon-eye.png';
import logo from '../assets/logo.png'
const ResetPassword = () => {
  const [resetPasswordModal, setResetPasswordModal] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleChangePassword = async () => {
  if (newPassword !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }
    try {
      const response = await fetch(`http://localhost:5000/api/reset-password?token=${token}` , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword,confirmPassword,token })
      });
      const data = await response.json();
      console.log(data)
      if (data) {
        setSuccessMessage('Password update successfully!');
      } else {
        setErrorMessage(data.message || 'An error occurred.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while resetting password.');
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
              <div className="user_box">
                <div className="label_form">
                  New Password <span style={{ color: "red" }}>*</span>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input_box"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              <Button
                className="yellow ui button"
                onClick={handleChangePassword}
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