import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { QUERY_OWNER_REVIEWS } from '../../utils/queries';
// import { UPDATE_WALKER_STATUS } from '../utils/mutations';
// import ModalDisplay from '../components/ModalDisplay';

const OwnerReviews = () => {
    const { data: ownerReviews, loading } = useQuery(QUERY_OWNER_REVIEWS);
    const [reviewList, setReviewList] = useState({
        reviews: []
    });

    useEffect(() => {
        // if not already in global store
        if (ownerReviews) {
            const reviews = [...ownerReviews.getOwnerReviews];

            console.log("ownerReviews", reviews);
            setReviewList({
                reviews: [...reviews]
            });
            setTimeout(()=>{
                console.log(reviewList);
            },3000)
        }
    }, [ownerReviews, setReviewList]);

    return ( 
        <div className="walker-contact-container">
            <div className="walker-header"><h2>My Reviews</h2></div>
            {
                reviewList.reviews.map((review, index) => {
                    <div key={index} className="walks">
                            <div>
                                <span className="medium-text">Walker:</span> {`${review.walker.first_name} ${review.walker.last_name}`}
                            </div>
                            <div>
                                <span className="medium-text">Review:</span> {review.review_text}
                            </div>
                            <div>
                                <span className="medium-text">Rating:</span> {review.rating}
                            </div>
                            <button 
                                type="button" 
                                data-walkerid={review.walker._id}
                                data-reviewid={review._id}
                                // onClick={handleWalkerStatus}
                            >
                                Remove
                            </button>
                        </div>
                })
            }
        </div>
     );
}
 
export default OwnerReviews;