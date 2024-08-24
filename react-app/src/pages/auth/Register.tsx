// src/pages/auth/register.tsx

import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';
import './Register.css';

const Register: React.FC = () => {
  return (
    <div className='register-container'>
      <h1>Register</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
