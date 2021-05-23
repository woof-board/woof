import React from 'react';

function AboutContact(props) {

    const {
        contact = [],
        currentContactLink,
        setCurrentContactLink
    } = props

    return (
        <>
            <div className="about-contact-banner">
                    <span className="about-caption">Contact Us</span>
                    {/* <div>
                        <span className={`about-contact ${currentContactLink.name === 'dev' && `contactActive`}`} onClick={() => {setCurrentContactLink(contact[1])}}>Click here</span>
                        <div className="about-contact-button-anim"></div>
                    </div> */}

            </div>
        </>
    )
}

export default AboutContact;