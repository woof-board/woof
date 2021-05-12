import React, { useState } from 'react';
import '../css/Signup.css';
import { validateEmail } from '../utils/helpers'

function Signup() {

    const [errorMessage, setErrorMessage] = useState('');
    const [formState, setFormState] = useState({ name: '', email: ''});

    const { name, email } = formState;

    function handleChange(e) {
        if (e.target.name === 'email') {
            const isValid = validateEmail(e.target.value);
            console.log(isValid);

            // isValid conditional statement
            if (!isValid) {
                setErrorMessage('Your email is invalid.');
            } else {
                if (!e.target.value.length) {
                  setErrorMessage(`${e.target.name} is required.`);
                } else {
                  setErrorMessage('');
                }
              }
          } 

        if (!errorMessage) {
        setFormState({ ...formState, [e.target.name]: e.target.value });
        }

        console.log('errorMessage', errorMessage);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formState);
    }
      
    console.log(formState);

    return (
        <div className="login-page" id="signup">
            <div className="login-container">
                <form className="login-card" onSubmit={handleSubmit}>
                    <h1>Walker Sign up</h1>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" defaultValue={name} onChange={handleChange} name="name" />
                    </div>
                    <div>
                        <label htmlFor="email">Email address:</label>
                        <input defaultValue={email} onChange={handleChange} type="email" name="email" />
                    </div>
                        {errorMessage && (
                        <div>
                        <p className="error-text">{errorMessage}</p>
                        </div>
                        )}
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="login-container">

                <form className="login-card" onSubmit={handleSubmit}>
                    <h1>Walker Sign up</h1>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" defaultValue={name} onChange={handleChange} name="name" />
                    </div>
                    <div>
                        <label htmlFor="email">Email address:</label>
                        <input defaultValue={email} onChange={handleChange} type="email" name="email" />
                    </div>
                        {errorMessage && (
                        <div>
                        <p className="error-text">{errorMessage}</p>
                        </div>
                        )}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;