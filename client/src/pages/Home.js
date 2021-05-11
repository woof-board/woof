import React from 'react';
import '../css/Home.css';


function Home(props) {

    const {
        links = [],
        setCurrentLink
    } = props

    return (
        <div>
            <div className="background-home">
            </div>
            <div className="home-content">
                <span className="home-text">WOOF</span>
                <span className="home-text-small">FINDING YOUR PERFECT DOG WALKER</span>
                <div className="center-h">
                    <div className="button-container">  
                        {links.map((link) => (
                            <a className="button" href={link.href} onClick={() => {
                            setCurrentLink(link);
                            }}>{link.name}</a>

                        ))}
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Home;