import React, { useState } from 'react';
import '../css/Login.css';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations'
import { WALKER_LOGIN_USER } from '../utils/mutations'

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
  const handleWalkerFormSubmit = async event => {
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

    // submit form
    const handleOwnerFormSubmit = async event => {
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
                <div>
                    <form onSubmit={handleWalkerFormSubmit} className="login-card">
                        <span className>WALKERS</span>
                        <label>Email:</label>
                        <input                 
                            placeholder='Your email'
                            name='email'
                            type='email'
                            id='walker-email'
                            // value={formState.email}
                            onChange={handleChange}
                            />
                        <label>Password:</label>
                        <input
                            className='form-input'
                            placeholder='******'
                            name='password'
                            type='password'
                            id='walker-password'
                            // value={formState.password}
                            onChange={handleChange}
                        />
                        <button type="submit">LOGIN</button>
                        {error && <div>Login failed</div>}
                    </form>

                </div>

                <div>
                    <form onSubmit={handleOwnerFormSubmit} className="login-card">
                        <span className>OWNERS</span>
                        <label>Email:</label>
                        <input                 
                            placeholder='Your email'
                            name='email'
                            type='email'
                            id='owner-email'
                            // value={formState.email}
                            onChange={handleChange}
                            />
                        <label>Password:</label>
                        <input
                            className='form-input'
                            placeholder='******'
                            name='password'
                            type='password'
                            id='owner-password'
                            // value={formState.password}
                            onChange={handleChange}
                        />
                        <button type="submit">LOGIN</button>
                        {error && <div>Login failed</div>}
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login;