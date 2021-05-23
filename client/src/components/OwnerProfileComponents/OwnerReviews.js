import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';
import { QUERY_OWNER_REVIEWS } from '../../utils/queries';
import { REMOVE_REVIEW } from '../../utils/mutations';
import ModalDisplay from '../ModalDisplay';
import StarRatings from 'react-star-ratings';
import { RatingIconSVG } from '../../utils/helpers'



function OwnerReviews() {
    const [removeReview, {error}] = useMutation(REMOVE_REVIEW);
    const [getOwnerReviewsByLazyQuery, { data: lazyQueryData }] = useLazyQuery(QUERY_OWNER_REVIEWS, {
        fetchPolicy: 'network-only'
      });
    const { data: ownerReviews, loading } = useQuery(QUERY_OWNER_REVIEWS);
    const [ reviewList, setReviewtList ] = useState([]);
    const [modalJSX, setModalJSX] = useState(<div />);
    const [modalOpen, setModalOpen] = useState();

    useEffect(() => {
        // if not already in global store
        if (ownerReviews) {
            // console.log("ownerReviews", ownerReviews.getOwnerReviews, "reviewList", reviewList);
            setReviewtList([...ownerReviews.getOwnerReviews]);
        }
    }, [ownerReviews]);

    useEffect(() => {
        if (lazyQueryData) {
            // console.log("adfter lazy query", lazyQueryData.getOwnerReviews)
            setReviewtList([...lazyQueryData.getOwnerReviews]);
        }
    }, [lazyQueryData])

    const handleRemoveReview = async event => {
        event.preventDefault();
        const walker_id = event.target.getAttribute("data-walkerid");
        try {
            await removeReview({
                variables: {
                    walker_id
                }
            });
            if(!error) getOwnerReviewsByLazyQuery();
            
            setModalJSX(
                <div>
                    <h6>Review has been removed successfully!</h6>
                </div>
            );
            setModalOpen(true);
        } catch (e) {
            console.log(e);
        }
        
    }
    const closeModal = () => {
        setModalJSX(<div />);
        setModalOpen(false);
    };


    return ( 
        <div className="walker-contact-container">
            <div className="walker-header"><h2>My Reviews</h2></div>
            <div>
            {
                reviewList.length > 0 &&
                reviewList.map((review, index) => (
                    <div key={index} className="walks">
                        <div>
                        <span className="medium-text">Walker:</span> {`${review.walker.first_name} ${review.walker.last_name}`}
                    </div>
                    <div>
                        <span className="medium-text">Review:</span> {review.review_text}
                    </div>
                    <div>
                        <span className="medium-text">Rating: </span> 
                        <StarRatings
                            rating= {review.rating}
                            starDimension="14px"
                            starSpacing="2px"
                            starRatedColor="#254e9b"
                            starEmptyColor="#98b4e7"
                            svgIconViewBox={RatingIconSVG.box}
                            svgIconPath={RatingIconSVG.coords}
                        />
                    </div>
                    <button 
                        type="button" 
                        data-walkerid={review.walker._id}
                        data-reviewid={review._id}
                        onClick={handleRemoveReview}
                    >
                        Remove
                    </button>
                    </div>
                ))
            }
            </div>
            <ModalDisplay component={modalJSX} isOpen={modalOpen} closeModal={closeModal}/>
        </div>
     );
}
 
export default OwnerReviews;
