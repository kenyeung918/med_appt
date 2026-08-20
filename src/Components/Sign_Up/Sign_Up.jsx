// Sign_Up.jsx
import React, { useState } from 'react';
import './Sign_Up.css';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
  // State variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required.';

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) newErrors.phone = 'Phone must be exactly 10 digits.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) newErrors.email = 'Enter a valid email address.';

    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const register = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const json = await response.json();
      console.log(json); // Debug: see backend response

      if (json.authtoken) {
        // Save session data
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('email', email);

        // Navigate to home
        navigate('/');
        window.location.reload();
      } else {
        if (json.errors) {
          setErrors({ api: json.errors[0].msg });
        } else {
          setErrors({ api: json.error || 'Something went wrong. Please try again.' });
        }
      }
    } catch (err) {
      setErrors({ api: 'Server not reachable. Please try again later.' });
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-form">
          <form method="POST" onSubmit={register}>
            
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter your name"
              />
              {errors.name && <small style={{ color: 'red' }}>{errors.name}</small>}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="Enter your phone number"
              />
              {errors.phone && <small style={{ color: 'red' }}>{errors.phone}</small>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
              />
              {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
              />
              {errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}
            </div>

            {/* API error */}
            {errors.api && <div style={{ color: 'red' }}>{errors.api}</div>}

            {/* Submit */}
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;



