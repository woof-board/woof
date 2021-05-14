import React from 'react';
import '../../css/Header.css';
import Logo from '../../assets/images/woof-logo.svg';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

function Header(props) {

    const {
        ownerLinks = [],
        setOwnerLink,
        currentOwnerLink,
    } = props

    const logout = event => {
        event.preventDefault();
        Auth.logout();
      };

    return (
        <nav className="header-container">
            <div className="logo">
                <img className="header-logo" src={Logo} alt=""></img>
            </div>
            <div className="nav-links-container">
                {ownerLinks.map((link) => (
                    <li key={link.name} className="list-link">
                        <Link to={link.href}>
                            <span className={`link ${currentOwnerLink.name === link.name && `listActive`}`} onClick={() => {setOwnerLink(link.href);
                        }} >{link.name}</span>
                        </Link>
                    </li>                     
                ))}
                <li className="list-link">
                    <a href="/" onClick={logout} className="link" key="owner-logout">Logout</a>
                </li> 
            </div>
        </nav>
    )
}

export default Header;