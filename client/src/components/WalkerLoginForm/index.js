import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Auth from '../../utils/auth';
import { LOGIN_WALKER } from '../../utils/mutations';
import '../../css/LoginSignupForm.css';

function WalkerLoginForm(props) {
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

    const {
        formLinks = [],
        setFormCurrentLink,
    } = props

    return (
        <form 
            id="walker-login-form" 
            className="form-container walker-form" 
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
                <button type="button" onClick={() => { setFormCurrentLink(formLinks[1]) }} 
                    className="home-form-button" 
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

export default WalkerLoginForm;