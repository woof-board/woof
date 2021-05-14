import React from 'react';
import '../../css/Header.css';
import Logo from '../../assets/images/woof-logo.svg';
import Auth from '../../utils/auth';

function WalkerHeader(props) {

    const {
        walkerLinks = [],
        setWalkerLink,
        currentWalkerLink
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
                {walkerLinks.map((link) => (
                    <li key={link.name} className="list-link">
                        <span className={`link ${currentWalkerLink.name === link.name && `listActive`}`} onClick={() => {setWalkerLink(link);
                        }} >{link.name}</span>
                    </li>       
                ))}
                <li className="list-link">
                    <a href="/" onClick={logout} className="link" key="walker-logout">Logout</a>
                </li> 
            </div>
        </nav>
    )
}

export default WalkerHeader;