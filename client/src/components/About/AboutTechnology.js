import React from 'react';

function AboutTechnology(props) {

    const {
        safety = [],
        currentSafeLink,
        setCurrentSafeLink
    } = props

    return (
        <>
        <div className="flex-tech">
            <div className="tech-card">
                <img className="tech-picture" alt="gps" src={process.env.PUBLIC_URL + '/images/about-gps.jpeg'} />
                <p><b>Our commitment is your safety</b></p>
                <p>With every safety feature and every standard in our Community Guidelines, we're committed to helping to create a safe environment for our users.</p>

                <div className="">
                    <span className={`learnLink ${currentSafeLink.name === 'safety' && `learnActive`}`} onClick={() => { setCurrentSafeLink(safety[1]); }} > Learn More </span>
                    <div className="hover-line"></div>
                </div>
            </div>
            <div className="tech-card">
                <img className="tech-picture" alt="gps" src={process.env.PUBLIC_URL + '/images/about-payment.png'} />
                <p><b>Easy payment options</b></p>
                <p>Our app is available with the best payment options, which provides secure, easy and fast payments for our users.</p>

                <div className="">
                <span className={`learnLink ${currentSafeLink.name === 'payment' && `learnActive`}`} onClick={() => { setCurrentSafeLink(safety[2]); }} > Learn More </span>  
                <div className="hover-line"></div>
                </div>
            </div>
        </div>

        </>
    )
}

export default AboutTechnology;