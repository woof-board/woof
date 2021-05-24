import React from 'react';
import StarRatings from 'react-star-ratings';
import { RatingIconSVG } from '../../utils/helpers'


function SingleReview( { review }) {
    const { owner_id, review_text, rating } = review;
    const {first_name, last_name} = owner_id;
    const displayName = first_name + ', ' + last_name?.charAt(0).toUpperCase();
    return (
        review_text !== '' && 
        <>
            <div className="walks">
                <div>Reviewer: {displayName}</div>
                <div>
                    <StarRatings
                        rating= {rating}
                        starDimension="15px"
                        starSpacing="2px"
                        starRatedColor="#254e9b"
                        starEmptyColor="#98b4e7"
                        svgIconViewBox={RatingIconSVG.box}
                        svgIconPath={RatingIconSVG.coords}
                    />
                </div>
                <div>{review_text}</div>
            </div>
        </>
    );
}


export default SingleReview;