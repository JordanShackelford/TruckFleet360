import React, { useState } from 'react';
import './LoginFuturistic.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', email, password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>TruckFleet 2030</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
            <div className="input-highlight"></div>
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
            <div className="input-highlight"></div>
          </div>
          <button type="submit">
            <span>Login</span>
            <div className="button-highlight"></div>
          </button>
        </form>
        <div className="biometric-login">
          <button>
            <i className="fas fa-fingerprint"></i>
            Biometric Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;