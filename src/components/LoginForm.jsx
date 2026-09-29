import React, { useState } from 'react';

export default function LoginForm({ onTypingStart, onTypingEnd, onSubmitSuccess, isSubmitted }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onSubmitSuccess();
    }
  };

  return (
    <div className={`register-panel ${!isSubmitted ? 'active' : ''}`}>
      <h2 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>Register Now</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={onTypingStart}
            onBlur={onTypingEnd}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={onTypingStart}
            onBlur={onTypingEnd}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          SignUp Now
        </button>
      </form>
    </div>
  );
}