import React from 'react';
import '../../css/Footer.css';

function Footer(props) {

    const {
        footerLinks
    } = props

    return (
        <div className="footer-container">
            <div className="footer-left">
                    &copy;2021 by Woof
            </div>
            <div className="footer-right">
            {footerLinks.map((link) => (
                    <a key={link.name} href={link.href} className="footer-link">{link.name}</a>
                ))}
            </div>
        </div>
    )
}

export default Footer;