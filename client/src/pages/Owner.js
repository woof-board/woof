import React, { useState } from 'react';
import '../css/Walker.css';
import OwnerLoginForm from '../components/OwnerLoginForm';
import FormHeader from '../components/LoginSIgnupForm';
import OwnerSignupForm from '../components/OwnerSignupForm';


function Owner(props) {

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
                    <h4 className="walker-text">FIND YOUR PERFECT DOG WALKER</h4>
                    <p className="walker-text-small">At <b><i>Woof</i></b>, we will find the perfect dog walker for your furry best friend. Simploy pick a date and time and we'll match you with a reliable, dog-loving walker who will treat your pup right.  Want to join our team of walkers? <b><strong>Click Here</strong></b> to get started</p>
                </div>

                <div id="form-container" className="form-container">
                    <FormHeader 
                        links={links}
                        currentLink={currentLink}
                        setCurrentLink={setCurrentLink}
                    />
                    {currentLink.name === links[0].name && (
                        <OwnerLoginForm />
                    )}
                    {currentLink.name === links[1].name && (
                        <OwnerSignupForm />
                    )}
  
                </div>
            </div>
        </div>
    )
}

export default Owner;