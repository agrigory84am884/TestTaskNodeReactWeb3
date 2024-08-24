// src/pages/auth/login.tsx

import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import './Login.css';

const Login: React.FC = () => {
  return (
    <div className='login-container'>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
