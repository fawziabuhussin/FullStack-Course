import React, { useState } from 'react';
import axios from 'axios';

interface UserAuthFormProps {
  onLogin: (user: { name: string; email: string; username: string; token: string }) => void;
}

const UserAuthForm: React.FC<UserAuthFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setRegistrationSuccess(false);
    try {
      await axios.post('http://localhost:3001/users', { name, email, username, password });
      setRegistrationSuccess(true);
      setName('');
      setEmail('');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Failed to register user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      onLogin(response.data);
    } catch (error) {
      console.error('Failed to login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {registrationSuccess && <p>Registration successful. You can now log in.</p>}
      <form onSubmit={handleRegister} name="create_user_form">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="create_user_form_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"  // Changed from "email" to "text"
            name="create_user_form_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="create_user_form_username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="create_user_form_password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" name="create_user_form_create_user" disabled={loading}>
          Create User
        </button>
      </form>
      
      <form onSubmit={handleLogin} name="login_form">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="login_form_username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="login_form_password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" name="login_form_login" disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
};

export default UserAuthForm;
