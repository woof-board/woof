import React from 'react';
import '../css/Walkers.css';

function WalkerSchedule() {


    return (
        <div id="walkers">
            <div className="headline">            
                <h1>Walking Schedule</h1>
            </div>

            <div className="walkers-container">
                <div className="picture-container">
                    <img alt="" className="walker-list-picture" src="http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/blond-haired-man.png"></img>
                </div>
                <div className="walker-content-container">
                    <div>NAME NAME</div>
                    <div>ICONS</div>
                    <div>Rating</div>
                    <div className="button-profile-container">
                        <div className="profile-button"><span>PROFILE</span></div>
                    </div>
                </div>
                <div className="schedule-container">
                    <div className="schedule-item">1</div>
                    <div className="schedule-item">2</div>
                    <div className="schedule-item">3</div>
                    <div className="schedule-item">4</div>
                    <div className="schedule-item">5</div>
                    <div className="schedule-item">6</div>
                    <div className="schedule-item">7</div>  
                </div>
            </div>
        </div>
    )
}

export default WalkerSchedule;