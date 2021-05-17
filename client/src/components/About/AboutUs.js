import React from 'react';

function AboutDev(props) {

    const {
        dev=[],
        currentDevLink,
        setCurrentDevLink
    } = props

    return (
        <>
            <div className="about-us-banner">
                    <span className="about-caption">A little about US</span>
                    <div>
                        <span className={`about-learn-more ${currentDevLink.name === 'dev' && `devActive`}`} onClick={() => {setCurrentDevLink(dev[1])}}>Meet our DEV Team!</span>
                        <div className="about-button-anim"></div>
                    </div>

            </div>
        </>
    )
}

export default AboutDev;