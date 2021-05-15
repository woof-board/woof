import React from 'react';
import '../../css/Header.css';
import Logo from '../../assets/images/woof-logo.svg';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

function Header(props) {

    const {
        headerLinks = [],
        setHeaderCurrentLink,
        currentHeaderLink,
        ownerLinks = [],
        setOwnerLink,
        currentOwnerLink,
        walkerLinks = [],
        currentWalkerLink,
        setWalkerLink,
        result
    } = props

    const logout = event => {
        event.preventDefault();
        Auth.logout();
      };

    return (
        <nav className="header-container">
            <div className="logo">
                <a href="/"><img className="header-logo" src={Logo} alt="" width="84" /></a>
            </div>
            <div className="nav-links-container">
                {result === 'guest' && (
                    <div className="nav-row">
                    {headerLinks.map((link) => (
                        <li key={link.name} className="list-link">
                            <Link to={link.href}>
                                <span className={`link ${currentHeaderLink.name === link.name && `listActive`}`} onClick={() => {setHeaderCurrentLink(link);
                                }}>{link.name}</span>
                            </Link>
                        </li>
                    ))}
                    </div>
                )}
                {result === 'owner' && (
                    <div className="nav-row">
                        {ownerLinks.map((link) => (
                            <li key={link.name} className="list-link">
                                <Link to={link.href}>
                                    <span className={`link ${currentOwnerLink.name === link.name && `listActive`}`} onClick={() => {setOwnerLink(link.href);
                                }} >{link.name}</span>
                                </Link>
                            </li>                     
                        ))}
                        <li className="list-link">
                            <a href="/" onClick={logout} className="link" key="walker-logout">Logout</a>
                        </li>                         
                    </div>
                )}
                {result === 'walker' && (
                    <div className="nav-row">
                        {walkerLinks.map((link) => (
                            <li key={link.name} className="list-link">
                                <Link to={link.href}>
                                    <span className={`link ${currentWalkerLink.name === link.name && `listActive`}`} onClick={() => {setWalkerLink(link);
                                }} >{link.name}</span>
                                </Link>
                            </li>       
                        ))}
                        <li className="list-link">
                            <a href="/" onClick={logout} className="link" key="walker-logout">Logout</a>
                        </li> 
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Header;