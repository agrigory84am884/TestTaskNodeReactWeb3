import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './FormStyles.css';
import { registerUser } from '../../services/api';
import { IRegisterRequest } from '../../services/api-contracts/IRegisterRequest';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null); // State to hold server error messages

  const onSubmit: SubmitHandler<IRegisterRequest> = async (data) => {
    try {
      await registerUser(data as unknown as IRegisterRequest);

      navigate('/login');
    } catch (error: Error | any) {
      setServerError(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => <input className="input-field" {...field} placeholder="First Name" />}
        />
        {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}

        <Controller
          name="lastName"
          control={control}
          render={({ field }) => <input className="input-field" {...field} placeholder="Last Name" />}
        />
        {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}

        <Controller
          name="email"
          control={control}
          render={({ field }) => <input className="input-field" {...field} placeholder="Email" />}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}

        <Controller
          name="password"
          control={control}
          render={({ field }) => <input className="input-field" type="password" {...field} placeholder="Password" />}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => <input className="input-field" type="password" {...field} placeholder="Confirm Password" />}
        />
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}

        {/* Display server error message */}
        {serverError && <p className="error-message">{serverError}</p>}

        <button className="submit-button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
