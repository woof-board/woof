import React from 'react';
//import '../../css/WalkerProfile.css';

function WalkerEarnings({earnings=0}) {
    return (
        <div className="walker-profile-container">
          <div>
            My Earnings for current period
          </div>
              <div key="prop" className="walks">
                <div>Earnings: {earnings} CAD</div>
            </div>
        </div>
    )
}

export default WalkerEarnings;