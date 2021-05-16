import React from 'react';
import '../../css/WalkerProfile.css';
import SingleReview from '../SingleReview';

function WalkerReviews({ reviews=[] }) {
    const totalReviews = reviews.length;

    return (
        <div className="walker-profile-container">
          <div>
            My Reviews - {totalReviews ? `Viewing ${totalReviews} past ${totalReviews === 1 ? 'review' : 'reviews'}:`
              : 'You have no past Reviews'}
          </div>
          {
              reviews.map((review, ind) => <SingleReview key={ind} review={review}/>)
          }
        </div>
    )
}

export default WalkerReviews;