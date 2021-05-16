import React from 'react';
import '../../css/WalkerProfile.css';

function WalkerReviews({ reviews=[] }) {

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