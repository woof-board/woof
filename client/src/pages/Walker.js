import React from 'react';
import '../css/Walker.css';


function Walker(props) {

    return (
        <div id="walker">
            <div className="background-walker">
            </div>
            <div className="walker-content">
                <div className="walker-info-container">
                    <p className="walker-text">FIND YOUR PERFECT DOG WALKER</p>
                    <p className="walker-text-small">At <b><i>Woof</i></b>, we will find the perfect dog walker for your furry best friend. Simploy pick a date and time and we'll match you with a reliable, dog-loving walker who will treat your pup right.  Want to join our team of walkers? <b><strong>Click Here</strong></b> to get started</p>
                </div>

                <div className="form-container">
                    <div className="login-title">
                        <span id="login-title">LOGIN</span>
                    </div>
                    <div className="signup-title">
                        <span id="signup-title">SIGN UP</span>    
                    </div>
                       
                    <form className="login-form">
                        <input className="signup-login-input" type="email" placeholder="Enter Email"></input>
                        <input className="signup-login-input" type="text" placeholder="Enter Password"></input>
                        <button className="form-button" id="login-button">SUBMIT</button>
                    </form>
                    <form className="signup-form">
                        <input className="signup-login-input" type="text" placeholder="Enter Name"></input>
                        <input className="signup-login-input" type="email" placeholder="Enter Email"></input>
                        <input className="signup-login-input" type="text" placeholder="Enter Password"></input>
                        <button className="form-button" id="signup-button">SUBMIT</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Walker;