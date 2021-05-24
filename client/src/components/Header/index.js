import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../css/Header.css';
import Logo from '../../assets/images/woof-logo.svg';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_USER, UPDATE_CURRENT_USER_ORDERS } from "../../utils/actions";
import { NavLink } from 'react-router-dom';

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
            href: '/ownerprofile',
            for: 'admin'
        },
        {
            name: 'Dashboard',
            href: '/admindashboard',
            for: 'admin'
        },
        {
            name: 'Schedule',
            href: '/walkerschedule',
            for: 'walker'
        },
        {
            name: 'Home',
            href: '/',
            for: 'guest'
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

        dispatch({
            type: UPDATE_CURRENT_USER_ORDERS,
            orders: []
        });
        Auth.logout();
    };
    
    let headerClass="header-container";
    if(result==="walker" || result === "guest") {
         headerClass="header-container walker-nav"
    }

    return (
        location.pathname !== "/" &&
        <nav className={headerClass}>
            <div className="logo">
                <Link to="/">
                    <img 
                        className="header-logo" 
                        src={Logo} 
                        alt="logo" 
                        width="120" 
                    />
                </Link>
            </div>
            <div className="nav-links-container">
                {/* {result !== 'guest' && ( */}
                    <>
                        <div className="nav-row">
                            {links.map((link) => (
                                link.for === result &&
                                <li key={link.name} className="link">
                                    <NavLink to={link.href} activeClassName="navActive">
                                            {link.name}
                                    </NavLink>
                                </li>                     
                            ))}   
                            {result !== 'guest' && (
                            <li className="link">
                                <Link to="/">
                                    <span 
                                        href="/" 
                                        onClick={logout} 
                                        className="link" 
                                        key="walker-logout"
                                    >
                                        Logout
                                    </span>
                                </Link>

                            </li>)}                    
                        </div>
                    </>
            </div>
        </nav>
    )
}

export default Header;