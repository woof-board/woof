import React from 'react';
import '../css/Home.css';


function Home() {
    return (
        <div>
            <div className="background-home">
            </div>
            <div className="home-content">
                <span className="home-text">WOOF</span>
                <span className="home-text">BOARD</span>
                <span className="home-text-small">WHERE DOG WALKERS MEET</span>
                <div className="button-container"><a className="button" href="#signup">SIGNUP</a><a className="button" href="#login">LOGIN</a></div>
            </div>
        </div>

    )
}

export default Home;