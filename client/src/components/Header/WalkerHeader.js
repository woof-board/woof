import React from 'react';
import '../../css/Header.css';
import Icon from '@iconify/react';
import Logo from '../../assets/images/woof-logo-black.png';

function HomeHeader(props) {

    const links = [{name: 'Home'}, {name: 'Profile'}]

    console.log(links)

    return (
        <nav className="header-container">
            <div className="logo">
                <img className="header-logo" src={Logo} alt=""></img>
            </div>
            <div className="nav-links-container">
                {links.map((links) => (
                    <li className="list-link">
                        <a href={links.name} key={links.name} onClick={() => {
                        }}>{links.name}</a>
                    </li>                    
                ))}

            </div>
        </nav>
    )
}

export default HomeHeader;