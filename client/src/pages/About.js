import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import '../css/About.css';
import AboutOwner from '../pages/AboutOwner';
import AboutWalker from '../pages/AboutWalker';
import AboutDevelopers from '../components/About/AboutDevelopers';
import AboutTechnology from '../components/About/AboutTechnology';
import AboutApp from '../components/About/AboutApp';


function About() {



    const [links] = useState([
        {
            name: 'owner'
        },
        {
            name: 'walker'
        }
    ])
    
    const [currentLink, setCurrentLink] = useState(links[0]);

    console.log(currentLink);

    return (
        <>
        <div className="flex-c">
            <div className="about-imgholder">
                    <div className="about-banner">
                        <span className="about-title">About Woof</span>
                        <span className="about-caption">For you and your dogs</span>
                    </div>
                    <div>
                </div>
            </div>

            <div className="learn-more-container">
                <h1>Learn More</h1>
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

            <div className="component-section">
            <h2>Technologies</h2>
                <div className="content">
                    <AboutTechnology />
                </div>
            </div>

            <div className="component-section">
            <h2>Check out our App!</h2>
                <div className="content flex-r">
                    <AboutApp />
                </div>
            </div>
            
            <div className="component-section">
            <h2>Team</h2>
                <div className="content flex-r">
                    <AboutDevelopers />
                </div>
            </div>
        </div>
        </>
    )
}

export default About;