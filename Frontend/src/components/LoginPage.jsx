import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle, Sparkles, Package } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedUser = username.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (!trimmedUser || !trimmedPass) {
      setError('Please enter both username and password.');
      return;
    }

    setIsSubmitting(true);

    // Simulate standard authentication validation
    setTimeout(() => {
      if (trimmedUser === 'admin' && trimmedPass === 'admin') {
        onLogin({
          username: 'admin',
          displayName: 'System Administrator',
          role: 'Admin',
          loginTime: new Date().toISOString()
        });
      } else {
        setError('Invalid credentials. Use admin / admin to sign in.');
        setIsSubmitting(false);
      }
    }, 350);
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin');
    setError('');
  };

  return (
    <div className="login-wrapper">
      <div className="login-background-glow"></div>

      <div className="login-card-container">
        {/* Brand Banner */}
        <div className="login-brand-header">
          <div className="login-brand-icon">
            <Package size={28} />
          </div>
          <h1 className="login-app-title">Glory Textiles</h1>
          <p className="login-app-subtitle">Inventory Management System</p>
        </div>

        {/* Login Box */}
        <div className="login-card">
          <div className="login-header">
            {/* <div className="login-badge">
              <ShieldCheck size={16} />
              <span>Admin Portal Access</span>
            </div> */}
            <h2 className="login-title">Sign in to your account</h2>
            {/* <p className="login-subtitle">Enter your admin credentials to access the workspace</p> */}
          </div>

          {error && (
            <div className="login-error-alert" role="alert">
              <AlertCircle size={18} className="login-error-icon" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className="input-group-with-icon">
                <User size={18} className="input-icon-left" />
                <input
                  type="text"
                  id="username"
                  className="login-input"
                  placeholder="Enter username (admin)"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError('');
                  }}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-with-hint">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <span className="password-hint">Default: admin</span>
              </div>
              <div className="input-group-with-icon">
                <Lock size={18} className="input-icon-left" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="login-input"
                  placeholder="Enter password (admin)"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-submit-btn"
              id="btn-login-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="btn-loading-content">
                  <span className="btn-spinner"></span>
                  Signing in...
                </span>
              ) : (
                'Sign In as Admin'
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          {/* <div className="login-demo-helper">
            <div className="demo-helper-divider">
              <span>Quick Login</span>
            </div>
            <button
              type="button"
              className="btn-fill-demo"
              onClick={handleFillDemo}
              id="btn-fill-demo"
            >
              <Sparkles size={15} />
              <span>Auto-fill Admin Credentials (admin / admin)</span>
            </button>
          </div> */}

          {/* <div className="login-footer-info">
            <p>Authorized access only • IMS Portal v1.0</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
