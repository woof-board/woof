import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Auth from '../../utils/auth';
import { LOGIN_OWNER } from '../../utils/mutations';
import '../../css/Walker.css';

function OwnerLoginForm() {
    const [formData, setUserFormData] = useState({ email: '', password: '' });
    const [loginOwner, { error }] = useMutation(LOGIN_OWNER);

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
          const { data } = await loginOwner({
            variables: { ...formData }
          });
      
          Auth.login(data.loginOwner.token);
        } catch (e) {
          console.error(e);
        }
    };
    
    return (
        <form 
            id="walker-login-form" 
            className="login-form" 
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
                className="form-button" 
                id="walker-login-button"
            >
                SUBMIT
            </button>
         </form>
    );
}

export default OwnerLoginForm;