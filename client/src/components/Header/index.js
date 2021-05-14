import React from 'react';
import '../../css/Header.css';
import Logo from '../../assets/images/woof-logo.svg';

function Header(headerprops) {

    const {
        headerLinks = [],
        setHeaderCurrentLink,
        currentHeaderLink
    } = headerprops

    return (
        <nav className="header-container">
            <div className="logo">
                <a href="/"><img className="header-logo" src={Logo} alt="" width="84" /></a>
            </div>
            <div className="nav-links-container">
                {headerLinks.map((link) => (
                    <li key={link.name} className="list-link">
                        <span className={`link ${currentHeaderLink.name === link.name && `listActive`}`}  onClick={() => {setHeaderCurrentLink(link)}}
                        >{link.name}</span>
                    </li>
                ))}
            </div>
        </nav>
    )
}

export default Header;