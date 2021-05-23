import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Auth from '../../utils/auth';
import { ADD_OWNER } from '../../utils/mutations';
import '../../css/Walker.css';

function OwnerSignupForm(props) {
    const [formData, setUserFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });
    const [addOwner, { error }] = useMutation(ADD_OWNER);

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
            const { data } = await addOwner({
                variables: { input: {...formData} }
            });

            Auth.login(data.addOwner.token);
        } catch (e) {
            console.log(e);
        }
    };

    const {
        formLinks = [],
        setFormCurrentLink,
    } = props

    return (
        <form
            id="owner-signup-form"
            className="form-container owner-form"
            onSubmit={handleFormSubmit}
        >
            <input
                className="signup-login-input"
                type="text"
                placeholder="First Name"
                name="first_name"
                onChange={handleInputChange}
                value={formData.first_name}
            />
            <input
                className="signup-login-input"
                type="text"
                placeholder="Last Name"
                name="last_name"
                onChange={handleInputChange}
                value={formData.last_name}
            />
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
                <button onClick={() => { setFormCurrentLink(formLinks[0]) }} 
                    className="home-form-button" 
                    type="button"
                >
                    LOGIN
                </button>
                <button
                    disabled={!(formData.email && formData.password && formData.first_name && formData.last_name)}
                    type="submit"
                    className="home-form-button"
                    id="owner-signup-button"
                >
                    SIGNUP
                </button>
            </div>
        </form>
    );
}

export default OwnerSignupForm;