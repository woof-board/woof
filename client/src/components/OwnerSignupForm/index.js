import React from 'react';
import '../../css/Walker.css';

function OwnerSignupForm() {

    const ownerSignup = async() => {
        alert('Owner Sign up Complete')
    }

    return (
        <form id="owner-signup-form" className="signup-form">
            <input className="signup-login-input" type="text" placeholder="Enter Name"></input>
            <input className="signup-login-input" type="email" placeholder="Enter Email"></input>
            <input className="signup-login-input" type="text" placeholder="Enter Password"></input>
            <button className="form-button" onClick={ownerSignup} id="owner-signup-button">SUBMIT</button>
        </form>
    )
}

export default OwnerSignupForm;