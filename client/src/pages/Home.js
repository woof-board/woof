import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../css/Home.css';
import OwnerWalkerForm from '../components/OwnerWalkerForm';
import WalkerLoginForm from '../components/WalkerLoginForm';
import WalkerSignupForm from '../components/WalkerSignupForm';
import OwnerLoginForm from '../components/OwnerLoginForm';
import OwnerSignupForm from '../components/OwnerSignupForm';
import Logo from '../assets/images/woof-logo-circle.svg'


function Home() {

    document.body.classList.add('home-back');

    const [links] = useState([
        {
            name: 'OWNER',
            action: 'owner'
        },
        {
            name: 'WALKER',
            action: 'walker'
        },
    ])

    const [formLinks] = useState([
        {
            name: 'LOGIN',
            id: 'active-title',
            hover: 'login-hover',
            userType: 'OWNER'
        },
        {
            name: 'SIGNUP',
            id: 'active-title',
            hover: 'login-hover',
            userType: 'OWNER'
        }
    ])

    const [currentLink, setCurrentLink] = useState(links[0]);

    const [currentFormLink, setFormCurrentLink] = useState(formLinks[0])

    return (
            <>
            <div className="home-new">
            <div className="center-page-vh">
                <img src={Logo} alt="logo" className="home-logo"/>

                <h1 className="home-font-small">
                    WHERE DOGS GET THEIR PERFECT WALK
                </h1>

                    <OwnerWalkerForm 
                        links={links}
                        currentLink={currentLink}
                        setCurrentLink={setCurrentLink}
                    />
                        
                            <div className={`form-title ${currentLink.action}`}>
                                <h3>{currentLink.name} {currentFormLink.name}</h3>
                            </div>
                    {currentLink.name === 'WALKER' &&  (
          
                        <>   
                            {currentFormLink.name === 'LOGIN' && (
                                <>
                                    <WalkerLoginForm 
                                        formLinks={formLinks}
                                        setFormCurrentLink={setFormCurrentLink}
                                    />
                                </>
                            )}
                            {currentFormLink.name === 'SIGNUP' && (
                                <>
                                    <WalkerSignupForm 
                                        formLinks={formLinks}
                                        setFormCurrentLink={setFormCurrentLink}
                                    />
                                </>
                            )}
                        </>
                    )}
                    {currentLink.name === 'OWNER' && (
                        <>
             
                        {currentFormLink.name === 'LOGIN' && (
                            <>
                                <OwnerLoginForm 
                                    formLinks={formLinks}
                                    setFormCurrentLink={setFormCurrentLink}
                                />
                            </>
                        )}
                        {currentFormLink.name === 'SIGNUP' && (
                            <>
                                <OwnerSignupForm 
                                    formLinks={formLinks}
                                    setFormCurrentLink={setFormCurrentLink}
                                />
                            </>
                        )}
                        </>
                    )}
                    <Link to="/about" className="more-link">Learn More</Link>
            </div>
            </div>
            </>
    )
}

export default Home;