import React from 'react';
//import '../../css/WalkerProfile.css';

function WalkerEarnings({earnings=0}) {
    return (
        <div className="walker-contact-container">
          <div className="walker-header">
            <h3>My Earnings</h3>
          </div>
          <form  className="user-update-form">
            <div key="prop" className="walks">
              <div>Earnings: ${earnings.toFixed(2)}</div>
            </div>
            <button
                    type="submit"
                    className="update-walker-button"
            >
              REQUEST PAYOUT
            </button>
          </form>
        </div>
    )
}

export default WalkerEarnings;