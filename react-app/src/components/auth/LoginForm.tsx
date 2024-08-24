import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './FormStyles.css';
import { ILoginRequest } from '../../services/api-contracts/ILoginRequest';
import { loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
  remember: yup.boolean(),
});

const LoginPage: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<ILoginRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      remember: false,
    },
  });

  const onSubmit = async (data: ILoginRequest) => {
    try{
      const login = await loginUser(data);
      localStorage.setItem('authToken', login.token);
      localStorage.setItem('refreshToken', login.refreshToken);
      window.location.href = '/user/home';
    }catch(error){

    }
    
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          name="remember"
          control={control}
          render={({ field }) => (
            <div className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={field.value || false}
                onChange={(e) => field.onChange(e.target.checked)} 
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
              <label className="checkbox-label">Remember Me</label>
            </div>
          )}
        />
        
        <button className="submit-button" type="submit">Login</button>
      </form>
      <div className='register-message'>Don't have an account yet? - <a href='register'>Register</a></div>
    </div>
  );
};

export default LoginPage;
