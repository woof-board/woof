import React from 'react';
import StarRatingComponent from 'react-star-rating-component'; 
<<<<<<< HEAD
import '../../css/WalkerProfile.css';
=======
//import '../../css/WalkerProfile.css';
>>>>>>> 0588cfdd685bf938a28914e2ba3203539f50aef9

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