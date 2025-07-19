import { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://backconnect.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login-section" id="loginSection">
        <img src="https://via.placeholder.com/80" alt="Logo" className="logo" />
        <h1>Welcome Back</h1>
        <p className="subtitle">Please login to your account</p>
        
        {error && <div className="error-message">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sivavishwa042@gmail.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>
          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          
          <div className="divider">OR</div>
          
          <div className="demo-credentials">
            <p>Demo credentials:</p>
            <p>Email: sivavishwa042@gmail.com</p>
            <p>Password: sivav</p>
          </div>
        </form>
      </div>
      
      <div className="welcome-section" id="welcomeSection">
        <img src="https://via.placeholder.com/200" alt="Welcome" className="welcome-img" />
        <h2 className="welcome-title">Join Our Community</h2>
        <p className="welcome-text">
          Discover amazing features and connect with people around the world. 
          Login to get started.
        </p>
      </div>
    </div>
  );
};

export default Login;