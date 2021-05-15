import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Auth from '../../utils/auth';
import { LOGIN_WALKER } from '../../utils/mutations';
import '../../css/LoginSignupForm.css';

function WalkerLoginForm() {
    const [formData, setUserFormData] = useState({ email: '', password: '' });
    const [loginWalker, { error }] = useMutation(LOGIN_WALKER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ 
            ...formData, 
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
          const { data } = await loginWalker({
            variables: { ...formData }
          });
      
          Auth.login(data.loginWalker.token);
        } catch (e) {
          console.error(e);
        }
      };

    return (
        <form 
            id="form-container" 
            className="form-container" 
            onSubmit={handleFormSubmit}
        >
            <input 
                className="signup-login-input" 
                type="email" 
                placeholder="Enter Email" 
                name="email" 
                onChange={handleInputChange} 
                value={formData.email}
            />
            <input 
                className="signup-login-input" 
                type="password" 
                placeholder="Enter Password" 
                name="password" 
                onChange={handleInputChange} 
                value={formData.password} 
            />
            {
                error ? <div>
                    <p className="error-text" >The provided credentials are incorrect</p>
                </div> : null
            }
            <button 
                disabled={!(formData.email && formData.password)} 
                type="submit" 
                variant="success" 
                className="home-form-button" 
                id="walker-login-button"
            >
                SUBMIT
            </button>
         </form>
    );
}

export default WalkerLoginForm;