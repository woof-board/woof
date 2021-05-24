import React from 'react';

function AboutTechnology() {

    return (
        <>
        <div className="flex-tech">
            <div className="tech-card">
                <img className="tech-picture" alt="gps" src={process.env.PUBLIC_URL + '/images/about-gps.jpeg'} />
                <p><b>Our commitment is your safety</b></p>
                <p>With every safety feature and every standard in our Community Guidelines, we're committed to helping to create a safe environment for our users.</p>
            </div>
            <div className="tech-card">
                <img className="tech-picture" alt="gps" src={process.env.PUBLIC_URL + '/images/about-payment.png'} />
                <p><b>Easy payment options</b></p>
                <p>Our app is available with the best payment options, which provides secure, easy and fast payments for our users.</p>
            </div>
        </div>

        </>
    )
}

export default AboutTechnology;