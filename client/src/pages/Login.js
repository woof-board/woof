import React from 'react';
import '../css/Login.css';

function Login() {
    return (
        <div className="login-page" id="login">
            <div className="login-container">
                <div className="login-card">
                    <span className>WALKERS</span>
                    <label>Username:</label>
                    <input type="text"></input>
                    <label>Email:</label>
                    <input type="text"></input>
                    <button>LOGIN</button>
                </div>
                <div className="login-card">
                    <span>OWNERS</span>
                    <label>Username:</label>
                    <input type="text"></input>
                    <label>Email:</label>
                    <input type="text"></input>
                    <button>LOGIN</button>
                </div>
            </div>
        </div>
    )
}

export default Login;