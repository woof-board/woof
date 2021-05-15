import React from 'react';
import '../../css/Footer.css';
import { Link } from 'react-router-dom';

function Footer(props) {

    const {
        footerLinks
    } = props;

    return (
        <div className="footer-container">
            <div className="footer-left">
                    &copy;2021 by Woof
            </div>
            <div className="footer-right">
                {footerLinks.map((link) => (
                    <Link key={link.name} to={link.href}>
                        <span className="footer-link">{link.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Footer;