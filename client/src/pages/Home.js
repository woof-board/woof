import React from 'react';
import '../css/Home.css';


function Home() {
    return (
        <div>
            <div className="background-home">
            </div>
            <div className="home-content">
                <span className="home-text">WOOF</span>
                <span className="home-text-small">FINDING YOUR PERFECT DOG WALKER</span>
                <div className="button-container"><a className="button" href="#signup">SIGNUP</a><a className="button" href="#login">LOGIN</a></div>
            </div>
        </div>

    )
}

export default Home;