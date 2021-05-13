import React, { useState } from 'react';
import '../css/Walker.css';
import WalkerLoginForm from '../components/WalkerLoginForm';
import FormHeader from '../components/LoginSIgnupForm';
import WalkerSignupForm from '../components/WalkerSignupForm';


function Walker(props) {

    const [links] = useState([
        {
            name: 'LOGIN',
            id: 'login-title',
            hover: 'login-hover'
        },
        {
            name: 'SIGNUP',
            id: 'signup-title',
            hover: 'login-hover'
        }
    ])

    const [currentLink, setCurrentLink] = useState(links[0]);

    return (
        <div id="walker">
            <div className="background-walker">
            </div>
            <div className="walker-content">
                <div className="walker-info-container">
                    <p className="walker-text">FIND YOUR PERFECT DOG WALKER</p>
                    <p className="walker-text-small">At <b><i>Woof</i></b>, we will find the perfect dog walker for your furry best friend. Simply pick a date and time and we'll match you with a reliable, dog-loving walker who will treat your pup right.  Want to join our team of walkers? <b><strong>Click Here</strong></b> to get started</p>
                </div>


                    <div id="form-container" className="form-container">
                        <FormHeader 
                            links={links}
                            currentLink={currentLink}
                            setCurrentLink={setCurrentLink}
                        />
                        {currentLink.name === links[0].name && (
                            <WalkerLoginForm />
                        )}
                        {currentLink.name === links[1].name && (
                            <WalkerSignupForm />
                        )}
                    </div>
            </div>
        </div>
    )
}

export default Walker;