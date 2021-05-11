import React from 'react';
import '../css/Login.css';
import OwnerHeader from '../components/Header/OwnerHeader'

function OwnerLogin() {
    return (
        <div>
            <OwnerHeader />
            <div id="ownerlogin" className="login-page">
                <div className="login-container">
                    <div className="login-card">
                        <span className>WALKERS</span>
                        <label>Username:</label>
                        <input type="text"></input>
                        <label>Email:</label>
                        <input type="text"></input>
                        <button>LOGIN</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OwnerLogin;