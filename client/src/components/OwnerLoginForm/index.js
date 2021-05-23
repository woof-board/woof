import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Auth from '../../utils/auth';
import { LOGIN_OWNER } from '../../utils/mutations';


function OwnerLoginForm(props) {
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
        } catch (error) {
          console.error(error);
        }
    };
    
    const {
        formLinks = [],
        setFormCurrentLink,
    } = props

    return (
        <form 
            id="owner-login-form" 
            className="form-container owner-form" 
            onSubmit={handleFormSubmit}
        >
            <input 
                className="signup-login-input" 
                type="email" 
                placeholder="Email address" 
                name="email" 
                onChange={handleInputChange} 
                value={formData.email}
            />
            <input 
                className="signup-login-input" 
                type="password" 
                placeholder="Password" 
                name="password" 
                onChange={handleInputChange} 
                value={formData.password}
            />
            {
                error ? <div>
                    <p className="error-text" >The provided credentials are incorrect</p>
                </div> : null
            }
            <div className="home-button-container">
                <button onClick={() => { setFormCurrentLink(formLinks[1]) }} 
                    className="home-form-button" 
                    type="button"
                >
                    SIGNUP
                </button>
                <button 
                    disabled={!(formData.email && formData.password)} 
                    type="submit" 
                    variant="success" 
                    className="home-form-button" 
                    id="walker-login-button"
                >
                    LOGIN
                </button>
            </div>
         </form>
    );
}

export default OwnerLoginForm;