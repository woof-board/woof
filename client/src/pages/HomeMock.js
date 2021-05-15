import React, { useState} from 'react';
import '../css/HomeMock.css';
import OwnerWalkerForm from '../components/OwnerWalkerForm';
import FormHeader from '../components/LoginSIgnupForm';
import WalkerLoginForm from '../components/WalkerLoginForm';
import WalkerSignupForm from '../components/WalkerSignupForm';
import OwnerLoginForm from '../components/OwnerLoginForm';
import OwnerSignupForm from '../components/OwnerSignupForm';
import { Link } from 'react-router-dom';

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
            hover: 'login-hover'
        },
        {
            name: 'SIGNUP',
            id: 'active-title',
            hover: 'login-hover'
        }
    ])

    const [currentLink, setCurrentLink] = useState(links[0]);

    const [currentFormLink, setFormCurrentLink] = useState(formLinks[0])

    return (
            <>
            <div className="home-new"></div>
            <div className="center-page-vh">
                <img src={process.env.PUBLIC_URL + `/images/woof-logo.svg`} alt="logo" className="home-logo"/>
                <div className="home-font-small">
                    WHERE DOGS GET THEIR PERFECT WALK
                </div>
                    <OwnerWalkerForm 
                        links={links}
                        currentLink={currentLink}
                        setCurrentLink={setCurrentLink}
                    />
                    {currentLink.name === 'WALKER' &&  (
                        <>
                            <FormHeader 
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
                    <Link to="/about">Learn More</Link>

            </div>
            </>
    )
}

export default HomeMock;