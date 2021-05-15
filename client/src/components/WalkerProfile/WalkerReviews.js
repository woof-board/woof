import React from 'react';
import '../../css/WalkerProfile.css';

function WalkerReviews({ reviews=[] }) {
    const totalReviews = reviews.length;

    return (
        <div className="walker-profile-container">
          <div>
            My Reviews - {totalReviews ? `Viewing ${totalReviews} past ${totalReviews === 1 ? 'review' : 'reviews'}:`
              : 'You have no past Reviews'}
          </div>
            {reviews.map( (review, ind) => (
              <div key={ind} className="walks">
              <div>Rating: {review.rating}</div>
              <div>{review.reviewText}</div> 
            </div>
            ))}
        </div>
    )
}

export default WalkerReviews;