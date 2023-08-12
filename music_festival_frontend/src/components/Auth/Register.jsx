import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a data object containing the user's information
    const userData = {
      firstName,
      lastName,
      username,
      email,
      password,
      role,
    };

    // Make the POST request using Axios
    // axios.post('http://localhost:8080/api/v1/auth/register', userData)
    //   .then((response) => {
    //     // Handle the successful response here, such as displaying a success message or redirecting to another page
    //     console.log('Registration successful!', response.data);
    //   })
    //   .catch((error) => {
    //     // Handle errors here, such as displaying an error message
    //     console.error('Registration failed:', error);
    //   });
    axios({
      method: 'post',
      url: '/api/v1/auth/register',
      baseURL: 'http://localhost:8080',
      data: {
        username: username,
        password: password,
        firstname: firstName,
        lastname: lastName,
        email: email,
        role: role
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
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name" />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your last name" />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="ORGANIZER">Organizer</option>
          </select>
        </div>
        <button type="submit">Register</button>
        {/* <button onClick={() => alert(email)}>register</button> */}
      </form>
    </div>
  );
}

export default Register;
