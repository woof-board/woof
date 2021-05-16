import React from 'react';
import '../../css/LoginSignupForm.css';

function FormHeader(props) {

    const {
        formLinks = [],
        setFormCurrentLink,
        currentFormLink
    } = props

    return (
        <div className="form-title">
            {formLinks.map((link) => (
            <span key={link.name} className={`form-link ${currentFormLink.name === link.name && `formActive`}`} onClick={() => { setFormCurrentLink(link);}} id={link.id}>{link.name}</span>
            ))}                 
        </div>
    )
}

export default FormHeader;