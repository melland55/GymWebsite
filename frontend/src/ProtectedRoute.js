import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/account/validate/melland5', {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}); // Send request to server to validate JWT
      if (response.status === 200) {
        this.setState({ isAuthenticated: true, loading: false });
      }
    } catch (err) {
      this.setState({ isAuthenticated: false, loading: false });
    }
  }

  render() {
    const { isAuthenticated, loading } = this.state;
    const { component: Component, ...rest } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

    return <Component {...rest} />;
  }
}

export default ProtectedRoute;