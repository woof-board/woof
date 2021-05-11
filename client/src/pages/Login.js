import React, { useState } from 'react';
import '../css/Login.css';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations'

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);
  
    // update state based on form input changes
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();
  
    try {
      const { data } = await login({
        variables: { ...formState }
      });
  
      Auth.login(data.login.token);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };
    return (
        <div className="login-page" id="login">
            <div className="login-container">
                <form onSubmit={handleFormSubmit} className="login-card">
                    <span className>WALKERS</span>
                    <label>Email:</label>
                    <input                 
                        placeholder='Your email'
                        name='email'
                        type='email'
                        id='email'
                        value={formState.email}
                        onChange={handleChange}
                        />
                    <label>Pasword:</label>
                    <input
                        className='form-input'
                        placeholder='******'
                        name='password'
                        type='password'
                        id='password'
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <button type="submit">LOGIN</button>
                </form>
                <form className="login-card">
                    <span>OWNERS</span>
                    <label>Email:</label>
                    <input                 
                        placeholder='Your email'
                        name='email'
                        type='email'
                        id='email'
                        value={formState.email}
                        onChange={handleChange}
                        />
                    <label>Pasword:</label>
                    <input
                        className='form-input'
                        placeholder='******'
                        name='password'
                        type='password'
                        id='password'
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <button type="submit">LOGIN</button>
                </form>
            </div>
        </div>
    )
}

export default Login;