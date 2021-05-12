import React from 'react';
import '../../css/Walker.css';

function WalkerSignupForm() {

    const walkerSignup = async() => {
        alert('Walker Signed up!')
    }

    return (
        <form id="signup-form" className="signup-form">
            <input className="signup-login-input" type="text" placeholder="Enter Name"></input>
            <input className="signup-login-input" type="email" placeholder="Enter Email"></input>
            <input className="signup-login-input" type="text" placeholder="Enter Password"></input>
            <button className="form-button" onClick={walkerSignup} id="signup-button">SUBMIT</button>
        </form>
    )
}

export default WalkerSignupForm;