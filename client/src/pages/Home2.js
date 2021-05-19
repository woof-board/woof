import React, { useState} from 'react';
import { Link } from 'react-router-dom';

import '../css/Home2.css';
import OwnerWalkerForm from '../components/OwnerWalkerForm';
import FormHeader from '../components/LoginSignupForm';
import WalkerLoginForm from '../components/WalkerLoginForm';
import WalkerSignupForm from '../components/WalkerSignupForm';
import OwnerLoginForm from '../components/OwnerLoginForm';
import OwnerSignupForm from '../components/OwnerSignupForm';
import Logo from '../assets/images/woof-logo-circle.svg'
function HomeMock() {

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

                <h3 className="smaller-font">{currentLink.name} {currentFormLink.name}</h3>
                    <OwnerWalkerForm 
                        links={links}
                        currentLink={currentLink}
                        setCurrentLink={setCurrentLink}
                    />
                    {currentLink.name === 'WALKER' &&  (
                        <>
                            <FormHeader
                                currentLink={currentLink}
                                setCurrentLink={setCurrentLink}
                                formLinks={formLinks}
                                currentFormLink={currentFormLink}
                                setFormCurrentLink={setFormCurrentLink}
                            />
                            
                            {currentFormLink.name === 'LOGIN' && (
                                <>
                                    <WalkerLoginForm />
                                </>
                            )}
                            {currentFormLink.name === 'SIGNUP' && (
                                <>
                                    <WalkerSignupForm />
                                </>
                            )}
                        </>
                    )}
                    {currentLink.name === 'OWNER' && (
                        <>
                        <FormHeader
                            currentLink={currentLink}
                            setCurrentLink={setCurrentLink}
                            formLinks={formLinks}
                            currentFormLink={currentFormLink}
                            setFormCurrentLink={setFormCurrentLink}
                        />
             
                        {currentFormLink.name === 'LOGIN' && (
                            <>
                                <OwnerLoginForm />
                            </>
                        )}
                        {currentFormLink.name === 'SIGNUP' && (
                            <>
                                <OwnerSignupForm />
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

export default HomeMock;