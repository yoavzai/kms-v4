import React, { useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import '../global.css';
import { GET_USER } from './queries/user_queries';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [getUser, { loading }] = useLazyQuery(GET_USER);


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await getUser({ variables: { email, password } });
      const user = data.userOne;
      if (user) {
        navigate(`/users/${user.username}`, { state: { user: user } });
      } else {
        setError('Invalid login credentials.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='container'>
        <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="login-form__label">
            Email:
        </label>
        <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="login-form__input"
        />

        <label htmlFor="password" className="login-form__label">
            Password:
        </label>
        <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="login-form__input"
        />

        <button type="submit" className="login-form__button">
            Login
        </button>

        {loading && <p className="login-form__loading">Loading...</p>}
        {error && <p className="login-form__error">{error}</p>}
        </form>

    </div>
  );
}

export default Login;
