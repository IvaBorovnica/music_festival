import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios

import './Auth.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setRole, setIsLoggedIn, isLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    localStorage.removeItem('token');
    setRole(null);
    setIsLoggedIn(false)
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginData = {
      username,
      password,
    };

    axios({
      method: 'post',
      url: '/api/v1/auth/login',
      baseURL: 'http://localhost:8080',
      data: {
        username: username,
        password: password
      }
    }).then((response) => {
      console.log(response);
      localStorage.setItem('token', response.data.token);
      setRole(response.data.role);
      setIsLoggedIn(true)
      localStorage.setItem('role', response.data.role)
      navigate('/concerts');

    }, (error) => {
      console.log(error);
      setMessage("Wrong username or password!");
    })
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
        </div>
        <p style={{color: "red"}}>{message}</p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
