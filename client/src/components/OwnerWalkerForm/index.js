import React from 'react';

function OwnerWalkerForm(props) {

    const {
        links = [],
        currentLink,
        setCurrentLink
    } = props


    return (
        <div className="home-links">
            {links.map((link) => (
                <span key={link.name} className={`home-button ${link.name} ${currentLink.name === link.name &&  `buttonActive`}`} onClick={() => { setCurrentLink(link);}}>{link.name}</span>
            ))}
        </div>
    )
}

export default OwnerWalkerForm;