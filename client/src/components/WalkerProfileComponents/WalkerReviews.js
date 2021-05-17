import React from 'react';
//import '../../css/WalkerProfile.css';
import SingleReview from '../SingleReview';

function WalkerReviews({ reviews=[] }) {
    const totalReviews = reviews.length;

    return (
        <div className="walker-contact-container">
          <div className="walker-header">
            <h3>My Reviews <span className="light"> {totalReviews ? `Viewing ${totalReviews} past ${totalReviews === 1 ? 'review' : 'reviews'}:`
              : 'You have no past Reviews'}</span></h3>
          </div>
          {
              reviews.map((review, ind) => <SingleReview key={ind} review={review}/>)
          }
        </div>
    )
}

export default WalkerReviews;