import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

import './Auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a data object containing the user's login credentials
    const loginData = {
      username,
      password,
    };

    // Make the POST request using Axios
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
      // localStorage.setItem('isAdmin', response.data.isAdmin);
      // window.location.href = "/Obavestenja";
    }, (error) => {
      console.log(error);
      // setPoruka("Neispravno korisnicko ime ili sifra!");
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
        <button type="submit">Login</button>
        {/* <button onClick={() => alert(password)}>test</button> */}
      </form>
    </div>
  );
}

export default Login;
