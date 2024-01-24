import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [form_type, set_form_type] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      handleError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const user_details = data.user_details;
        // Store token and user details in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userDetails', user_details);
 
            
        if(user_details['userType'] == 2){
          navigate('/admin');
        }else  if(user_details['userType'] == 1){
          navigate('/artist');
        }else{
          navigate('/');
        }

        console.log('Login successful!');
      } else {
        handleError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      handleError('An unexpected error occurred. Please try again later.');
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      handleError('Please fill in the email field.');
      return;
    }

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + 'reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('Password reset request successful!');
      } else {
        handleError('Password reset request failed.');
      }
    } catch (error) {
      console.error('Error during password reset request:', error);
      handleError('An unexpected error occurred. Please try again later.');
    }
  };

  const handleConfirmOtp = async () => {
    if (!email || !otp || !newPassword || !confirmPassword) {
      handleError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + 'confirm-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, newPassword, confirmPassword }),
      });

      if (response.ok) {
        console.log('OTP confirmation successful!');
      } else {
        handleError('OTP confirmation failed.');
      }
    } catch (error) {
      console.error('Error during OTP confirmation:', error);
      handleError('An unexpected error occurred. Please try again later.');
    }
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);

    setTimeout(() => {
      setError('');
    }, 5000);
  };

  return (
    <div>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      {form_type === 0 && (
        <div className='login'>
          <h2>Login</h2>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={handleLogin}>Login</button>
          <p>
            <span onClick={() => set_form_type(1)}>Forgot Password?</span> |{' '}
            <span onClick={() => set_form_type(2)}>Confirm OTP</span>
          </p>
        </div>
      )}

      {form_type === 1 && (
        <div className='resetPass'>
          <h2>Reset Password</h2>
          <a onClick={() => set_form_type(0)}>Back To login</a>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}

      {form_type === 2 && (
        <div className='confirmOtp'>
          <h2>Confirm OTP</h2>
          <a onClick={() => set_form_type(0)}>Back To login</a>
          <div>
            <label>Email:</label>
            <input type="email" value={email} readOnly />
          </div>
          <div>
            <label>OTP:</label>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          </div>
          <div>
            <label>New Password:</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button onClick={handleConfirmOtp}>Confirm OTP</button>
        </div>
      )}
    </div>
  );
};

export default Login;
