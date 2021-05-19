import React from 'react';
import '../../css/LoginSignupForm.css';

function FormHeader(props) {

    const {
        currentLink,
        formLinks = [],
        setFormCurrentLink,
        currentFormLink,
    } = props

    console.log(currentLink)

    return (
        <div className={`form-title ${currentLink.action}`}>
            {formLinks.map((link) => (
            <h3 key={link.name} className={`form-link ${currentFormLink.name === link.name && `formActive`}`} onClick={() => { setFormCurrentLink(link);}} id={link.id}>{link.name}</h3>
            ))}                 
        </div>
    )
}

export default FormHeader;