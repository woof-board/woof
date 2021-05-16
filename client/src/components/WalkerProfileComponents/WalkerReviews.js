import React from 'react';
<<<<<<< HEAD:client/src/components/WalkerProfileComponents/WalkerReviews.js
import '../../css/WalkerProfile.css';
=======
//import '../../css/WalkerProfile.css';
>>>>>>> 0588cfdd685bf938a28914e2ba3203539f50aef9:client/src/components/WalkerProfile/WalkerReviews.js
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