import React from 'react';
import '../../css/Footer.css';

function Footer(props) {

    const {
        footerLinks
    } = props

    return (
        <div className="footer-container">
            <div className="footer-content">
                <div>
                    &copy;2021 by Woof
                </div>
                <div>
                {footerLinks.map((link) => (
                    <a href={link.href} className="footer-link">{link.name}</a>
                ))}
                </div>
            </div>
        </div>
    )
}

export default Footer;