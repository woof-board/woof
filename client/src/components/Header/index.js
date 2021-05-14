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
<<<<<<< HEAD
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
=======
                {links.map((link) => (
                    <li key={link.name} className="list-link">
                        <a href={link.href} className="link" 
                        >{link.name}</a>
>>>>>>> develop
                    </li>
                ))}
            </div>
        </nav>
    )
}

export default Header;