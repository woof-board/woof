import React from 'react';
//import '../../css/WalkerProfile.css';
import StarRatings from 'react-star-ratings';
import { RatingIconSVG } from '../../utils/helpers'




function WalkerAvgRating({average_rating}) {
    // const starRating = {parseFloat(average_rating).toFixed(1)};
    return (
        <div className="walker-contact-container">
          <div className="walker-header"><h3>My Rating <span className="light">({average_rating.toFixed(1)})</span></h3></div>
          <div className="average-rating">
          <StarRatings
            rating= {average_rating}
            starDimension="64px"
            starSpacing="6px"
            starRatedColor="#254e9b"
            starEmptyColor="#98b4e7"
            svgIconViewBox={RatingIconSVG.box}
            svgIconPath={RatingIconSVG.coords}
          />
          </div>
        </div>
    )
}

export default WalkerAvgRating;
