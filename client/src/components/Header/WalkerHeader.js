import React from 'react';
import '../../css/Header.css';
import Icon from '@iconify/react';
import Logo from '../../assets/images/woof-logo.svg';

function WalkerHeader(props) {

    const {
        headerLinks = [],
        setHeaderLink,
        currentHeaderLink
    } = props

    return (
        <nav className="header-container">
            <div className="logo">
                <img className="header-logo" src={Logo} alt=""></img>
            </div>
            <div className="nav-links-container">
                {headerLinks.map((link) => (
                    <li className="list-link">
                        <a href={link.href} className={`walker-header-link ${currentHeaderLink.name === link.name && `navActive`}`} key={link.name} onClick={() => {setHeaderLink(link);
                        }} >{link.name}</a>
                    </li>                    
                ))}

            </div>
        </nav>
    )
}

export default WalkerHeader;