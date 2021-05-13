import React from 'react';
import '../../css/Header.css';
import Logo from '../../assets/images/woof-logo.svg';

function Header(props) {

    const {
        links = [],
    } = props

    return (
        <nav className="header-container">
            <div className="logo">
                <a href="/"><img className="header-logo" src={Logo} alt="" width="84" /></a>
            </div>
            <div className="nav-links-container">
                {links.map((link) => (
                    <li className="list-link">
                        <a key={link.name} href={link.href} className="link" 
                        >{link.name}</a>
                    </li>
                ))}
            </div>
        </nav>
    )
}

export default Header;