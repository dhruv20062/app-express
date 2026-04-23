import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = ({ setAuth }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/register', formData);
      localStorage.setItem('token', res.data.token);
      setAuth(true);
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-card auth-card">
        <h1 className="auth-title">Create Account</h1>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              name="name" 
              value={name} 
              onChange={onChange} 
              className="form-input" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={email} 
              onChange={onChange} 
              className="form-input" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={password} 
              onChange={onChange} 
              className="form-input" 
              required 
              minLength="6"
            />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
