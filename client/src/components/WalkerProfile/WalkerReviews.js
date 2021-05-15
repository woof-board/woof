import React from 'react';
import '../../css/WalkerProfile.css';
import decode from 'jwt-decode';
import Auth from '../../utils/auth';
import { QUERY_WALKER } from '../../utils/queries';
import { useQuery } from '@apollo/react-hooks';

function WalkerReviews(props) {

    const walkerToken = decode(Auth.getToken());

    const walkerReview = useQuery(QUERY_WALKER, {
        variables: { walker_id: walkerToken.data._id }
      })
    
    const walkerData = walkerReview?.walker || [{ _id: "", firstName: "", email: "", reviews: [{ owner_id: '', rating: '5', reviewText: 'You are Great'}], averageRating: '' }];

    const index = walkerData.length - 1;
    const totalReviews = walkerData[index].reviews.length;

    return (
        <div className="walker-profile-container">
          <div>
            My Reviews - {totalReviews ? `Viewing ${totalReviews} past ${totalReviews === 1 ? 'review' : 'reviews'}:`
              : 'You have no past Reviews'}
          </div>
            {walkerData[0].reviews.map((arr) => (
              <div key={arr.owner_id} className="walks">
              <div>Rating: {arr.rating}</div>
              <div>{arr.reviewText}</div> 
            </div>
            ))}
        </div>
    )
}

export default WalkerReviews;