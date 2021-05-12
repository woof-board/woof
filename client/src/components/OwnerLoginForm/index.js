import React from 'react';
import '../../css/Walker.css';

function OwnerLoginForm() {

    const ownerLogin = async() => {
        alert('Owner Logged In')
    }
    
    return (
        <form id="owner-login-form" className="login-form">
            <input className="signup-login-input" type="email" placeholder="Enter Email"></input>
            <input className="signup-login-input" type="text" placeholder="Enter Password"></input>
            <button className="form-button" onClick={ownerLogin} id="owner-login-button">SUBMIT</button>
         </form>
    )
}

export default OwnerLoginForm;