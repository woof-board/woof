import React from 'react';
import '../../css/Header.css';
import Icon from '@iconify/react';
import Logo from '../../assets/images/woof-logo.svg';
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
                <a href="/"><img className="header-logo" src={Logo} alt="" width="84" /></a>
            </div>
            <div className="nav-links-container">
                {Auth.loggedIn() ? (
                    <>
                    <Link to="/#profile">Profile</Link>
                    <a href="/" onClick={logout}>Logout</a>
                    </>
                ) : (
                    <>
                {links.map((link, index) => (
                    <li className="list-link" key={index}>
                        <a href={link.href} className={`link ${window.location.pathname === link.href && `navActive`}`} onClick={() => {
                        setCurrentLink(link);
                        }}>{link.name}</a>
                        <a href={link.href} className={`icon ${window.location.pathname === link.href && `navActive`}`} onClick={() => {
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