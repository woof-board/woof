import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../css/Header.css';
import Logo from '../../assets/images/woof-logo.svg';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../../utils/actions";
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
        Auth.logout();
    };
    
    let headerClass="header-container";
    if(result==="walker" || result === "guest") {
         headerClass="header-container walker-nav"
    }

    var page = document.querySelector('body');
    var bg = 'background-color';

    const setDark = event => {
        event.preventDefault();
        var componentSection = document.querySelectorAll('.component-section');
        var aboutFont = document.querySelectorAll('.content');
        var fontH2 = document.querySelectorAll('.font-night');
        var contactUs = document.querySelectorAll('.contact-us-container-left');
        var walkerEl = document.querySelectorAll('.walker-contact-container')
        var walkerHeaderEl = document.querySelectorAll('.walker-header');
        var headerEl = document.querySelectorAll('.header-container');
        var footerEl = document.querySelectorAll('.footer');
        var aboutCardEl = document.querySelectorAll('.about-card, .profile-picture');

        page.style.setProperty(bg, 'rgb(43, 43, 43)');

        for (var w = 0; w < aboutCardEl.length; w++) {
            aboutCardEl[w].style.backgroundColor = 'rgb(53, 53, 53)';
        }

        for (var u = 0; u < fontH2.length; u++) {
            fontH2[u].style.color = 'white';
        }

        for (var e = 0; e < footerEl.length; e++) {
            footerEl[e].style.backgroundColor = 'rgb(16, 0, 57)'
        }

        for (var h = 0; h < headerEl.length; h++) {
            headerEl[h].style.backgroundColor = 'rgb(16, 0, 57)'
        }

        for (var r = 0; r < walkerHeaderEl.length; r++) {
            walkerHeaderEl[r].style.backgroundColor = 'rgb(0, 62, 12)';
        }

        for (var t = 0; t < walkerEl.length; t++) {
            walkerEl[t].style.backgroundColor = 'rgb(62, 62, 62)';
        }

        for (var i = 0; i < componentSection.length; i ++) {
            componentSection[i].style.backgroundColor = 'rgb(43, 43, 43)';
        }

        for (var j = 0; j < aboutFont.length; j ++) {
            aboutFont[j].style.color = 'white'
        }

        for (var y = 0; y < contactUs.length; y++) {
            contactUs[y].style.backgroundColor = 'rgb(53, 53, 53)';
        }

    }

    const setLight = event => {
        event.preventDefault();
        var componentSection = document.querySelectorAll('.component-section');
        var aboutFont = document.querySelectorAll('.content');
        var fontH2 = document.querySelectorAll('.font-night');
        var contactUs = document.querySelectorAll('.contact-us-container-left');
        var walkerEl = document.querySelectorAll('.walker-contact-container')
        var walkerHeaderEl = document.querySelectorAll('.walker-header');
        var headerEl = document.querySelectorAll('.header-container');
        var footerEl = document.querySelectorAll('.footer');
        var aboutCardEl = document.querySelectorAll('.about-card');

        page.style.setProperty(bg, 'var(--quinary)');

        for (var w = 0; w < aboutCardEl.length; w++) {
            aboutCardEl[w].style.backgroundColor = ''
        }

        for (var u = 0; u < fontH2.length; u++) {
            fontH2[u].style.color = 'black';
        }

        for (var e = 0; e < footerEl.length; e++) {
            footerEl[e].style.backgroundColor = 'var(--primary)'
        }

        for (var h = 0; h < headerEl.length; h++) {
            headerEl[h].style.backgroundColor = 'var(--primary)'
        }

        for (var r = 0; r < walkerHeaderEl.length; r++) {
            walkerHeaderEl[r].style.backgroundColor = 'var(--tertiary)';
        }

        for (var t = 0; t < walkerEl.length; t++) {
            walkerEl[t].style.backgroundColor = 'var(--secondary)';
        }

        for (var i = 0; i < componentSection.length; i ++) {
            componentSection[i].style.backgroundColor = 'var(--quinary)';
        }

        for (var j = 0; j < aboutFont.length; j ++) {
            aboutFont[j].style.color = 'black';
        }

        for (var y = 0; y < contactUs.length; y++) {
            contactUs[y].style.backgroundColor = 'white';
        }
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
                        {/* <div onClick={setDark}><i class="far fa-moon header-icon"></i></div>
                        <div onClick={setLight}><i class="far fa-sun header-icon"></i></div> */}
                    </>
                {/* } */}
            </div>
        </nav>
    )
}

export default Header;