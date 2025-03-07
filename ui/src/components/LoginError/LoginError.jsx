import React from 'react';
import "./LoginError.css"

const LoginError = () => {
  return (
    <div className='login-error'>
      <h2>We couldn't find an account matching the username you entered. Please check your username and try again.</h2>
    </div>
  );
};

export default LoginError;
