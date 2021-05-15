import React from 'react';
import '../../css/WalkerProfile.css';

function WalkerReviews({ reviews=[] }) {
    const totalReviews = reviews.length;

    return (
        <>
            {reviews.map( (review, ind) => (
              <div key={ind} className="walks">
              <div>Rating: {review.rating}</div>
              <div>{review.reviewText}</div> 
            </div>
            ))}
        </>
    )
}

export default WalkerReviews;