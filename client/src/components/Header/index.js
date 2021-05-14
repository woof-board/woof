import React from 'react';
import '../../css/Header.css';
import Logo from '../../assets/images/woof-logo.svg';
import { Link } from 'react-router-dom';

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
                        <Link to={link.href}>
                            <span className={`link ${currentHeaderLink.name === link.name && `listActive`}`} onClick={() => {setHeaderCurrentLink(link);
                            }}>{link.name}</span>
                        </Link>
                    </li>
                ))}
            </div>
        </nav>
    )
}

export default Header;