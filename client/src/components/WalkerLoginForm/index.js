import React from 'react';
import '../../css/Walker.css';

function WalkerLoginForm() {

    const walkerLogin = async() => {
        alert('Walker Logged In');
    }
    
    return (
        <form id="walker-login-form" className="login-form">
            <input className="signup-login-input" type="email" placeholder="Enter Email"></input>
            <input className="signup-login-input" type="text" placeholder="Enter Password"></input>
            <button className="form-button" onClick={walkerLogin} id="walker-login-button">SUBMIT</button>
         </form>
    )
}

export default WalkerLoginForm;