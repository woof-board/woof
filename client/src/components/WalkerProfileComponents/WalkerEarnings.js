import React from 'react';
<<<<<<< HEAD
import '../../css/WalkerProfile.css';
=======
//import '../../css/WalkerProfile.css';
>>>>>>> 0588cfdd685bf938a28914e2ba3203539f50aef9

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