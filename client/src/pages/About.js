import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import '../css/About.css';
import AboutOwner from '../components/About/AboutOwner';
import AboutWalker from '../components/About/AboutWalker';
import AboutDevelopers from '../components/About/AboutDevelopers';
import AboutTechnology from '../components/About/AboutTechnology';
import AboutSafety from '../components/About/AboutSafety';
import AboutPayment from '../components/About/AboutPayment';
import AboutUs from '../components/About/AboutUs';
import AboutContact from '../components/About/AboutContact';
import AboutContactForm from '../components/About/AboutContactForm';
import ContactDetails from '../components/About/ContactDetails';
// import AboutApp from '../components/About/AboutApp';


function About() {

    const [links] = useState([
        {
            name: 'owner'
        },
        {
            name: 'walker'
        }
    ])

    const [safety] = useState([
        {
            name: 'null'
        },
        {
            name: 'safety'
        },
        {
            name: 'payment'
        }
    ])

    const [dev] = useState([
        {
            name: 'null'
        },
        {
            name: 'dev'
        }
    ])

    const [contact] = useState([
        {
            name: 'null'
        },
        {
            name: 'contact'
        }
    ])
    
    const [currentLink, setCurrentLink] = useState(links[0]);
    const [currentSafeLink, setCurrentSafeLink] = useState(safety[0])
    const [currentDevLink, setCurrentDevLink] = useState(dev[0])
    const [currentContactLink, setCurrentContactLink] = useState(contact[0])

    console.log(currentDevLink);

    return (
        <>
        <div className="flex-c page-margin-bottom">
            <div className="about-imgholder">
                    <div className="about-banner">
                        <span className="about-caption">About us</span>
                    </div>
            </div>

            <div className="learn-more-container">
                <h1>Servicing the Greater Toronto Area</h1>
                <div clasName="learn-more-links">
                    <span className={`aboutLink ${currentLink.name === 'owner' && `aboutActive`}`} onClick={() => { setCurrentLink(links[0]); }} >Owner</span>
                    <span className={`aboutLink ${currentLink.name === 'walker' && `aboutActive`}`} onClick={() => { setCurrentLink(links[1]); }} >Walker</span>
                </div>

                <div className="component-section">
                    <div className="content">
                        {currentLink.name === 'owner' && (
                            <AboutOwner />
                        )}
                        {currentLink.name === 'walker' && (
                            <AboutWalker />
                        )}
                    </div>
                </div>
            </div>

            <div className="about-us-container">
                    <AboutUs 
                        dev={dev}
                        currentDevLink={currentDevLink}
                        setCurrentDevLink={setCurrentDevLink}
                    />
            </div>
            
            {currentDevLink.name === 'dev' && (
                <div className="component-section">
                    <h2>Development Team</h2>
                    <div className="content flex-r">
                        <AboutDevelopers />
                    </div>
                </div>
            )}


            <div className="component-section">
            <h2>Technologies</h2>
                <div className="content">
                    <AboutTechnology
                        safety={safety}
                        currentSafeLink={currentSafeLink}
                        setCurrentSafeLink={setCurrentSafeLink}
                    />
                </div>
            </div>
            
            {currentSafeLink.name !== 'null' && (
                <div className="component-section">
                    <div className="content flex-c-center">
                        {currentSafeLink.name === 'safety' && (
                            <>
                                <h2>Navigation Safety</h2>
                                <AboutSafety />
                            </>
                        )}
                        {currentSafeLink.name === 'payment' && (
                            <>
                                <h2>Payment Safety</h2>
                                <AboutPayment />
                            </>
                        )}
                    </div>
                </div>
            )}

            <div className="about-us-container">
                    <AboutContact 
                        contact={contact}
                        currentContactLink={currentContactLink}
                        setCurrentContactLink={setCurrentContactLink}
                    />
            </div>

            {currentContactLink.name === 'contact' && (
                <div className="component-section">
                    <div className="contact-container flex-r-nospace">
                        <ContactDetails />
                        <AboutContactForm />
                    </div>
                </div>
            )}

            {/* <div className="component-section">
            <h2>Check out our App!</h2>
                <div className="content flex-r">
                    <AboutApp />
                </div>
            </div> */}
            
        </div>
        </>
    )
}

export default About;