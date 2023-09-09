import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginRegisterForm = () => {
  const [formType, setFormType] = useState('login');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [email, setEmail] = useState(''); // Added for registration
  const [firstName, setFirstName] = useState(''); // Added for registration
  const [lastName, setLastName] = useState(''); // Added for registration
  const [phoneNumber, setPhoneNumber] = useState(''); // Added for registration
  const [address1, setAddress1] = useState(''); // Added for registration
  const [address2, setAddress2] = useState(''); // Added for registration
  const [city, setCity] = useState(''); // Added for registration
  const [state, setState] = useState(''); // Added for registration
  const [postal, setPostal] = useState(''); // Added for registration
  const [country, setCountry] = useState(''); // Added for registration
  const [birthday, setBirthday] = useState(''); // Added for registration
  const navigate = useNavigate();

  const handleFormToggle = (event) => {
    event.preventDefault();
    setFormType(formType === 'login' ? 'register' : 'login');
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/login/', {
          username: username,
          password: password
      });
      if(response){
        const { token } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        navigate('/home');
      }else{
        console.log('Invalid password');
      }
    } catch (error) {
      console.log('Invalid username or password');
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    console.log('');

    try {
      const response = await axios.post('/login/register/member', {
          username: username,
          password: password,
          email: email,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          address1: address1,
          address2: address2,
          city: city,
          state: state,
          postal: postal,
          country: country,
          birthday: birthday
      });
      if(response){
        console.log('Registered successfully');
      }
    } catch (error) {
      console.log('Failed to register');
    }
  };

  function handleBlur(event) {
    if(password.length < 8 && password !== ''){
      setPasswordError("Password must be 8 characters or more");
    }else{
      setPasswordError("");
    }
    if(password !== confirmPassword && confirmPassword !== '' && password.length >= 8){
      setConfirmPasswordError("Passwords do not match");
    }else{
      setConfirmPasswordError("");
    }
  }

  const isFormValid = passwordError === '' && confirmPasswordError === '';

  return (
    <div className="container d-flex justify-content-center align-items-start vh-100">
      <div className="card p-4 bg-dark text-light" style={{ width: "20rem", minWidth: "300px" }}>
        <h1 className="text-center">{formType === 'login' ? 'Login' : 'Register'}</h1>
        {formType === 'login' ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group mb-3">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary mt-3">Login</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group mb-3">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onBlur={handleBlur}
              />
              {passwordError !== '' && <div className="text-danger">{passwordError}</div>}
            </div>
            <div className="form-group mb-3">
              <label>Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                onBlur={handleBlur}
              />
              {confirmPasswordError !== '' && <div className="text-danger">{confirmPasswordError}</div>}
            </div>
            <div className="form-group mb-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>First Name:</label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Last Name:</label>
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Phone Number:</label>
              <input
                type="tel"
                className="form-control"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Address Line 1:</label>
              <input
                type="text"
                className="form-control"
                value={address1}
                onChange={(event) => setAddress1(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Address Line 2:</label>
              <input
                type="text"
                className="form-control"
                value={address2}
                onChange={(event) => setAddress2(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>City:</label>
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>State:</label>
              <input
                type="text"
                className="form-control"
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Postal Code:</label>
              <input
                type="text"
                className="form-control"
                value={postal}
                onChange={(event) => setPostal(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Country:</label>
              <input
                type="text"
                className="form-control"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Birthday:</label>
              <input
                type="date"
                className="form-control"
                value={birthday}
                onChange={(event) => setBirthday(event.target.value)}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary mt-3" disabled={!isFormValid}>Register</button>
            </div>
          </form>
        )}
        <div className="text-center mt-3">
          <a href="#" id="registerButton" onClick={handleFormToggle}>
            {formType === 'login' ? 'Not a user? Register here' : 'Login'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterForm;