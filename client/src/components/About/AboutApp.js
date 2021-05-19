import React from 'react';

function AboutApp() {
    return (
        <>
        <div className="app-card">
            <img className="app-logo" alt="app-logo" src={process.env.PUBLIC_URL + '/images/woof-logo.svg'} />
            <div className="app-description">
                Download the Woof app     ⮕
            </div>
        </div>

        </>
    )
}

export default AboutApp;