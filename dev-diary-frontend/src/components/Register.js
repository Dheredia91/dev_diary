import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../slices/authSlice';

const Register = () => {
  // states to manage username, pw, email input
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [email, setEmail] = useState(''); 
  const dispatch = useDispatch(); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    dispatch(registerUser({ username, password, email })); // dispatch registerUser action with the user data
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
