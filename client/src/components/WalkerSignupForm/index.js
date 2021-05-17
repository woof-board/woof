import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Auth from '../../utils/auth';
import { ADD_WALKER } from '../../utils/mutations';
import '../../css/Walker.css';

function WalkerSignupForm() {
    const [formData, setUserFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });
    const [addWalker, { error }] = useMutation(ADD_WALKER);

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
            const { data } = await addWalker({
                variables: { input: {...formData} }
            });

            Auth.login(data.addWalker.token);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form
            id="owner-signup-form"
            className="form-container"
            onSubmit={handleFormSubmit}
        >
            <input
                className="signup-login-input"
                type="text"
                placeholder="Enter First Name"
                name="first_name"
                onChange={handleInputChange}
                value={formData.first_name}
            />
            <input
                className="signup-login-input"
                type="text"
                placeholder="Enter Last Name"
                name="last_name"
                onChange={handleInputChange}
                value={formData.last_name}
            />
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
                disabled={!(formData.email && formData.password && formData.first_name && formData.last_name)}
                type="submit"
                className="home-form-button"
                id="owner-signup-button"
            >
                SUBMIT
            </button>
        </form>
    );
}

export default WalkerSignupForm;