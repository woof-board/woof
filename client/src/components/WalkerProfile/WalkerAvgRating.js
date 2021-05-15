import React from 'react';
import '../../css/WalkerProfile.css';

function WalkerAvgRating({averageRating}) {
    return (
        <div className="walker-profile-container">
          <div>
            My Rating
          </div>
          <div className="average-rating">
            {parseInt(averageRating).toFixed(1)}
          </div>
        </div>
    )
}

export default WalkerAvgRating;