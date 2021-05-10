import React from 'react';
import '../../css/Header.css';
import Icon from '@iconify/react';

function Header(props) {

    const {
        links = [],
        setCurrentLink,
        currentLink
    } = props

    return (
        <nav className="header-container">
            <div className="logo">
                img here
            </div>
            <div className="nav-links-container">
                {links.map((link) => (
                <li
                    className="list-link">
                    <a href={link.href} className={`link ${currentLink.name === link.name && `navActive`}`} key={link.name} onClick={() => {
                    setCurrentLink(link);
                    }}>{link.name}</a>
                    <a href={link.href} className={`icon ${currentLink.name === link.name && `navActive`}`} key={link.name} onClick={() => {
                    setCurrentLink(link);
                    }}><Icon icon={link.icon}/></a>
                </li>
                ))}
            </div>
        </nav>
    )
}

export default Header;