import React, { useState } from 'react';

function ContactDetails() {
    return (
        <>
            <div className="contact-us-container-left">
                <div>
                    <h2 className="font-night">Let's get in touch</h2>
                    <h3 className="font-night">We're open for any suggestion or just to have a chat.</h3>
                </div>
                <div>
                    <div className="privacy-items">
                        <li className="hover-item email-item font-night">Web Privacy Policy</li>
                        <li className="hover-item email-item font-night">Web Terms of Use</li>
                        <li className="hover-item email-item font-night">Web Cookie Policy</li>
                        <li className="hover-item email-item font-night">Report a Scam</li>
                    </div>
                    <div className="icon-list">
                        <i className="fab fa-github profile-socialmedia hover-item font-night"></i>
                        <i className="fab fa-linkedin-in profile-socialmedia hover-item font-night"></i>
                        <i class="fab fa-twitter profile-socialmedia hover-item font-night"></i>
                        <i class="fab fa-youtube profile-socialmedia hover-item font-night"></i>
                        <i class="fab fa-linkedin-in profile-socialmedia hover-item font-night"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactDetails;