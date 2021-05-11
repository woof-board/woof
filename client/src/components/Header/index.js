import React from 'react';
import '../../css/Header.css';
import Icon from '@iconify/react';
import Logo from '../../assets/images/woof-logo-white.png';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom'

function Header(props) {

    const logout = event => {
        event.preventDefault();
        Auth.logout();
      };

    const {
        links = [],
        setCurrentLink,
        currentLink
    } = props

    return (
        <nav className="header-container">
            <div className="logo">
                <img className="header-logo" src={Logo} alt=""></img>
            </div>
            <div className="nav-links-container">
                {Auth.loggedIn() ? (
                    <>
                    <Link to="/#profile">Profile</Link>
                    <a href="/" onClick={logout}>Logout</a>
                    </>
                ) : (
                    <>
                {links.map((link) => (
                    <li className="list-link">
                        <a href={link.href} className={`link ${currentLink.name === link.name && `navActive`}`} key={link.name} onClick={() => {
                        setCurrentLink(link);
                        }}>{link.name}</a>
                        <a href={link.href} className={`icon ${currentLink.name === link.name && `navActive`}`} key={link.name} onClick={() => {
                        setCurrentLink(link);
                        }}><Icon icon={link.icon}/></a>
                    </li>
                    ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Header;