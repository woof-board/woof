import React from 'react';
import '../css/Login.css';
import WalkerHeader from '../components/Header/WalkerHeader'

function WalkerLogin() {
    return (
        <div>
            <WalkerHeader />
            <div id="walkerlogin" className="login-page">
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

export default WalkerLogin;