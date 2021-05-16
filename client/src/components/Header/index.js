import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../css/Header.css';
import Logo from '../../assets/images/woof-logo.svg';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../../utils/actions";

function Header() {

    const [links] = useState([
        {
            name: 'Profile',
            href: '/walkerprofile',
            for: 'walker'
        },
        {
            name: 'Profile',
            href: '/ownerprofile',
            for: 'owner'
        },
        {
            name: 'Profile',
            href: '/adminprofile',
            for: 'admin'
        },
        {
            name: 'Dashboard',
            href: '/admindashboard',
            for: 'admin'
        }
    ]);

    const [state, dispatch] = useStoreContext();
    const location = useLocation();
    const result = Auth.getProfileType();
    
    const [currentLink, setCurrentLink] = useState(links[0]);
    
    useEffect(() => {
        if(result === 'owner' || result === 'admin'){
            setCurrentLink(result === 'owner' ? links[1] : links[2]);
        }
    }, [result, links]);

    const logout = event => {
        event.preventDefault();
        dispatch({
            type: UPDATE_CURRENT_USER,
            currentUser: null
        });
        Auth.logout();
    };

    return (
        location.pathname !== "/" &&
        <nav className="header-container">
            <div className="logo">
                <Link to="/">
                    <img 
                        className="header-logo" 
                        src={Logo} 
                        alt="logo" 
                        width="84" 
                    />
                </Link>
            </div>
            <div className="nav-links-container">
                {result !== 'guest' && (
                    <>
                        <div className="nav-row">
                            {links.map((link) => (
                                link.for === result &&
                                <li key={link.name} className="list-link">
                                    <Link to={link.href}>
                                        <span 
                                            className={`link ${currentLink.name === link.name && `listActive`}`} 
                                            onClick={() => {setCurrentLink(link);}}
                                        >
                                            {link.name}
                                        </span>
                                    </Link>
                                </li>                     
                            ))}                       
                        </div>
                        <li className="list-link">
                            <a 
                                href="/" 
                                onClick={logout} 
                                className="link" 
                                key="walker-logout"
                            >
                                Logout
                            </a>
                        </li> 
                    </>)
                }
            </div>
        </nav>
    )
}

export default Header;