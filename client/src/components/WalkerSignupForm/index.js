import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Auth from '../../utils/auth';
import { ADD_WALKER } from '../../utils/mutations';
import '../../css/Walker.css';

function WalkerSignupForm() {
    const [formData, setUserFormData] = useState({
        firstName: '',
        lastName: '',
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
            className="signup-form"
            onSubmit={handleFormSubmit}
        >
            <input
                className="signup-login-input"
                type="text"
                placeholder="Enter First Name"
                name="firstName"
                onChange={handleInputChange}
                value={formData.firstName}
            />
            <input
                className="signup-login-input"
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                onChange={handleInputChange}
                value={formData.lastName}
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
            <button
                disabled={!(formData.email && formData.password && formData.firstName && formData.lastName)}
                type="submit"
                className="form-button"
                id="owner-signup-button"
            >
                SUBMIT
            </button>
        </form>
    );
}

export default WalkerSignupForm;