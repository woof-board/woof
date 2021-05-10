import React from 'react';
import '../css/Walkers.css';

function Walkers() {

    const allWalkers = [1,2,3,4]

    console.log(allWalkers.length)

    return (
        <div id="walkers">
            {allWalkers.map((walkers) =>
            <div className="walkers-container">
                <div></div>
                <div className="picture-container">
                    <img alt="" src="http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/blond-haired-man.png"></img></div>
                <div className="walker-content-container">
                    <div>NAME NAME</div>
                    <div>ICONS</div>
                    <div>Rating</div>
                    <div className="button-profile-container">
                        <div className="profile-button"><span>PROFILE</span></div>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default Walkers;