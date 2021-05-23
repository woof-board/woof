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

    document.body.classList.remove('home-back');

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

    // console.log(currentDevLink);

    return (
        <>
        <div className="flex-page page-margin-bottom">
            <div className="about-page-width">
                <div className="about-imgholder">
                        <div className="about-banner">
                            {/* <span className="about-caption">About us</span> */}
                        </div>
                </div>

                <div className="learn-more-container">
                    <h1>Servicing the Greater Toronto Area</h1>

                    <div className="component-section">
                        <div className="content">
                        <p>
                            You need a break. So do your dogs. We will help both! 
                            Woof connects dog owners with dog walkers who’ll treat your dog like family.
                            You can trust us to keep your pet happy, healthy, and sweet as ever.
                        </p>
                        <p>
                            We understand that life can be hectic and it may be hard to fit in a lengthy walk for your furry friend. 
                            We are here to take that stress away from you to give your pal the exercise and 
                            relief that it needs so you can focus on other tasks at hand.
                        </p>
                        <p>
                            We are dog lovers and our dog walkers have lots of experience taking care of dogs. 
                            Walkers are responsible and caring. They take care of your pet with respect. 
                            They offer affection and attention to your pet, when you can’t be there.
                        </p>
                        <p>
                            Woof is also a cutting edge technology business committed to making pet care safe, 
                            easy, and affordable so that everyone can experience the unconditional love of a pet.
                        </p>
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
                        <h2 className="font-night">Development Team</h2>
                        <div className="dev-content flex-r">
                            <AboutDevelopers />
                        </div>
                    </div>
                )}


                <div className="component-section">
                <h2 className="font-night">Technologies</h2>
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

                    <div className="component-section">
                        <div className="contact-container flex-r-nospace">
                            <ContactDetails />
                            <AboutContactForm />
                        </div>
                    </div>


                {/* <div className="component-section">
                <h2>Check out our App!</h2>
                    <div className="content flex-r">
                        <AboutApp />
                    </div>
                </div> */}
                
            </div>
        </div>
        </>
    )
}

export default About;