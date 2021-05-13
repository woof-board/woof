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
                    <Link className="link" to="/#profile">Profile</Link>
                    <Link onClick={logout} className="link" to="/">Logout</Link>
                    </>
                ) : (
                    <>
                {links.map((link) => (
                    <li className="list-link" key={link.name}>
                        <a href={link.href} className={`link ${currentLink.name === link.name && `navActive`}`} key={link.name} onClick={() => {
                        setCurrentLink(link);
                        }}>{link.name}</a>
                        <a href={link.href} className={`icon ${currentLink.name === link.name && `navActive`}`} key={link.icon} onClick={() => {
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