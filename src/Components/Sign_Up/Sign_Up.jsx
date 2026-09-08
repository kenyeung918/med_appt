import React, { useState } from 'react';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from "../../config";

const Sign_Up = () => {
  const [role, setRole] = useState("Doctor"); // default role
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }
    if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const register = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          name,
          email,
          phone,
          password,
        }),
      });

      const json = await response.json();
      console.log("Register response:", json);

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("phone", phone);
        sessionStorage.setItem("email", email);
        navigate("/");
        window.location.reload();
      } else {
        if (json.errors) {
          setErrors({ form: json.errors[0].msg });
        } else {
          setErrors({ form: json.error || "Registration failed" });
        }
      }
    } catch (err) {
      console.error("Register error:", err);
      setErrors({ form: "Registration failed. Please try again." });
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-form">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-control"
              >
                <option value="Doctor">Doctor</option>
                <option value="Patient">Patient</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
              {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                required
              />
              {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                id="phone"
                className="form-control"
                placeholder="Enter your phone number"
                required
              />
              {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
              {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
            </div>

            {errors.form && <div style={{ color: 'red' }}>{errors.form}</div>}

            <div className="btn-group" style={{ marginTop: '15px' }}>
              <button type="submit" className="btn btn-primary">Submit</button>
              <button
                type="reset"
                className="btn btn-danger"
                onClick={() => {
                  setRole("Doctor");
                  setName('');
                  setEmail('');
                  setPhone('');
                  setPassword('');
                  setErrors({});
                }}
              >
                Reset
              </button>
            </div>
          </form>

          <div style={{ marginTop: '10px' }}>
            Already a member? <Link to="/login" style={{ color: '#2190FF' }}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;

