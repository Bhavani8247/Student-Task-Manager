import { useState } from 'react';
import { login, signup } from '../services/auth';

const AuthForm = ({ onAuth }) => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'signup') await signup(form);
      else await login(form);
      onAuth();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-screen">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>{mode === 'signup' ? 'Create Account' : 'Welcome back'}</h1>
        {error && <p className="error">{error}</p>}

        {mode === 'signup' && (
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit">
          {mode === 'signup' ? 'Sign Up' : 'Login'}
        </button>

        <p>
          {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            className="link-button"
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
          >
            {mode === 'signup' ? 'Login' : 'Sign up'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
