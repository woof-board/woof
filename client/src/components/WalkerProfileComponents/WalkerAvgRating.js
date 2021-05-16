import React from 'react';
//import '../../css/WalkerProfile.css';

function WalkerAvgRating({average_rating}) {
    return (
        <div className="walker-profile-container">
          <div>
            My Rating
          </div>
          <div className="average-rating">
            {parseFloat(average_rating).toFixed(1)}
          </div>
        </div>
    )
}

export default WalkerAvgRating;