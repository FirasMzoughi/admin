import React, { Component } from 'react';
import axios from 'axios';
import './AdminLogin.css';

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/login`, { username, password });
      if (response.data) {
        this.props.history.push('/dashboard');
      }
    } catch (error) {
      this.setState({ error: 'Invalid username or password' });
    }
  }

  render() {
    const { username, password, error } = this.state;
    return (
      <div className="admin-login-container">
        <h2>Admin Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" id="username" name="username" value={username} onChange={this.handleInputChange} placeholder="Username" />
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" value={password} onChange={this.handleInputChange} placeholder="Password" />
          </div>
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    );
  }
}

export default AdminLogin;
