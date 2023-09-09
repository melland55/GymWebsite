import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import axios from 'axios';

async function checkUserCredentials() {
  const webToken = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  // Check if the user is logged in
  if (webToken && username) {
    console.log(webToken);
    console.log(username);
    try {
      const response = await axios.get('/account/validate/'+username, {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}); // Send request to server to validate JWT
      if (response.status === 200) {
        return true;
      }
    } catch (err) {
      console.log("Login session expired");
    }
  }

  return false;
}

function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkCredentials() {
      const isLoggedIn = await checkUserCredentials();
      setIsLoggedIn(isLoggedIn);
    }

    checkCredentials();
  }, []);

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="container-fluid">
      <LoginForm />
    </div>
  );
}

export default LandingPage;
