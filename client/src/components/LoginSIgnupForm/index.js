import React from 'react';
import '../../css/Walker.css';

function FormHeader(props) {

    const {
        links = [],
        setCurrentLink,
        currentLink
    } = props

    return (
        <div className="walker-form-title">
            {links.map((link) => (
            <span className={`${link.id} ${currentLink.name === link.name && `linkActive`}`} onClick={() => { setCurrentLink(link);}} id={link.id}>{link.name}</span>
            ))}                 
        </div>
    )
}

export default FormHeader;