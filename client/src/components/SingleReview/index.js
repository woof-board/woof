import React from 'react';
import StarRatingComponent from 'react-star-rating-component'; 
//import '../../css/WalkerProfile.css';

function SingleReview( { review }) {
    const { owner_id, review_text, rating } = review;
    return (
        review_text !== '' && 
        <>
            <div className="walks">
                <div>Reviewer: {owner_id}</div>
                <div>
                    <StarRatingComponent 
                        name="rating" 
                        starCount={5}
                        value={rating}
                    />
                </div>
                <div>{review_text}</div>
            </div>
        </>
    );
}


export default SingleReview;