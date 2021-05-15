import React from 'react';
import '../../css/HomeMock.css';
import Auth from '../../utils/auth';

function OwnerWalkerForm(props) {

    const {
        links = [],
        currentLink,
        setCurrentLink
    } = props

    return (
        <div className="home-links">
            {links.map((link) => (
                <span className={`home-button ${currentLink.name === link.name && `buttonActive`}`} onClick={() => { setCurrentLink(link);}}>{link.name}</span>
            ))}
        </div>
    )
}

export default OwnerWalkerForm;