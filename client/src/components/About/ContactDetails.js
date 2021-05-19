import React, { useState } from 'react';

function ContactDetails() {
    return (
        <>
            <div className="contact-us-container-left">
                <div>
                    <h2>Let's get in touch</h2>
                    <h3>We're open for any suggestion or just to have a chat.</h3>
                </div>
                <div>
                    <div className="privacy-items">
                        <li className="hover-item email-item">Web Privacy Policy</li>
                        <li className="hover-item email-item">Web Terms of Use</li>
                        <li className="hover-item email-item">Web Cookie Policy</li>
                        <li className="hover-item email-item">Report a Scam</li>
                    </div>
                    <div className="icon-list">
                        <i className="fab fa-github profile-socialmedia hover-item"></i>
                        <i className="fab fa-linkedin-in profile-socialmedia hover-item"></i>
                        <i class="fab fa-twitter profile-socialmedia hover-item"></i>
                        <i class="fab fa-youtube profile-socialmedia hover-item"></i>
                        <i class="fab fa-linkedin-in profile-socialmedia hover-item"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactDetails;